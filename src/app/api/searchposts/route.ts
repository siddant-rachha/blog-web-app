import { NextRequest, NextResponse } from 'next/server';
import { firebaseAdminDb } from '@/firebase/firebaseAdmin';
import {
  INTERNAL_SERVER_ERROR,
  MINIMUM_QUERY_REQUIRED,
} from '../api_utils_only/errorReturns';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { query } = body;

    if (!query || query.length < 3) {
      return MINIMUM_QUERY_REQUIRED();
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

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Search error:', error);
    return INTERNAL_SERVER_ERROR();
  }
}
