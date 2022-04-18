import { styled } from "./stitches.config";
import { Text } from "./Text";

export const Article = styled("article", {
  [`& ${Text} + ${Text}`]: {
    marginTop: "$space$16",
  },
});
