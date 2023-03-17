import "../styles/global.css";
import { AppProps } from "next/app";
import MyLayout from "../components/layout";
import { wrapper } from "../store";
import { Provider } from "react-redux";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <title>Zoey Test</title>
      </Head>
      <Provider store={store}>
        <MyLayout>
          <Component {...pageProps} />
        </MyLayout>
      </Provider>
    </>
  );
}
