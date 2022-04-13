import type { AppProps } from "next/app";

import { ThemeProvider, globalStyles } from "@enkhee-Osiris/ui";

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
