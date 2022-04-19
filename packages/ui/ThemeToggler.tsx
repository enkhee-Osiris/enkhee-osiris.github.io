import { useDarkMode } from "usehooks-ts";

import { Icon } from "./Icon";
import { styled } from "./stitches.config";

const StyledButton = styled("button", {
  backgroundColor: "transparent",
  border: "none",
});

export function ThemeToggler() {
  const { toggle } = useDarkMode(true);

  return (
    <StyledButton type="button" onClick={toggle}>
      <Icon
        css={{ ".dark-theme &": { display: "none" }, color: "$gray10", cursor: "pointer" }}
        name="moon"
      />
      <Icon
        css={{ ".light-theme &": { display: "none" }, color: "$orange10", cursor: "pointer" }}
        name="sun"
      />
    </StyledButton>
  );
}
