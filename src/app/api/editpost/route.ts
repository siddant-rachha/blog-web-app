import { NextRequest, NextResponse } from 'next/server';
import { firebaseAdmin, firebaseAdminDb } from '@/firebase/firebaseAdmin';
import { generateSearchKeywords } from '../api_utils_only/utils';
import {
  CLOUDINARY_ERROR,
  FIREBASE_ERROR,
  INTERNAL_SERVER_ERROR,
  MISSING_FIELDS,
  POST_NOT_FOUND,
  TITLE_EXCEED,
  UNAUTHORIZED,
} from '../api_utils_only/errorReturns';
import { decodeToken } from '../api_utils_only/decodeToken';
import { uploadImgToCloudinary } from '../api_utils_only/uploadImgToCloudinary';
import { deleteImgFromCloudinary } from '../api_utils_only/deleteImgFromCloudinary';

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    // (1) ---- get post id to edit------
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || '';
    // --------------

    // (2) ---- check if the post exists ------
    const postRef = firebaseAdminDb.collection('posts').doc(id);
    const postDoc = await postRef.get();
    const postData = postDoc.data();
    if (!postDoc.exists) {
      return POST_NOT_FOUND();
    }
    // --------------

    // (3) ---- check if the post has no uid ------
    let anyOneCanWrite = false;
    if (!postDoc.data()?.uid) {
      anyOneCanWrite = true;
    }
    // --------------

    // (4) ---- if anyOneCanWrite is false, check if the user can write ------
    let uid = '';
    let name = 'Anonymous';
    let picture = '';
    let email = '';

    const authorizationHeader = req.headers.get('authorization')?.split(' ')[1];
    if (authorizationHeader) {
      try {
        const decodedToken = await decodeToken(authorizationHeader);
        uid = decodedToken.uid;
        name = decodedToken.name;
        picture = decodedToken.picture || '';
        email = decodedToken.email || '';
      } catch (error) {
        console.log(error);
        return UNAUTHORIZED();
      }
    }
    if (uid !== postData?.uid && anyOneCanWrite === false) {
      return UNAUTHORIZED();
    }

    // --------------

    // (5) ---- Parse multipart form-data ------
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const desc = formData.get('desc') as string;
    const imageFileorUrl = formData.get('image') as File | string;
    if (!title || !desc || !name) {
      return MISSING_FIELDS();
    }
    if (title.length > 50) {
      return TITLE_EXCEED();
    }

    // (6) ---- upload image to cloudinary ------
    let imageUrl = '';
    if (imageFileorUrl instanceof File) {
      // delete old image from cloudinary
      if (postData?.imageUrl) {
        try {
          await deleteImgFromCloudinary(postData.imageUrl);
        } catch (error) {
          console.log(error);
          return CLOUDINARY_ERROR();
        }
      }

      try {
        imageUrl = await uploadImgToCloudinary(imageFileorUrl);
      } catch (error) {
        console.log(error);
        return CLOUDINARY_ERROR();
      }
    } else {
      imageUrl = imageFileorUrl;
    }
    // --------------

    // (7) ----- generate search keywords ------
    const searchKeywords = generateSearchKeywords(title);
    // --------------

    try {
      await postRef.update({
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
        { message: 'POST_UPDATED', postId: postRef.id, error: '' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error updating post:', error);
      return FIREBASE_ERROR();
    }
  } catch (error) {
    console.error('Error creating post:', error);
    return INTERNAL_SERVER_ERROR();
  }
}
