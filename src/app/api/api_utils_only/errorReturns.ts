import { NextResponse } from 'next/server';

export const MISSING_FIELDS = () => {
  return NextResponse.json({ error: 'MISSING_FIELDS' }, { status: 400 });
};

export const TITLE_EXCEED = () => {
  return NextResponse.json({ error: 'TITLE_EXCEED' }, { status: 400 });
};

export const POST_NOT_FOUND = () => {
  return NextResponse.json({ error: 'POST_NOT_FOUND' }, { status: 400 });
};

export const UNAUTHORIZED = () => {
  return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
};

export const INTERNAL_SERVER_ERROR = () => {
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
};

export const CLOUDINARY_ERROR = () => {
  return NextResponse.json({ error: 'CLOUDINARY_ERROR' }, { status: 500 });
};

export const FIREBASE_ERROR = () => {
  return NextResponse.json({ error: 'FIREBASE_ERROR' }, { status: 500 });
};

export const MINIMUM_QUERY_REQUIRED = () => {
  return NextResponse.json(
    { error: 'MINIMUM_QUERY_REQUIRED' },
    { status: 400 }
  );
};
