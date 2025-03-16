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

    const posts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      desc: doc.data().desc.slice(0, 100),
      author: doc.data().name,
      imageUrl: doc.data().imageUrl,
    }));

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
