import type { AppProps } from "next/app";
import { useDarkMode, useIsClient } from "usehooks-ts";

import { darkTheme, globalStyles } from "@/stitches.config";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient();
  const { isDarkMode } = useDarkMode(true);

  if (isClient) {
    return <div className={isDarkMode ? darkTheme.className : "light-theme"}>{children}</div>;
  }

  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
