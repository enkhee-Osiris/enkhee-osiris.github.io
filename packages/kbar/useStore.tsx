import * as React from "react";

import { deepEqual } from "fast-equals";

import { ActionInterface } from "./action/ActionInterface";
import { history } from "./action/HistoryImpl";
import type { Action, IKBarContext, KBarOptions, KBarProviderProps, KBarState } from "./types";
import { VisualState } from "./types";

class Subscriber {
  collected: any;

  collector;

  onChange;

  constructor(collector: () => any, onChange: (collected: any) => any) {
    this.collector = collector;
    this.onChange = onChange;
  }

  collect() {
    try {
      // grab latest state
      const recollect = this.collector();
      if (!deepEqual(recollect, this.collected)) {
        this.collected = recollect;
        if (this.onChange) {
          this.onChange(this.collected);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  }
}

class Publisher {
  getState;

  subscribers: Subscriber[] = [];

  constructor(getState: () => KBarState) {
    this.getState = getState;
  }

  subscribe<C>(collector: (state: KBarState) => C, onChange: (collected: C) => void) {
    const subscriber = new Subscriber(() => collector(this.getState()), onChange);
    this.subscribers.push(subscriber);
    return this.unsubscribe.bind(this, subscriber);
  }

  // eslint-disable-next-line consistent-return
  unsubscribe(subscriber: Subscriber) {
    if (this.subscribers.length) {
      const index = this.subscribers.indexOf(subscriber);
      if (index > -1) {
        return this.subscribers.splice(index, 1);
      }
    }
  }

  notify() {
    this.subscribers.forEach((subscriber) => subscriber.collect());
  }
}

export function useStore(props: KBarProviderProps) {
  const optionsRef = React.useRef({
    animations: {
      enterMs: 200,
      exitMs: 100,
    },
    ...props.options,
  } as KBarOptions);

  const actionsInterface = React.useMemo(
    () =>
      new ActionInterface(props.actions || [], {
        historyManager: optionsRef.current.enableHistory ? history : undefined,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // TODO: at this point useReducer might be a better approach to managing state.
  const [state, setState] = React.useState<KBarState>({
    searchQuery: "",
    currentRootActionId: null,
    visualState: VisualState.hidden,
    actions: { ...actionsInterface.actions },
    activeIndex: 0,
  });

  const currState = React.useRef(state);
  currState.current = state;

  const getState = React.useCallback(() => currState.current, []);
  const publisher = React.useMemo(() => new Publisher(getState), [getState]);

  React.useEffect(() => {
    currState.current = state;
    publisher.notify();
  }, [state, publisher]);

  const registerActions = React.useCallback(
    (actions: Action[]) => {
      setState((prevState) => ({
        ...prevState,
        actions: actionsInterface.add(actions),
      }));

      return function unregister() {
        setState((prevState) => ({
          ...prevState,
          actions: actionsInterface.remove(actions),
        }));
      };
    },
    [actionsInterface]
  );

  return React.useMemo(
    () =>
      ({
        getState,
        query: {
          setCurrentRootAction: (actionId) => {
            setState((prevState) => ({
              ...prevState,
              currentRootActionId: actionId,
            }));
          },
          setVisualState: (cb) => {
            setState((prevState) => ({
              ...prevState,
              visualState: typeof cb === "function" ? cb(prevState.visualState) : cb,
            }));
          },
          setSearch: (searchQuery) =>
            setState((prevState) => ({
              ...prevState,
              searchQuery,
            })),
          registerActions,
          toggle: () =>
            setState((prevState) => ({
              ...prevState,
              visualState: [VisualState.animatingOut, VisualState.hidden].includes(
                prevState.visualState
              )
                ? VisualState.animatingIn
                : VisualState.animatingOut,
            })),
          setActiveIndex: (cb) =>
            setState((prevState) => ({
              ...prevState,
              activeIndex: typeof cb === "number" ? cb : cb(prevState.activeIndex),
            })),
        },
        options: optionsRef.current,
        subscribe: (collector, cb) => publisher.subscribe(collector, cb),
      } as IKBarContext),
    [getState, publisher, registerActions]
  );
}
