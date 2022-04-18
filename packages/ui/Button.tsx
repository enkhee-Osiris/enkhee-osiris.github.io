import type { ComponentProps } from "react";

import { Icon, IconProps } from "./Icon";
import { styled } from "./stitches.config";

export const StyledButton = styled("button", {
  borderRadius: "8px",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: "500",
  gap: "8px",
  lineHeight: 1,
  pX: "16px",
  pY: "12px",
  "&:disabled": {
    backgroundColor: "$gray3",
    color: "$gray8",
    cursor: "not-allowed",
  },
  "&:disabled:hover": {
    backgroundColor: "$gray3",
  },
  "&:disabled:active": {
    backgroundColor: "$gray3",
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: "$orange3",
        border: "none",
        color: "$orange11",
        "&:hover": {
          backgroundColor: "$orange4",
        },
        "&:active": {
          backgroundColor: "$orange5",
        },
      },
      secondary: {
        backgroundColor: "transparent",
        border: "none",
        color: "$orange11",
        "&:hover": {
          backgroundColor: "$orange4",
        },
        "&:active": {
          backgroundColor: "$orange5",
        },
      },
      outlined: {
        pY: "10px",
        backgroundColor: "transparent",
        borderColor: "$orange7",
        borderStyle: "solid",
        borderWidth: "2px",
        color: "$orange11",
        "&:hover": {
          borderColor: "$orange8",
        },
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type ButtonProps = ComponentProps<typeof StyledButton> & {
  text: string;
  leadingIcon?: IconProps["name"];
  trailingIcon?: IconProps["name"];
};

export function Button({ text, leadingIcon, trailingIcon, ...rest }: ButtonProps) {
  return (
    <StyledButton {...rest}>
      {leadingIcon && <Icon name={leadingIcon} size={16} />}
      {text}
      {trailingIcon && <Icon name={trailingIcon} size={16} />}
    </StyledButton>
  );
}
