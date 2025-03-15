import { NextRequest, NextResponse } from 'next/server';
import { firebaseAdminDb } from '@/firebase/firebaseAdmin';

// Fetch all posts or a single post by ID if 'id' is provided in the query string
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Get id from query params

    if (id) {
      const postRef = firebaseAdminDb.collection('posts').doc(id);
      const postDoc = await postRef.get();

      if (!postDoc.exists) {
        return NextResponse.json({ error: 'POST_NOT_FOUND' }, { status: 404 });
      }

      const postData = postDoc.data();

      return NextResponse.json(
        {
          post: {
            id: postDoc.id,
            title: postData?.title,
            desc: postData?.desc,
            name: postData?.name,
            imageUrl: postData?.imageUrl,
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
        { posts: [], message: 'No posts found' },
        { status: 200 }
      );
    }

    const posts = postsSnapshot.docs.map((doc) => {
      const postData = doc.data();
      return {
        id: doc.id,
        title: postData.title,
        desc: postData.desc,
        name: postData.name,
        imageUrl: postData.imageUrl,
      };
    });

    return NextResponse.json(
      { posts, message: 'Posts fetched successfully' },
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
