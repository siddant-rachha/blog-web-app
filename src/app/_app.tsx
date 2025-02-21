import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '../globalState/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
