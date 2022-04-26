import { CommandBarProvider, globalStyles, ThemeHandler } from "@enkhee-Osiris/ui";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <>
      <ThemeHandler />
      <CommandBarProvider>
        <Component {...pageProps} />
      </CommandBarProvider>
    </>
  );
}

export default MyApp;
