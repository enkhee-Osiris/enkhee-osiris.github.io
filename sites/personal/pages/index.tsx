import { Page, Text } from "@enkhee-Osiris/ui";
import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>enkhee-Osiris || personal website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Page>
        <Text variant="text" size="md">
          The quick brown fox jumps over the lazy dog.
        </Text>
      </Page>
    </>
  );
}

export default Home;
