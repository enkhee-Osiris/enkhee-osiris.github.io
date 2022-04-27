import NextLink from "next/link";

import { Icon } from "./Icon";
import { styled } from "./stitches.config";

const StyledA = styled("a", {
  alignItems: "center",
  color: "$orange11",
  display: "inline-flex",
  textDecoration: "none",
  fontWeight: "bold",

  "&:hover, &:active": { textDecoration: "underline" },
});

export function Anchor({ text, url }: { text?: string; url: string }) {
  return (
    <NextLink href={url} passHref>
      <StyledA>
        {text}
        <Icon css={{ marginLeft: "$space$8" }} name="arrow-right" />
      </StyledA>
    </NextLink>
  );
}
