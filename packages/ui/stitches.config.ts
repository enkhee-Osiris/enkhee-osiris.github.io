/* eslint-disable max-lines */
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
    space: {
      // Linear 8, 16, 24, 32, 40, 48, 56, 64
      0: "0",
      1: "1px",
      4: "4px",
      8: "8px",
      16: "16px",
      24: "24px",
      32: "32px",
      40: "40px",
      48: "48px",
      56: "56px",
      64: "64px",

      // Golden ratio 10, 14, 20, 40, 64
      10: "10px",
      14: "14px",
      20: "20px",

      // 8, 12, 20, 32, 52, 84
      12: "12px",
      52: "52px",
      84: "84px",
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
    fontFamily: "'IBM Plex Sans', sans-serif",
  },
  "html, body, div#__next, div#__next > div": {
    height: "100%",
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
