import { ReactNode } from "react";

import { Container } from "./Container";
import { styled } from "./stitches.config";

export type PageProps = {
  children: ReactNode;
};

const Background = styled("main", {
  backgroundColor: "$gray2",
  height: "100%",
  pY: "32px",
  "@sm": { pY: "48px" },
  "@lg": { pY: "64px" },
});

export function Page({ children }: PageProps) {
  return (
    <Background>
      <Container>{children}</Container>
    </Background>
  );
}
