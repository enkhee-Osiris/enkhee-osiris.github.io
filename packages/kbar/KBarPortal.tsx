import * as React from "react";

import * as Portal from "@radix-ui/react-portal";

import { VisualState } from "./types";
import { useKBar } from "./useKBar";

interface Props {
  children: React.ReactNode;
}

export function KBarPortal({ children }: Props) {
  const { showing } = useKBar((state) => ({
    showing: state.visualState !== VisualState.hidden,
  }));

  if (!showing) {
    return null;
  }

  return <Portal.Root>{children}</Portal.Root>;
}
