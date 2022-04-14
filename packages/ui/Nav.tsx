import Link from "next/link";

import { Icon, IconProps } from "./Icon";
import { styled } from "./stitches.config";

const StyledUl = styled("ul", {
  display: "flex",
  flexDirection: "column",
  listStyle: "none",
});

const StyledA = styled("a", {
  color: "$gray12",
  display: "inline-flex",
  alignItems: "center",
  fontSize: "30px",
  lineHeight: "36px",
  letterSpacing: "-0.02em",
  fontWeight: "500",

  "&:hover": { color: "$orange9" },
  "&:active": { color: "$orange10" },
});

function NavItem({
  text,
  url,
  iconName,
}: {
  text?: string;
  url: string;
  iconName?: IconProps["name"];
}) {
  return (
    <Link href={url} passHref>
      <StyledA>
        {iconName && <Icon css={{ marginRight: "8px" }} name={iconName} />}
        {text}
      </StyledA>
    </Link>
  );
}

export function Nav() {
  return (
    <nav>
      <StyledUl>
        <li>
          <NavItem url="/" iconName="home" />
        </li>
        <li>
          <NavItem text="About" url="/about/" />
        </li>
        <li>
          <NavItem text="Blogs" url="/blogs/" />
        </li>
        <li>
          <NavItem text="Resume" url="/curriculum_vitae/" />
        </li>
        <li>
          <NavItem text="Connect" url="/connect/" />
        </li>
      </StyledUl>
    </nav>
  );
}
