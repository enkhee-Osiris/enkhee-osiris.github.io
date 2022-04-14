import { Button, Nav, Page, Text, ThemeToggle } from "@enkhee-Osiris/ui";
import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>enkhee-Osiris || personal website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Page>
        <Nav />
      </Page>
    </>
  );
}

export default Home;
