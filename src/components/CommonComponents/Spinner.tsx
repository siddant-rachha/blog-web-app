import { useCommonSlice } from '@/hooks/useCommonSlice';
import { Backdrop, Box, CircularProgress } from '@mui/material';

export const Spinner = () => {
  const {
    selectors: { rootLoading },
  } = useCommonSlice();
  return (
    <>
      {rootLoading && (
        <Backdrop sx={{ color: '#fff', zIndex: 1001 }} open>
          <Box display="flex" justifyContent="center">
            <CircularProgress color="warning" />
          </Box>
        </Backdrop>
      )}
    </>
  );
};
