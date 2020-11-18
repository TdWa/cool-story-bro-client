import {
  FETCH_SPACES_SUCCESS,
  fetchSpacesSuccess,
  fetchSpaces,
} from "../actions";
import axios from "axios";

// module mocks are declared on a global scope, function mocks on the appropiate describe/test scope
jest.mock("axios");

describe("#fetchSpaces", () => {
  describe("when called", () => {
    test("should dispatch an action FETCH_SPACES_SUCCESS", async () => {
      // mock axios implementation
      const response = { data: { spaces: { rows: [] } } };
      axios.get.mockImplementationOnce(() => Promise.resolve(response));

      // mock other two functions
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce({ spaces: { rows: [] } });

      await fetchSpaces()(dispatch, getState); // call it twice because it's a thunk, we simulate redux

      // assert on dispatch
      expect(getState).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(
        fetchSpacesSuccess(response.data.spaces.rows)
      );
    });
  });
});

describe("#fetchSpacesSuccess", () => {
  describe("if given an array of spaces", () => {
    // here is where our test cases will go
    test("should return an action object", () => {
      // test data simulating spaces
      const spaces = [{}, {}];
      // build action we expect to get back
      const expected = {
        type: FETCH_SPACES_SUCCESS,
        payload: spaces,
      };
      // call function
      const action = fetchSpacesSuccess(spaces);
      // do assertion on function return
      expect(action).toEqual(expected);
    });
    // 1. test => action.payload should have the same length as the argument given

    test("payload and argument should have same length", () => {
      // test data simulating spaces
      const spaces = [{}, {}];
      // build action we expect to get back
      const expected = 2;
      // call function
      const payload = fetchSpacesSuccess(spaces).payload;
      // do assertion on function return
      expect(payload).toHaveLength(expected);
    });
  });
  // describe => if given a null argument
  // test => action.payload should be null
  describe("if given a null argument", () => {
    test("action.payload should be null", () => {
      const action = fetchSpacesSuccess(null);
      expect(action.payload).toBeNull();
    });
  });
});
