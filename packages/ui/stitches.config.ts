import {
  gray,
  blue,
  red,
  grass,
  orange,
  grayDark,
  blueDark,
  redDark,
  grassDark,
  orangeDark,
} from "@radix-ui/colors";
import { createStitches } from "@stitches/react";

const { styled, globalCss, getCssText, createTheme } = createStitches({
  theme: {
    colors: {
      ...gray,
      ...blue,
      ...red,
      ...grass,
      ...orange,
    },
  },
  media: {
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
    "2xl": "(min-width: 1536px)",
  },
  utils: {
    mX: (value: number | string) => ({ marginLeft: value, marginRight: value }),
    mY: (value: number | string) => ({ marginTop: value, marginBottom: value }),
    m: (value: number | string) => ({
      marginTop: value,
      marginLeft: value,
      marginBottom: value,
      marginRight: value,
    }),
    mt: (value: number | string) => ({ marginTop: value }),
    mr: (value: number | string) => ({ marginRight: value }),
    mb: (value: number | string) => ({ marginBottom: value }),
    ml: (value: number | string) => ({ marginLeft: value }),
    pX: (value: number | string) => ({ paddingLeft: value, paddingRight: value }),
    pY: (value: number | string) => ({ paddingTop: value, paddingBottom: value }),
    p: (value: number | string) => ({
      paddingTop: value,
      paddingLeft: value,
      paddingBottom: value,
      paddingRight: value,
    }),
    pt: (value: number | string) => ({ paddingTop: value }),
    pr: (value: number | string) => ({ paddingRight: value }),
    pb: (value: number | string) => ({ paddingBottom: value }),
    pl: (value: number | string) => ({ paddingLeft: value }),
  },
});

const globalStyles = globalCss({
  html: {
    boxSizing: "border-box",
    fontSize: "16px",
  },
  "*, *::before, *::after": { boxSizing: "inherit" },
  "body, h1, h2, h3, h4, h5, h6, p, ol, ul": {
    margin: 0,
    padding: 0,
    fontSize: "100%",
    fontWeight: "normal",
  },
  "ol, ul": { listStyle: "none" },
  "button, input, select": {
    margin: 0,
  },
  a: { color: "inherit", textDecoration: "none" },
});

const darkTheme = createTheme("dark-theme", {
  colors: {
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...grassDark,
    ...orangeDark,
  },
});

export { darkTheme, getCssText, globalStyles, styled };
