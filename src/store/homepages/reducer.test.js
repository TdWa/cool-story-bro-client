import reducer from "./reducer";
import { FETCH_HOMEPAGES_SUCCESS } from "./actions";

describe("#homepageReducer", () => {
  describe("FETCH_HOMEPAGES_SUCCESS", () => {
    describe("if given an empty state and a FETCH_HOMEPAGES_SUCCESS with a an array as payload", () => {
      test("should return an updated array of homepages", () => {
        const homepages = [{ name: "matias" }, { name: "rein" }];
        const action = { type: FETCH_HOMEPAGES_SUCCESS, payload: homepages };
        const result = reducer([], action);
        expect(result).toEqual([...homepages]);
      });
    });
    describe("if given a state with homepages and a FETCH_HOMEPAGES_SUCCESS with a an array as payload", () => {
      test("should return an both the homepages in the state and the new ones", () => {
        const homepages = [{ name: "matias" }, { name: "rein" }];
        const state = [{ name: "bart" }, { name: "renee" }];
        const action = { type: FETCH_HOMEPAGES_SUCCESS, payload: homepages };
        const result = reducer(state, action);
        expect(result).toEqual([...state, ...homepages]);
      });
    });
  });
});
