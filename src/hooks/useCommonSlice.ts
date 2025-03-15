import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, GlobalRootState } from '@/globalState/rootState/store';
import { commonSliceActions } from '@/globalState/stateSlices/commonSlice/commonSlice';

export const useCommonSlice = () => {
  const dispatch = useDispatch<AppDispatch>();

  const rootLoading = useSelector(
    (state: GlobalRootState) => state.commonSlice.rootLoading
  );

  const setRootLoading = (bool: boolean) => {
    dispatch(commonSliceActions.setRootLoading(bool));
  };

  return {
    selectors: { rootLoading },
    actions: {
      setRootLoading,
    },
  };
};
