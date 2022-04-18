import { styled } from "./stitches.config";

export const Flex = styled("div", {
  display: "flex",

  variants: {
    reversed: { true: {} },
    direction: {
      row: { flexDirection: "row" },
      column: { flexDirection: "column" },
      rowReverse: { flexDirection: "row-reverse" },
      columnReverse: { flexDirection: "column-reverse" },
    },
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
      stretch: { alignItems: "stretch" },
      baseline: { alignItems: "baseline" },
    },
    justify: {
      start: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
      between: { justifyContent: "space-between" },
    },
    wrap: {
      noWrap: { flexWrap: "nowrap" },
      wrap: { flexWrap: "wrap" },
      wrapReverse: { flexWrap: "wrap-reverse" },
    },
  },
  compoundVariants: [
    { direction: "row", reversed: true, css: { flexDirection: "row-reverse" } },
    { direction: "column", reversed: true, css: { flexDirection: "column-reverse" } },
    { direction: "rowRevese", reversed: true, css: { flexDirection: "row" } },
    { direction: "columnReverse", reversed: true, css: { flexDirection: "column" } },
  ],
  defaultVariants: {
    direction: "row",
    align: "stretch",
    justify: "start",
    wrap: "noWrap",
  },
});
