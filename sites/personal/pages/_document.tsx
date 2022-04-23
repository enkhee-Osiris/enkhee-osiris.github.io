import { darkTheme } from "@enkhee-Osiris/ui";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={darkTheme.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
