import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import { firebaseAdmin, firebaseAdminDb } from '@/firebase/firebaseAdmin';
import { decodeToken } from '../api_utils_only/decodeToken';
import {
  INTERNAL_SERVER_ERROR,
  MISSING_FIELDS,
  TITLE_EXCEED,
  UNAUTHORIZED,
} from '../api_utils_only/errorReturns';
import { generateSearchKeywords } from '../api_utils_only/utils';

cloudinary.config({
  cloud_name: 'df8byxnyr',
  api_key: '732621848874533',
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    let uid = '';
    let name = 'Anonymous';
    let picture = '';
    let email = '';
    const authorizationHeader = req.headers.get('authorization')?.split(' ')[1];

    if (authorizationHeader) {
      try {
        const decodedToken = await decodeToken(authorizationHeader);
        uid = decodedToken.uid;
        name = decodedToken.name || 'Anonymous';
        picture = decodedToken.picture || '';
        email = decodedToken.email || '';
      } catch (error) {
        console.log(error);
        return UNAUTHORIZED();
      }
    }

    // Parse multipart form-data
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const desc = formData.get('desc') as string;
    const imageFile = formData.get('image') as File;

    if (!title || !desc || !name) {
      return MISSING_FIELDS();
    }

    if (title.length > 50) {
      return TITLE_EXCEED();
    }

    let imageUrl = '';

    if (imageFile) {
      // Convert file to buffer
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Cloudinary with optimizations
      const uploadResult = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'posts_images',
              resource_type: 'image',
              transformation: [
                { width: 1000, crop: 'limit' }, // Resize max width to 1000px
                { fetch_format: 'auto' }, // Auto-select best format (WebP, AVIF, etc.)
                { quality: 'auto:best' }, // Auto-optimize quality
              ],
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result as { secure_url: string });
            }
          );
          uploadStream.end(buffer);
        }
      );

      imageUrl = uploadResult.secure_url;
    }

    const searchKeywords = generateSearchKeywords(title);

    const postRef = await firebaseAdminDb.collection('posts').add({
      uid,
      email,
      authorPic: picture,
      title,
      desc,
      author: name,
      imageUrl,
      searchKeywords,
      createdAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      { message: 'POST_CREATED', postId: postRef.id, error: '' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return INTERNAL_SERVER_ERROR();
  }
}
