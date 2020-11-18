import reducer from "../reducer";
import { FETCH_SPACES_SUCCESS } from "../actions";

describe("spaceReducer", () => {
  const initialState = [];

  describe("if given state === undefined and an action with unknown action type", () => {
    test("state should be as the initialState", () => {
      const state = undefined;
      const action = { type: undefined };
      const result = reducer(state, action);
      expect(result).toEqual(initialState);
    });
  });

  describe("when given a FETCH_SPACES_SUCCESS action type", () => {
    test("state should be an array with two empty objects", () => {
      const action = { type: FETCH_SPACES_SUCCESS, payload: [{}, {}] };
      const result = reducer(undefined, action);
      expect(result).toHaveLength(action.payload.length);
      expect(result).toEqual([{}, {}]);
    });
  });
});
