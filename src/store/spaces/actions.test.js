import axios from "axios";
import { fetchSpaces, fetchSpacesSuccess } from "./actions";

jest.mock("axios");

describe("space actions", () => {
  describe("#fetchSpaces", () => {
    describe("when this function is called", () => {
      test("it should fetch the data and dispatch a fetchSpacesSuccess action", async () => {
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValueOnce({ spaces: [] });
        const response = {
          data: { spaces: { rows: [{ name: "matias" }] } },
        };

        axios.get.mockImplementationOnce(() => Promise.resolve(response));

        const thunk = fetchSpaces();
        await thunk(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(
          fetchSpacesSuccess(response.data.spaces.rows)
        );
      });
    });
  });
});
