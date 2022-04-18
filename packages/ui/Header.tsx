import { Container } from "./Container";
import { Flex } from "./Flex";
import { Grid } from "./Grid";
import { Nav } from "./Nav";
import { Text } from "./Text";
import { ThemeToggler } from "./ThemeToggler";

export type HeaderProps = {
  heading: string;
};

export function Header({ heading }: HeaderProps) {
  return (
    <Container as="header" css={{ mb: "$space$64" }}>
      <Grid columns={{ "@initial": 1, "@md": 2 }} align="center" justify="between" gap={32}>
        <Nav />

        <Flex
          direction={{ "@initial": "row", "@md": "columnReverse" }}
          align={{ "@initial": "start", "@md": "end" }}
          justify={{ "@initial": "between" }}
        >
          <Text
            variant="display"
            size="sm"
            weight="bold"
            css={{
              marginRight: "$space$8",
              "@md": { marginTop: "$space$8", marginRight: 0, textAlign: "right" },
            }}
          >
            {heading}
          </Text>

          <ThemeToggler />
        </Flex>
      </Grid>
    </Container>
  );
}
