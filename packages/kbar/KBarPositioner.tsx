import * as React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const defaultStyle: React.CSSProperties = {
  position: "fixed",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  width: "100%",
  inset: "0px",
  padding: "14vh 16px 16px",
};

function getStyle(style: React.CSSProperties | undefined) {
  return style ? { ...defaultStyle, ...style } : defaultStyle;
}

export const KBarPositioner = React.forwardRef<HTMLDivElement, Props>(
  ({ style, children, ...props }, ref) => (
    <div ref={ref} style={getStyle(style)} {...props}>
      {children}
    </div>
  )
);
