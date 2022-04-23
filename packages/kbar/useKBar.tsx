import * as React from "react";

// eslint-disable-next-line import/no-cycle
import { KBarContext } from "./KBarContextProvider";
import type { KBarOptions, KBarQuery, KBarState } from "./types";

interface BaseKBarReturnType {
  query: KBarQuery;
  options: KBarOptions;
}

type UseKBarReturnType<S = null> = S extends null ? BaseKBarReturnType : S & BaseKBarReturnType;

export function useKBar<C = null>(collector?: (state: KBarState) => C): UseKBarReturnType<C> {
  const { query, getState, subscribe, options } = React.useContext(KBarContext);

  const collected = React.useRef(collector?.(getState()));
  const collectorRef = React.useRef(collector);

  const onCollect = React.useCallback(
    (collectedList: any) => ({
      ...collectedList,
      query,
      options,
    }),
    [query, options]
  );

  const [render, setRender] = React.useState(onCollect(collected.current));

  React.useEffect(() => {
    let unsubscribe: any;
    if (collectorRef.current) {
      unsubscribe = subscribe(
        (current) => (collectorRef.current as any)(current),
        (collectedList) => setRender(onCollect(collectedList))
      );
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [onCollect, subscribe]);

  return render;
}
