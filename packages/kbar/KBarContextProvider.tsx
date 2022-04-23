import * as React from "react";

// eslint-disable-next-line import/no-cycle
import { InternalEvents } from "./InternalEvents";
import type { IKBarContext, KBarProviderProps } from "./types";
import { useStore } from "./useStore";

export const KBarContext = React.createContext<IKBarContext>({} as IKBarContext);

export function KBarProvider({
  children,
  ...rest
}: KBarProviderProps & { children: React.ReactNode }) {
  const contextValue = useStore(rest);

  return (
    <KBarContext.Provider value={contextValue}>
      <InternalEvents />
      {children}
    </KBarContext.Provider>
  );
}
