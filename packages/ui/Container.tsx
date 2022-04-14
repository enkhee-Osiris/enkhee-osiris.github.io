import { styled } from "./stitches.config";

export const Container = styled("div", {
  width: "100%",
  mX: "auto",
  pX: "16px",
  "@sm": { width: "640px", pX: "24px" },
  "@md": { width: "768px" },
  "@lg": { width: "1024px", pX: "32px" },
});
