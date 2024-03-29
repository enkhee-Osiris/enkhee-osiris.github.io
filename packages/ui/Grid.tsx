import { styled } from "./stitches.config";

export const Grid = styled("div", {
  display: "grid",

  variants: {
    align: {
      start: { alignItems: "start" },
      center: { alignItems: "center" },
      end: { alignItems: "end" },
      stretch: { alignItems: "stretch" },
      baseline: { alignItems: "baseline" },
    },
    justify: {
      start: { justifyContent: "start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "end" },
      between: { justifyContent: "space-between" },
    },
    flow: {
      row: { gridAutoFlow: "row" },
      column: { gridAutoFlow: "column" },
      dense: { gridAutoFlow: "dense" },
      rowDense: { gridAutoFlow: "row dense" },
      columnDense: { gridAutoFlow: "column dense" },
    },
    columns: {
      1: { gridTemplateColumns: "repeat(1, 1fr)" },
      2: { gridTemplateColumns: "repeat(2, 1fr)" },
      3: { gridTemplateColumns: "repeat(3, 1fr)" },
      4: { gridTemplateColumns: "repeat(4, 1fr)" },
      5: { gridTemplateColumns: "repeat(5, 1fr)" },
    },
    gap: {
      0: { gap: "$0" },
      1: { gap: "$1" },
      4: { gap: "$4" },
      8: { gap: "$8" },
      16: { gap: "$16" },
      24: { gap: "$24" },
      32: { gap: "$32" },
      40: { gap: "$40" },
      48: { gap: "$48" },
      56: { gap: "$56" },
      64: { gap: "$64" },
    },
    gapX: {
      0: { columnGap: "$space$0" },
      1: { columnGap: "$space$1" },
      4: { columnGap: "$space$4" },
      8: { columnGap: "$space$8" },
      16: { columnGap: "$space$16" },
      24: { columnGap: "$space$24" },
      32: { columnGap: "$space$32" },
      40: { columnGap: "$space$40" },
      48: { columnGap: "$space$48" },
      56: { columnGap: "$space$56" },
      64: { columnGap: "$space$64" },
    },
    gapY: {
      0: { rowGap: "$space$0" },
      1: { rowGap: "$space$1" },
      4: { rowGap: "$space$4" },
      8: { rowGap: "$space$8" },
      16: { rowGap: "$space$16" },
      24: { rowGap: "$space$24" },
      32: { rowGap: "$space$32" },
      40: { rowGap: "$space$40" },
      48: { rowGap: "$space$48" },
      56: { rowGap: "$space$56" },
      64: { rowGap: "$space$64" },
    },
  },
});
