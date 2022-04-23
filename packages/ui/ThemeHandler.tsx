import { useEffect } from "react";

import { useDarkMode } from "usehooks-ts";

import { darkTheme } from "./stitches.config";

export function ThemeHandler() {
  const { isDarkMode } = useDarkMode(true);

  useEffect(() => {
    if (isDarkMode) {
      document.querySelector("body")?.classList.add(darkTheme.className);
      document.querySelector("body")?.classList.remove("light-theme");
    } else {
      document.querySelector("body")?.classList.add("light-theme");
      document.querySelector("body")?.classList.remove(darkTheme.className);
    }
  }, [isDarkMode]);

  return null;
}
