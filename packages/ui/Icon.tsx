import type { ComponentProps } from "react";

import ICONS from "./icons";
import { styled } from "./stitches.config";

const Svg = styled("svg");

export type IconProps = ComponentProps<typeof Svg> & {
  name: keyof typeof ICONS;
  size?: number;
};

export function Icon({ name, size = 24, ...rest }: IconProps) {
  if (!Object.prototype.hasOwnProperty.call(ICONS, name)) {
    return null;
  }

  const IconPath = ICONS[name];

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <IconPath />
      <title>{name.replace("-", " ")}</title>
    </Svg>
  );
}
