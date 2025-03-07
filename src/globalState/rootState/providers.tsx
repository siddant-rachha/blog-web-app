import { Provider } from 'react-redux';
import { store } from '@/globalState/rootState/store';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
