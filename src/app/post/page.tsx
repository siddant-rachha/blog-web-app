import { Suspense } from 'react';
import BlogPageView from '@/components/BlogPageView';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPageView />
    </Suspense>
  );
}
