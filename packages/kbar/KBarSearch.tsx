import * as React from "react";

import { VisualState } from "./types";
import { useKBar } from "./useKBar";

export const KBAR_LISTBOX = "kbar-listbox";
export const getListboxItemId = (id: number) => `kbar-listbox-item-${id}`;

export function KBarSearch(
  props: React.InputHTMLAttributes<HTMLInputElement> & { defaultPlaceholder?: string }
) {
  const { query, search, actions, currentRootActionId, activeIndex, showing, options } = useKBar(
    (state) => ({
      search: state.searchQuery,
      currentRootActionId: state.currentRootActionId,
      actions: state.actions,
      activeIndex: state.activeIndex,
      showing: state.visualState === VisualState.showing,
    })
  );

  const ownRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    query.setSearch("");
    ownRef.current!.focus();

    return () => query.setSearch("");
  }, [currentRootActionId, query]);

  const placeholder = React.useMemo((): string => {
    // eslint-disable-next-line react/destructuring-assignment
    const defaultText = props.defaultPlaceholder ?? "Type a command or search…";

    return currentRootActionId && actions[currentRootActionId]
      ? actions[currentRootActionId].name
      : defaultText;

    // eslint-disable-next-line react/destructuring-assignment
  }, [actions, currentRootActionId, props.defaultPlaceholder]);

  /* eslint-disable jsx-a11y/no-autofocus */
  return (
    <input
      {...props}
      ref={ownRef}
      autoFocus
      autoComplete="off"
      role="combobox"
      spellCheck="false"
      aria-expanded={showing}
      aria-controls={KBAR_LISTBOX}
      aria-activedescendant={getListboxItemId(activeIndex)}
      value={search}
      placeholder={placeholder}
      onChange={(event) => {
        // eslint-disable-next-line react/destructuring-assignment
        props.onChange?.(event);
        query.setSearch(event.target.value);
        options?.callbacks?.onQueryChange?.(event.target.value);
      }}
      onKeyDown={(event) => {
        // eslint-disable-next-line react/destructuring-assignment
        props.onKeyDown?.(event);
        if (currentRootActionId && !search && event.key === "Backspace") {
          const { parent } = actions[currentRootActionId];
          query.setCurrentRootAction(parent);
        }
      }}
    />
  );
}
