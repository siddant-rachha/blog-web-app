import { NextRequest, NextResponse } from 'next/server';
import { firebaseAdminDb } from '@/firebase/firebaseAdmin';
import {
  CLOUDINARY_ERROR,
  FIREBASE_ERROR,
  INTERNAL_SERVER_ERROR,
  MISSING_FIELDS,
  POST_NOT_FOUND,
  UNAUTHORIZED,
} from '../api_utils_only/errorReturns';
import { decodeToken } from '../api_utils_only/decodeToken';
import { deleteImgFromCloudinary } from '../api_utils_only/deleteImgFromCloudinary';

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    // (1) ---- get post id to delete------
    const body = await req.json();
    const { postId } = body;
    if (!postId) {
      return MISSING_FIELDS();
    }
    // --------------

    // (2) ---- check if the post exists ------
    const postRef = firebaseAdminDb.collection('posts').doc(postId);
    const postDoc = await postRef.get();
    const postData = postDoc.data();
    if (!postDoc.exists) {
      return POST_NOT_FOUND();
    }
    // --------------

    // (3) ---- check if the post has no uid ------
    let anyOneCanDelete = false;
    if (!postDoc.data()?.uid) {
      anyOneCanDelete = true;
    }
    // --------------

    // (4) ---- if anyOneCanWrite is false, check if the user can delete ------
    let uid = '';
    if (anyOneCanDelete === false) {
      const authorizationHeader = req.headers
        .get('authorization')
        ?.split(' ')[1];
      if (authorizationHeader) {
        try {
          const decodedToken = await decodeToken(authorizationHeader);
          uid = decodedToken.uid;
        } catch (error) {
          console.log(error);
          return UNAUTHORIZED();
        }
      }
      if (uid !== 'lp3Gofi5yDSBVEQ8L6ASYP5w1kO2' && uid !== postData?.uid) {
        return UNAUTHORIZED();
      }
    }
    // --------------

    // (5) ---- delete post ---------
    try {
      await postRef.delete();
    } catch (error) {
      console.log(error);
      return FIREBASE_ERROR();
    }
    // --------------

    // (6) ---- delete old image from cloudinary ---------
    if (postData?.imageUrl) {
      try {
        await deleteImgFromCloudinary(postData.imageUrl);
      } catch (error) {
        console.log(error);
        return CLOUDINARY_ERROR();
      }
    }
    // --------------

    return NextResponse.json(
      { message: 'POST_DELETED', error: '' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return INTERNAL_SERVER_ERROR();
  }
}
