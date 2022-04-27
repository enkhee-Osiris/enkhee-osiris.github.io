import { darkTheme, getCssText } from "@enkhee-Osiris/ui";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        {/* eslint-disable-next-line react/no-danger */}
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="hsl(24, 94.0%, 50.0%)" />
      </Head>
      <body className={darkTheme.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
