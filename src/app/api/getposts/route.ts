import { NextRequest, NextResponse } from 'next/server';
import { firebaseAdminAuth, firebaseAdminDb } from '@/firebase/firebaseAdmin';

// Fetch all posts or a single post by ID if 'id' is provided in the query string
export async function GET(req: NextRequest) {
  try {
    let uid = '';
    const authorizationHeader = req.headers.get('authorization')?.split(' ')[1];

    if (authorizationHeader) {
      try {
        const decodedToken =
          await firebaseAdminAuth.verifyIdToken(authorizationHeader);
        uid = decodedToken.uid;
      } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
      }
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Get id from query params

    if (id) {
      const postRef = firebaseAdminDb.collection('posts').doc(id);
      const postDoc = await postRef.get();

      if (!postDoc.exists) {
        return NextResponse.json({ error: 'POST_NOT_FOUND' }, { status: 206 });
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
    }

    // Fetch all posts if no ID is provided
    const postsSnapshot = await firebaseAdminDb
      .collection('posts')
      .orderBy('createdAt', 'desc') // Sort by latest
      .get();

    if (postsSnapshot.empty) {
      return NextResponse.json(
        { posts: [], error: 'POST_NOT_FOUND' },
        { status: 206 }
      );
    }

    const posts = postsSnapshot.docs.map((doc) => {
      const postData = doc.data();
      let writePermission = true;
      if (postData.uid) {
        writePermission = uid === postData.uid;
      }
      return {
        id: doc.id,
        title: postData.title,
        desc: postData.desc,
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
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DIFFERENT RETURNS OF API CALLS

// WHEN /api/getposts?id=POST_ID

// {
//   post: {
//     id: string;
//     title: string;
//     desc: string;
//     author: string;
//     imageUrl: string;
//     authorPic: string;
//     createdAt: Timestamp;
//     writePermission: boolean;
//   },
//   status: 200;
// }

// WHEN /api/getposts

// {
//   posts: [
//     {
//       id: string;
//       title: string;
//       desc: string;
//       author: string;
//       imageUrl: string;
//       authorPic: string;
//       createdAt: Timestamp;
//       writePermission: boolean;
//     },
//     ...
//   ],
//   status: 200,
//   message: 'POSTS_FETCHED'
// }

// COMMON

// {
//   error: 'POST_NOT_FOUND';
//   status: 206;
// }

// {
//   error: 'Internal Server Error';
//   status: 500;
// }

// {
//   error: 'UNAUTHORIZED';
//   status: 401;
// }
