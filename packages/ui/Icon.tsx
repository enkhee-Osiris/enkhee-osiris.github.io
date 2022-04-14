import ICONS from "./icons";
import { styled } from "./stitches.config";

const Svg = styled("svg");

export type IconProps = Omit<StitchesComponentProp<typeof Svg>, "name"> & {
  name: keyof typeof ICONS;
  width?: number;
  height?: number;
};

export function Icon({ name, width = 24, height = 24, ...rest }: IconProps) {
  if (!Object.prototype.hasOwnProperty.call(ICONS, name)) {
    return null;
  }

  const IconPath = ICONS[name];

  return (
    <Svg
      width={width}
      height={height}
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
