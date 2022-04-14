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
    color: "$gray11",
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
        backgroundColor: "$blue3",
        border: "none",
        color: "$blue11",
        "&:hover": {
          backgroundColor: "$blue4",
        },
        "&:active": {
          backgroundColor: "$blue5",
        },
      },
      secondary: {
        backgroundColor: "transparent",
        border: "none",
        color: "$blue11",
        "&:hover": {
          backgroundColor: "$blue4",
        },
        "&:active": {
          backgroundColor: "$blue5",
        },
      },
      outlined: {
        pY: "10px",
        backgroundColor: "transparent",
        borderColor: "$blue7",
        borderStyle: "solid",
        borderWidth: "2px",
        color: "$blue11",
        "&:hover": {
          borderColor: "$blue8",
        },
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type ButtonProps = StitchesComponentProp<typeof StyledButton> & {
  text: string;
  leadingIcon?: IconProps["name"];
  trailingIcon?: IconProps["name"];
};

export function Button({ text, leadingIcon, trailingIcon, ...rest }: ButtonProps) {
  return (
    <StyledButton {...rest}>
      {leadingIcon && <Icon name={leadingIcon} width={16} height={16} />}
      {text}
      {trailingIcon && <Icon name={trailingIcon} width={16} height={16} />}
    </StyledButton>
  );
}
