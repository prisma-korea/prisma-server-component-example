import "../styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Prisma Server Component Example</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Demonstrates how to use Prisma in React server components"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
