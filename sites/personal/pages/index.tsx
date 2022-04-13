import { Text, ThemeToggle } from "@enkhee-Osiris/ui";
import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <Text as="h1">Hello this is root.</Text>
        <ThemeToggle />
      </>
    </>
  );
}

export default Home;
