import * as React from "react";

import { ActionImpl } from "./action/ActionImpl";
import { getListboxItemId, KBAR_LISTBOX } from "./KBarSearch";
import { useKBar } from "./useKBar";
import { usePointerMovedSinceMount } from "./utils";

const START_INDEX = 0;

interface RenderParams<T = ActionImpl | string> {
  item: T;
  active: boolean;
}

export interface KBarResultsProps {
  items: any[];
  onRender: (params: RenderParams) => React.ReactElement | null;
  maxHeight?: number;
}

/* eslint-disable react/destructuring-assignment */
export function KBarResults(props: KBarResultsProps) {
  const activeRef = React.useRef<HTMLDivElement>(null);
  const parentRef = React.useRef<HTMLDivElement>(null);

  // store a ref to all items so we do not have to pass
  // them as a dependency when setting up event listeners.
  const itemsRef = React.useRef(props.items);
  itemsRef.current = props.items;

  const { query, search, currentRootActionId, activeIndex, options } = useKBar((state) => ({
    search: state.searchQuery,
    currentRootActionId: state.currentRootActionId,
    activeIndex: state.activeIndex,
  }));

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || (event.ctrlKey && event.key === "p")) {
        event.preventDefault();
        query.setActiveIndex((index) => {
          let nextIndex = index > START_INDEX ? index - 1 : index;
          // avoid setting active index on a group
          if (typeof itemsRef.current[nextIndex] === "string") {
            if (nextIndex === 0) return index;
            nextIndex -= 1;
          }
          return nextIndex;
        });
      } else if (event.key === "ArrowDown" || (event.ctrlKey && event.key === "n")) {
        event.preventDefault();
        query.setActiveIndex((index) => {
          let nextIndex = index < itemsRef.current.length - 1 ? index + 1 : index;
          // avoid setting active index on a group
          if (typeof itemsRef.current[nextIndex] === "string") {
            if (nextIndex === itemsRef.current.length - 1) return index;
            nextIndex += 1;
          }
          return nextIndex;
        });
      } else if (event.key === "Enter") {
        event.preventDefault();
        // storing the active dom element in a ref prevents us from
        // having to calculate the current action to perform based
        // on the `activeIndex`, which we would have needed to add
        // as part of the dependencies array.
        activeRef.current?.click();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [query]);

  React.useEffect(() => {
    if (parentRef.current && activeRef.current) {
      const { scrollTop, offsetHeight } = parentRef.current;
      const childOffset = activeRef.current.offsetTop;

      const direction =
        offsetHeight <= childOffset ? "down" : scrollTop > childOffset ? "up" : null; // eslint-disable-line no-nested-ternary

      if (direction) {
        parentRef.current.scrollTo({
          top: childOffset + (direction === "up" ? -33 : 0),
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  React.useEffect(() => {
    // TODO(tim): fix scenario where async actions load in
    // and active index is reset to the first item. i.e. when
    // users register actions and bust the `useRegisterActions`
    // cache, we won't want to reset their active index as they
    // are navigating the list.
    query.setActiveIndex(
      // avoid setting active index on a group
      typeof props.items[START_INDEX] === "string" ? START_INDEX + 1 : START_INDEX
    );
  }, [search, currentRootActionId, props.items, query]);

  const execute = React.useCallback(
    (item: RenderParams["item"]) => {
      if (typeof item === "string") return;
      if (item.command) {
        item.command.perform(item);
        query.toggle();
      } else {
        query.setSearch("");
        query.setCurrentRootAction(item.id);
      }
      options.callbacks?.onSelectAction?.(item);
    },
    [query, options]
  );

  const pointerMoved = usePointerMovedSinceMount();

  return (
    <div
      ref={parentRef}
      style={{
        maxHeight: props.maxHeight || 400,
        overflow: "auto",
        position: "relative",
        paddingTop: "12px",
        paddingBottom: "12px",
      }}
    >
      <div
        id={KBAR_LISTBOX}
        role="listbox"
        style={{
          width: "100%",
        }}
      >
        {itemsRef.current.map((item, index) => {
          const handlers = typeof item !== "string" && {
            onPointerMove: () =>
              pointerMoved && activeIndex !== index && query.setActiveIndex(index),
            onPointerDown: () => query.setActiveIndex(index),
            onClick: () => execute(item),
          };
          const active = index === activeIndex;

          return (
            <div
              ref={active ? activeRef : null}
              id={getListboxItemId(index)}
              role="option"
              aria-selected={active}
              key={index}
              style={{
                width: "100%",
              }}
              {...handlers}
            >
              {props.onRender({
                item,
                active,
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
