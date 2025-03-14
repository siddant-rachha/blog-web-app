import { NextRequest, NextResponse } from 'next/server';
import { firebaseAdmin, firebaseAdminDb } from '@/firebase/firebaseAdmin';
import { generateSearchKeywords } from '../api_utils_only/utils';

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, desc, name, base64Image } = body;

    if (!title || !desc || !name) {
      return NextResponse.json({ error: 'MISSING_FIELDS' }, { status: 206 });
    }

    if (title.length > 50) {
      return NextResponse.json({ error: 'TITLE_EXCEED' }, { status: 206 });
    }

    const searchKeywords = generateSearchKeywords(title);

    const postRef = await firebaseAdminDb.collection('posts').add({
      title,
      desc,
      name,
      base64Image: base64Image || null,
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
