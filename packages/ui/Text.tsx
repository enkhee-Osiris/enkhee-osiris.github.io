import { styled } from "./stitches.config";

export const Text = styled("p", {
  color: "$gray12",
  variants: {
    subtitle: { true: { color: "$gray11" } },
    variant: {
      display: {},
      text: {},
    },
    size: {
      xl: {},
      lg: {},
      md: {},
      sm: {},
    },
    weight: {
      regular: { fontWeight: "400" },
      medium: { fontWeight: "500" },
      bold: { fontWeight: "600" },
    },
  },
  defaultVariants: {
    subtitle: false,
    variant: "text",
    size: "md",
    weight: "regular",
  },
  compoundVariants: [
    {
      variant: "display",
      size: "xl",
      css: { fontSize: "72px", lineHeight: "90px", letterSpacing: "-0.02em" },
    },
    {
      variant: "display",
      size: "lg",
      css: { fontSize: "60px", lineHeight: "72px", letterSpacing: "-0.02em" },
    },
    {
      variant: "display",
      size: "md",
      css: { fontSize: "48px", lineHeight: "60px", letterSpacing: "-0.02em" },
    },
    {
      variant: "display",
      size: "sm",
      css: { fontSize: "36px", lineHeight: "44px", letterSpacing: "-0.02em" },
    },
    { variant: "text", size: "xl", css: { fontSize: "20px", lineHeight: "30px" } },
    { variant: "text", size: "lg", css: { fontSize: "18px", lineHeight: "28px" } },
    { variant: "text", size: "md", css: { fontSize: "16px", lineHeight: "24px" } },
    { variant: "text", size: "sm", css: { fontSize: "14px", lineHeight: "24px" } },
  ],
});
