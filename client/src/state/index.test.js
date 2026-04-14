import reducer, { setMode } from "./index";

describe("globalSlice reducer", () => {
  const initialState = {
    mode: "dark",
    userId: "63701cc1f03239b7f700000e",
  };

  test("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  test("should toggle mode from dark to light", () => {
    const previousState = { mode: "dark", userId: "some-id" };
    expect(reducer(previousState, setMode())).toEqual({
      mode: "light",
      userId: "some-id",
    });
  });

  test("should toggle mode from light to dark", () => {
    const previousState = { mode: "light", userId: "some-id" };
    expect(reducer(previousState, setMode())).toEqual({
      mode: "dark",
      userId: "some-id",
    });
  });
});
