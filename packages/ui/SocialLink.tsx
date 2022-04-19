import NextLink from "next/link";

import { Icon, IconProps } from "./Icon";
import { styled } from "./stitches.config";

const StyledA = styled("a", {
  alignItems: "center",
  color: "$gray12",
  display: "inline-flex",
  textDecoration: "none",

  "&:hover": { color: "$orange10", textDecoration: "underline" },
  "&:active": { color: "$orange10", textDecoration: "underline" },
});

export function SocialLink({
  text,
  url,
  iconName,
  iconSize,
}: {
  text?: string;
  url: string;
  iconName: IconProps["name"];
  iconSize?: IconProps["size"];
}) {
  return (
    <NextLink href={url} passHref>
      <StyledA>
        {iconName && <Icon css={{ marginRight: "$space$8" }} name={iconName} size={iconSize} />}
        {text}
      </StyledA>
    </NextLink>
  );
}
