import { Header, Page } from "@enkhee-Osiris/ui";
import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>enkhee-Osiris || personal website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Page>
        <Header heading="Hello, I'm Enkherdene." />
      </Page>
    </>
  );
}

export default Home;
