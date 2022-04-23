import * as React from "react";

// @ts-ignore
import commandScore from "command-score";

import type { ActionImpl } from "./action/ActionImpl";
import { useKBar } from "./useKBar";
import { Priority, useThrottledValue } from "./utils";

export const NO_GROUP = {
  name: "none",
  priority: Priority.NORMAL,
};

function order(a: { priority: number }, b: { priority: number }) {
  /**
   * Larger the priority = higher up the list
   */
  return b.priority - a.priority;
}

type SectionName = string;

function useInternalMatches(filtered: ActionImpl[], search: string) {
  const value = React.useMemo(
    () => ({
      filtered,
      search,
    }),
    [filtered, search]
  );

  const { filtered: throttledFiltered, search: throttledSearch } = useThrottledValue(value);

  return React.useMemo(() => {
    if (throttledSearch.trim() === "") {
      return throttledFiltered.map((action) => ({ score: 0, action }));
    }

    const matches: Match[] = [];

    for (let i = 0; i < throttledFiltered.length; i += 1) {
      const action = throttledFiltered[i];
      const score = commandScore(
        [action.name, action.keywords, action.subtitle].join(" "),
        throttledSearch
      );
      if (score > 0) {
        matches.push({ score, action });
      }
    }

    return matches;
  }, [throttledFiltered, throttledSearch]) as Match[];
}

/**
 * returns deep matches only when a search query is present
 */
export function useMatches() {
  const { search, actions, rootActionId } = useKBar((state) => ({
    search: state.searchQuery,
    actions: state.actions,
    rootActionId: state.currentRootActionId,
  }));

  const rootResults = React.useMemo(
    () =>
      Object.keys(actions)
        .reduce((acc, actionId) => {
          const action = actions[actionId];
          if (!action.parent && !rootActionId) {
            acc.push(action);
          }
          if (action.id === rootActionId) {
            for (let i = 0; i < action.children.length; i += 1) {
              acc.push(action.children[i]);
            }
          }
          return acc;
        }, [] as ActionImpl[])
        .sort(order),
    [actions, rootActionId]
  );

  const getDeepResults = React.useCallback((actionList: ActionImpl[]) => {
    const actionListClone: ActionImpl[] = [];
    for (let i = 0; i < actionList.length; i += 1) {
      actionListClone.push(actionList[i]);
    }

    return (function collectChildren(actionListArg: ActionImpl[], all = actionListClone) {
      for (let i = 0; i < actionListArg.length; i += 1) {
        if (actionListArg[i].children.length > 0) {
          const childsChildren = actionListArg[i].children;
          for (let m = 0; m < childsChildren.length; m += 1) {
            all.push(childsChildren[m]);
          }
          collectChildren(actionListArg[i].children, all);
        }
      }
      return all;
    })(actionList);
  }, []);

  const emptySearch = !search;

  const filtered = React.useMemo(() => {
    if (emptySearch) return rootResults;
    return getDeepResults(rootResults);
  }, [getDeepResults, rootResults, emptySearch]);

  const matches = useInternalMatches(filtered, search);

  const results = React.useMemo(() => {
    /**
     * Store a reference to a section and it's list of actions.
     * Alongside these actions, we'll keep a temporary record of the
     * final priority calculated by taking the commandScore + the
     * explicitly set `action.priority` value.
     */
    const map: Record<SectionName, { priority: number; action: ActionImpl }[]> = {};
    /**
     * Store another reference to a list of sections alongside
     * the section's final priority, calculated the same as above.
     */
    const list: { priority: number; name: SectionName }[] = [];
    /**
     * We'll take the list above and sort by its priority. Then we'll
     * collect all actions from the map above for this specific name and
     * sort by its priority as well.
     */
    let ordered: { name: SectionName; actions: ActionImpl[] }[] = [];

    for (let i = 0; i < matches.length; i += 1) {
      const match = matches[i];
      const { action } = match;
      const score = match.score || Priority.NORMAL;

      const section = {
        name:
          typeof action.section === "string"
            ? action.section
            : action.section?.name || NO_GROUP.name,
        priority:
          typeof action.section === "string" ? score : action.section?.priority || 0 + score,
      };

      if (!map[section.name]) {
        map[section.name] = [];
        list.push(section);
      }

      map[section.name].push({
        priority: action.priority + score,
        action,
      });
    }

    ordered = list.sort(order).map((group) => ({
      name: group.name,
      actions: map[group.name].sort(order).map((item) => item.action),
    }));

    /**
     * Our final result is simply flattening the ordered list into
     * our familiar (ActionImpl | string)[] shape.
     */
    const result: (string | ActionImpl)[] = [];

    for (let i = 0; i < ordered.length; i += 1) {
      const group = ordered[i];

      if (group.name !== NO_GROUP.name) result.push(group.name);

      for (let m = 0; m < group.actions.length; m += 1) {
        result.push(group.actions[m]);
      }
    }

    return result;
  }, [matches]);

  // ensure that users have an accurate `currentRootActionId`
  // that syncs with the throttled return value.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoRootActionId = React.useMemo(() => rootActionId, [results]);

  return React.useMemo(
    () => ({
      results,
      rootActionId: memoRootActionId,
    }),
    [memoRootActionId, results]
  );
}

type Match = {
  action: ActionImpl;
  /**
   * Represents the commandScore matchiness value which we use
   * in addition to the explicitly set `action.priority` to
   * calculate a more fine tuned fuzzy search.
   */
  score: number;
};

/**
 * @deprecated use useMatches
 */
export const useDeepMatches = useMatches;
