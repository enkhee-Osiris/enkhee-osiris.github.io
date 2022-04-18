import { ReactNode } from "react";

import { Container } from "./Container";
import { Header } from "./Header";
import { styled } from "./stitches.config";

export type PageProps = {
  children: ReactNode;
  heading?: string;
};

const Background = styled("main", {
  backgroundColor: "$gray3",
  height: "100%",
  pY: "$space$32",
  "@sm": { pY: "$space$48" },
  "@lg": { pY: "$space$64" },
});

export function Page({ children, heading = "Hello, I'm Enkherdene." }: PageProps) {
  return (
    <Background>
      <Header heading={heading} />

      <Container>{children}</Container>
    </Background>
  );
}
