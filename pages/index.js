import Head from "next/head";
import HomePage from "./homepage";

export default function Index() {
  return (
    <>
      <Head>
        <title>Chairman of the Bored</title>
        <meta name="description" content="Chairman of the Bored" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
}


