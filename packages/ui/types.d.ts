/// <reference types="react" />
/// <reference types="@stitches/react/types/styled-component" />

type IntrinsicElementsKeys = keyof JSX.IntrinsicElements;

type StitchesComponentProp<T extends StyledComponent<any>> = ComponentProps<T> & {
  as?: IntrinsicElementsKeys | React.ComponentType<any>;
};
