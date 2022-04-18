import { Col } from "./Col";
import { Grid } from "./Grid";
import { Nav } from "./Nav";
import { Text } from "./Text";
import { ThemeToggler } from "./ThemeToggler";

export type HeaderProps = {
  heading: string;
};

export function Header({ heading }: HeaderProps) {
  return (
    <Grid columns={2} align="center" justify="between">
      <Nav />

      <Col align="end" gap="8">
        <ThemeToggler />
        <Text variant="display" size="sm" weight="bold">
          {heading}
        </Text>
      </Col>
    </Grid>
  );
}
