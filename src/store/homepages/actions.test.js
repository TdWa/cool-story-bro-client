import axios from "axios";
import { fetchHomepages, fetchHomepagesSuccess } from "./actions";

jest.mock("axios");

describe("homepage actions", () => {
  describe("#fetchHomepages", () => {
    describe("when this function is called", () => {
      test("it should fetch the data and dispatch a fetchHomepagesSuccess action", async () => {
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValueOnce({ homepages: [] });
        const response = {
          data: { homepages: { rows: [{ name: "matias" }] } },
        };

        axios.get.mockImplementationOnce(() => Promise.resolve(response));

        const thunk = fetchHomepages();
        await thunk(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(
          fetchHomepagesSuccess(response.data.homepages.rows)
        );
      });
    });
  });
});
