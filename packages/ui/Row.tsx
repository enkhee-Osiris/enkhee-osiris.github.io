import type { ReactNode, ComponentProps } from "react";

import { Flex } from "./Flex";
import { styled } from "./stitches.config";

const StyledRow = styled("div", Flex, {
  [`& > * + *`]: { paddingLeft: 0 },
  variants: {
    gap: {
      1: { [`& > * + *`]: { paddingLeft: "$space$1" } },
      4: { [`& > * + *`]: { paddingLeft: "$space$4" } },
      8: { [`& > * + *`]: { paddingLeft: "$space$8" } },
      16: { [`& > * + *`]: { paddingLeft: "$space$16" } },
      24: { [`& > * + *`]: { paddingLeft: "$space$24" } },
      32: { [`& > * + *`]: { paddingLeft: "$space$32" } },
      40: { [`& > * + *`]: { paddingLeft: "$space$40" } },
      48: { [`& > * + *`]: { paddingLeft: "$space$48" } },
      56: { [`& > * + *`]: { paddingLeft: "$space$56" } },
      64: { [`& > * + *`]: { paddingLeft: "$space$64" } },

      10: { [`& > * + *`]: { paddingLeft: "$space$10" } },
      14: { [`& > * + *`]: { paddingLeft: "$space$14" } },
      20: { [`& > * + *`]: { paddingLeft: "$space$20" } },

      12: { [`& > * + *`]: { paddingLeft: "$space$12" } },
      52: { [`& > * + *`]: { paddingLeft: "$space$52" } },
      84: { [`& > * + *`]: { paddingLeft: "$space$84" } },
    },
    flex: { true: { flex: "1" } },
  },
  defaultVariants: {},
});

export type RowProps = ComponentProps<typeof StyledRow> & {
  children: ReactNode;
};

export function Row(props: RowProps) {
  return <StyledRow align="stretch" direction="row" justify="start" wrap="noWrap" {...props} />;
}
