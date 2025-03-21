import { NextRequest, NextResponse } from 'next/server';
import { firebaseAdminDb } from '@/firebase/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { query } = body;

    if (!query || query.length < 3) {
      return NextResponse.json(
        { error: 'MINIMUM_QUERY_REQUIRED' },
        { status: 206 }
      );
    }

    // Normalize spaces and trim
    query = query.trim().replace(/\s+/g, ' ');

    const postsSnapshot = await firebaseAdminDb
      .collection('posts')
      .where('searchKeywords', 'array-contains', query.toLowerCase())
      .get();

    let posts = [];

    posts = postsSnapshot.docs.map((doc) => {
      const postData = doc.data();

      return {
        id: doc.id,
        title: postData.title,
        desc: postData.desc.slice(0, 100),
        author: postData.author,
        imageUrl: postData.imageUrl,
        authorPic: postData?.authorPic,
        createdAt: postData?.createdAt,
      };
    });

    if (posts.length === 0) {
      return NextResponse.json({ error: 'NO_POSTS_FOUND' }, { status: 206 });
    }

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DIFFERENT RETURNS OF API CALLS
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
//     },
//     ...
//   ],
//   status: 200;
// }

// {
//   error: 'NO_POSTS_FOUND';
//   status: 206;
// }

// {
//   error: 'MINIMUM_QUERY_REQUIRED';
//   status: 206;
// }

// {
//   error: 'Internal Server Error';
//   status: 500;
// }
