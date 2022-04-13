import { useDarkMode, useIsClient } from "usehooks-ts";

export function ThemeToggle() {
  const isClient = useIsClient();
  const { isDarkMode, toggle } = useDarkMode(true);

  if (isClient) {
    return (
      <button type="button" onClick={toggle}>
        {isDarkMode ? "Show me the light" : "Nooo it's too bright"}
      </button>
    );
  }

  return null;
}
