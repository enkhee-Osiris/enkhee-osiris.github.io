import { ThemeProvider, globalStyles } from "@enkhee-Osiris/ui";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
