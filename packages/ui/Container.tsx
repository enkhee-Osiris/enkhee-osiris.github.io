import { styled } from "./stitches.config";

export const Container = styled("div", {
  width: "100%",
  mX: "auto",
  pX: "$space$16",
  "@sm": { width: "640px", pX: "$space$24" },
  "@md": { width: "768px" },
  "@lg": { width: "1024px", pX: "$space$32" },
});
