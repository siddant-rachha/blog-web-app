import { NextRequest, NextResponse } from 'next/server';
import { firebaseAdmin, firebaseAdminDb } from '@/firebase/firebaseAdmin';

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, desc, name, base64Image } = body;

    if (!title || !desc || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const postRef = await firebaseAdminDb.collection('posts').add({
      title,
      desc,
      name,
      base64Image: base64Image || null,
      createdAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      { message: 'Post created', postId: postRef.id, error: '' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
