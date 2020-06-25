import reducer from "./reducer";

describe("appState reducer", () => {
  test("should return an initial state when no state is passed in ", () => {
    // Arrange (N/A with this test)

    // Act
    const newState = reducer();

    // Assert
    expect(newState).toEqual({ loading: false, message: null });
  });
  test("should set loading to true when an APP_LOADING action is dispatched", () => {
    // Arrange -> reducer with initialState
    const initialState = { loading: false, message: null };
    const action = { type: "APP_LOADING" };

    // Act
    const newState = reducer(initialState, action);

    // Assert
    expect(newState).toEqual({ loading: true, message: null });
  });
  test("should set loading to false when an APP_DONE_LOADING action is dispatched", () => {
    // Arrange -> reducer with initialState
    const initialState = { loading: true, message: null };
    const action = { type: "APP_DONE_LOADING" };

    // Act
    const newState = reducer(initialState, action);

    // Assert
    expect(newState).toEqual({ loading: false, message: null });
  });
});
