import type { ReactNode, ComponentProps } from "react";

import { Flex } from "./Flex";
import { styled } from "./stitches.config";

const StyledCol = styled("div", Flex, {
  [`& > * + *`]: { paddingTop: 0 },
  variants: {
    gap: {
      1: { [`& > * + *`]: { paddingTop: "$space$1" } },
      4: { [`& > * + *`]: { paddingTop: "$space$4" } },
      8: { [`& > * + *`]: { paddingTop: "$space$8" } },
      16: { [`& > * + *`]: { paddingTop: "$space$16" } },
      24: { [`& > * + *`]: { paddingTop: "$space$24" } },
      32: { [`& > * + *`]: { paddingTop: "$space$32" } },
      40: { [`& > * + *`]: { paddingTop: "$space$40" } },
      48: { [`& > * + *`]: { paddingTop: "$space$48" } },
      56: { [`& > * + *`]: { paddingTop: "$space$56" } },
      64: { [`& > * + *`]: { paddingTop: "$space$64" } },

      10: { [`& > * + *`]: { paddingTop: "$space$10" } },
      14: { [`& > * + *`]: { paddingTop: "$space$14" } },
      20: { [`& > * + *`]: { paddingTop: "$space$20" } },

      12: { [`& > * + *`]: { paddingTop: "$space$12" } },
      52: { [`& > * + *`]: { paddingTop: "$space$52" } },
      84: { [`& > * + *`]: { paddingTop: "$space$84" } },
    },
    flex: { true: { flex: "1" } },
  },
});

export type ColProps = ComponentProps<typeof StyledCol> & {
  children: ReactNode;
};

export function Col(props: ColProps) {
  return <Flex align="stretch" direction="column" justify="start" wrap="wrap" {...props} />;
}
