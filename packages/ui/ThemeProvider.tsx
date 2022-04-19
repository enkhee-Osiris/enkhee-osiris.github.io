import type { ReactNode } from "react";

import { useDarkMode } from "usehooks-ts";

import { darkTheme } from "./stitches.config";

export type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { isDarkMode } = useDarkMode(true);

  return <div className={isDarkMode ? darkTheme.className : "light-theme"}>{children}</div>;
}
