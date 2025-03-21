import { NextRequest, NextResponse } from 'next/server';
import {
  firebaseAdmin,
  firebaseAdminAuth,
  firebaseAdminDb,
} from '@/firebase/firebaseAdmin';
import { generateSearchKeywords } from '../api_utils_only/utils';
import { v2 as cloudinary } from 'cloudinary';

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
        const decodedToken =
          await firebaseAdminAuth.verifyIdToken(authorizationHeader);
        uid = decodedToken.uid;
        name = decodedToken.name || 'Anonymous';
        picture = decodedToken.picture || '';
        email = decodedToken.email || '';
      } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
      }
    }

    // Parse multipart form-data
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const desc = formData.get('desc') as string;
    const imageFile = formData.get('image') as File;

    if (!title || !desc || !name) {
      return NextResponse.json({ error: 'MISSING_FIELDS' }, { status: 206 });
    }

    if (title.length > 50) {
      return NextResponse.json({ error: 'TITLE_EXCEED' }, { status: 206 });
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
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// -----------------------

// STRUCTURE OF POST SAVED IN FIREBASE DB
// {
//   uid: string;
//   email: string;
//   authorPic: string;
//   title: string;
//   desc: string;
//   author: string;
//   imageUrl: string;
//   searchKeywords: string[];
//   createdAt: Timestamp;
// }

// -------------------------

// DIFFERENT RETURNS OF API CALLS
// {
//   message: 'POST_CREATED';
//   postId: string;
//   error: '';
//   status: 200;
// }

// {
//   error: 'UNAUTHORIZED';
//   status: 401;
// }

// {
//   error: 'Internal Server Error';
//   status: 500;
// }

// {
//   error: 'TITLE_EXCEED';
//   status: 206;
// }

// {
//   error: 'MISSING_FIELDS';
//   status: 206;
// }

// -------------------------
