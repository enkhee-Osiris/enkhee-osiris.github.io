import * as React from "react";

import { render, fireEvent, RenderResult } from "@testing-library/react";

import { KBarProvider } from "../KBarContextProvider";
import { useKBar } from "../useKBar";
import { useMatches } from "../useMatches";
import { createAction, Priority } from "../utils";

jest.mock("../utils", () => ({
  ...jest.requireActual("../utils"),
  // Mock out throttling as we don't need it in our test environment.
  useThrottledValue: (value: any) => value,
}));

function Search() {
  const { search, query } = useKBar((state) => ({
    search: state.searchQuery,
  }));

  return (
    <input
      aria-label="search-input"
      value={search}
      onChange={(e) => query.setSearch(e.target.value)}
    />
  );
}

function Results() {
  const { results } = useMatches();

  return (
    <ul>
      {results.map((result) =>
        typeof result === "string" ? (
          <li key={result}>{result}</li>
        ) : (
          <li key={result.id}>{result.name}</li>
        )
      )}
    </ul>
  );
}

function BasicComponent() {
  const action1 = createAction({ name: "Action 1" });
  const action2 = createAction({ name: "Action 2" });
  const action3 = createAction({ name: "Action 3" });
  const childAction1 = createAction({
    name: "Child Action 1",
    parent: action1.id,
  });

  return (
    <KBarProvider actions={[action1, action2, action3, childAction1]}>
      <Search />
      <Results />
    </KBarProvider>
  );
}

function WithPriorityComponent() {
  const action1 = createAction({ name: "Action 1", priority: Priority.LOW });
  const action2 = createAction({ name: "Action 2", priority: Priority.HIGH });
  const action3 = createAction({ name: "Action 3", priority: Priority.HIGH });
  const action4 = createAction({
    name: "Action 4",
    priority: Priority.HIGH,
    section: {
      name: "Section 1",
      priority: Priority.HIGH,
    },
  });
  const childAction1 = createAction({
    name: "Child Action 1",
    parent: action1.id,
  });

  return (
    <KBarProvider actions={[action1, action2, action3, action4, childAction1]}>
      <Search />
      <Results />
    </KBarProvider>
  );
}

const setup = (Component: React.ComponentType) => {
  const utils = render(<Component />);
  const input = utils.getByLabelText("search-input");
  return {
    input,
    ...utils,
  } as Utils;
};

type Utils = RenderResult & { input: HTMLInputElement };

describe("useMatches", () => {
  describe("Basic", () => {
    let utils: Utils;
    beforeEach(() => {
      utils = setup(BasicComponent);
    });

    it("returns root results with an empty search query", () => {
      const results = utils.getAllByText(/Action/i);
      expect(results.length).toEqual(3);
      expect(results[0].textContent).toEqual("Action 1");
      expect(results[1].textContent).toEqual("Action 2");
      expect(results[2].textContent).toEqual("Action 3");
    });

    it("returns nested results when search query is present", () => {
      const { input } = utils;
      fireEvent.change(input, { target: { value: "1" } });
      const results = utils.getAllByText(/Action/i);
      expect(results.length).toEqual(2);
      expect(results[0].textContent).toEqual("Action 1");
      expect(results[1].textContent).toEqual("Child Action 1");
    });
  });

  describe("With priority", () => {
    let utils: Utils;
    beforeEach(() => {
      utils = setup(WithPriorityComponent);
    });

    it("returns a prioritized list", () => {
      const results = utils.getAllByText(/Action/i);
      expect(results.length).toEqual(4);

      expect(results[0].textContent).toEqual("Action 4");
      expect(results[1].textContent).toEqual("Action 2");
      expect(results[2].textContent).toEqual("Action 3");
      expect(results[3].textContent).toEqual("Action 1");

      expect(utils.queryAllByText(/Section 1/i));
    });
  });
});
