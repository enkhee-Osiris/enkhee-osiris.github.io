import type { ReactNode } from "react";

import { useDarkMode, useIsClient } from "usehooks-ts";

import { darkTheme } from "./stitches.config";

export type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const isClient = useIsClient();
  const { isDarkMode } = useDarkMode(true);

  if (isClient) {
    return <div className={isDarkMode ? darkTheme.className : "light-theme"}>{children}</div>;
  }

  return null;
}
