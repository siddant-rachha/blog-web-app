import { NextRequest, NextResponse } from 'next/server';
import { firebaseAdminDb } from '@/firebase/firebaseAdmin';
import {
  INTERNAL_SERVER_ERROR,
  POST_NOT_FOUND,
  UNAUTHORIZED,
} from '../api_utils_only/errorReturns';
import { decodeToken } from '../api_utils_only/decodeToken';
import { ADMIN_UID } from '../constants';

// Fetch all posts or a single post by ID if 'id' is provided in the query string
export async function GET(req: NextRequest) {
  try {
    let uid = '';
    const authorizationHeader = req.headers.get('authorization')?.split(' ')[1];

    if (authorizationHeader) {
      try {
        const decodedToken = await decodeToken(authorizationHeader);
        uid = decodedToken.uid;
      } catch (error) {
        console.log(error);
        return UNAUTHORIZED();
      }
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Get id from query params
    const myposts = searchParams.get('myposts'); // Get myposts from query params

    if (id) {
      const postRef = firebaseAdminDb.collection('posts').doc(id);
      const postDoc = await postRef.get();

      if (!postDoc.exists) {
        return POST_NOT_FOUND();
      }

      const postData = postDoc.data();

      return NextResponse.json(
        {
          post: {
            id: postDoc.id,
            title: postData?.title,
            desc: postData?.desc,
            author: postData?.author,
            imageUrl: postData?.imageUrl,
            authorPic: postData?.authorPic,
            createdAt: postData?.createdAt,
            writePermission: uid === postData?.uid,
          },
        },
        { status: 200 }
      );
    } else if (myposts === 'true') {
      if (!uid) {
        return NextResponse.json(
          { posts: [], message: 'POST_NOT_FOUND' },
          { status: 200 }
        );
      }
      // Fetch only the posts created by the user
      const postsSnapshot = await firebaseAdminDb
        .collection('posts')
        .where('uid', '==', uid)
        .orderBy('createdAt', 'desc') // Sort by latest
        .get();

      if (postsSnapshot.empty) {
        return NextResponse.json(
          { posts: [], message: 'POST_NOT_FOUND' },
          { status: 200 }
        );
      }

      const posts = postsSnapshot.docs.map((doc) => {
        const postData = doc.data();
        return {
          id: doc.id,
          title: postData.title,
          desc: postData.desc?.slice(0, 150),
          author: postData?.author,
          imageUrl: postData?.imageUrl,
          authorPic: postData?.authorPic,
          createdAt: postData?.createdAt,
          writePermission: true,
        };
      });

      return NextResponse.json(
        { posts, message: 'POSTS_FETCHED' },
        { status: 200 }
      );
    } else {
      // Fetch all posts if no ID is provided
      // Firebase will throw error at first time and ask to create index
      const postsSnapshot = await firebaseAdminDb
        .collection('posts')
        .orderBy('createdAt', 'desc') // Sort by latest
        .get();

      if (postsSnapshot.empty) {
        return POST_NOT_FOUND();
      }

      const posts = postsSnapshot.docs.map((doc) => {
        const postData = doc.data();
        let writePermission = true;
        if (postData.uid) {
          writePermission = uid === postData.uid || uid === ADMIN_UID;
        }
        return {
          id: doc.id,
          title: postData.title,
          desc: postData.desc?.slice(0, 150),
          author: postData?.author,
          imageUrl: postData?.imageUrl,
          authorPic: postData?.authorPic,
          createdAt: postData?.createdAt,
          writePermission: writePermission,
        };
      });

      return NextResponse.json(
        { posts, message: 'POSTS_FETCHED' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return INTERNAL_SERVER_ERROR();
  }
}
