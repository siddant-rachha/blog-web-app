import { Suspense } from 'react';
import BlogPageView from '@/components/BlogPageView';
import { Typography } from '@mui/material';

export default function Page() {
  return (
    <Suspense fallback={<Typography variant="h6">Loading...</Typography>}>
      <BlogPageView />
    </Suspense>
  );
}
