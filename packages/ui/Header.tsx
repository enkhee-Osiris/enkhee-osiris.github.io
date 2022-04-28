import { useCallback } from "react";

import { useKBar } from "kbar";
import { useDarkMode } from "usehooks-ts";

import { Container } from "./Container";
import { Flex } from "./Flex";
import { Icon } from "./Icon";
import { Row } from "./Row";
import { styled } from "./stitches.config";
import { Text } from "./Text";

const StyledButton = styled("button", {
  backgroundColor: "transparent",
  border: "none",
  p: 0,
});

function CommandBarToggler() {
  const { query } = useKBar();

  const handleClick = useCallback(() => {
    query.toggle();
  }, [query]);

  return (
    <StyledButton type="button" onClick={handleClick}>
      <Icon css={{ color: "$gray12", cursor: "pointer" }} name="app-folder" />
    </StyledButton>
  );
}

function ThemeToggler() {
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

export type HeaderProps = {
  heading: string;
};

export function Header({ heading }: HeaderProps) {
  return (
    <Container as="header" css={{ mb: "$space$84" }}>
      <Flex
        direction={{ "@initial": "row", "@md": "columnReverse" }}
        justify="between"
        align={{ "@initial": "center", "@md": "start" }}
      >
        <Text
          as="h1"
          variant="display"
          size="sm"
          weight="bold"
          css={{
            marginRight: "$space$8",
            "@md": { marginTop: "$space$8", marginRight: 0 },
          }}
        >
          {heading}
        </Text>

        <Row css={{ "@md": { alignSelf: "end" } }} gap={8}>
          <CommandBarToggler />

          <ThemeToggler />
        </Row>
      </Flex>
    </Container>
  );
}
