import { fetchHomepages } from "./actions";
import axios from "axios";

jest.mock("axios");

describe("fetchHomepages", () => {
  test("should fetch the next homepages from the api", async (done) => {
    // Arrange (mock things)
    const getStateMock = jest.fn(() => {
      return { homepages: [{}, {}] };
    });
    const dispatchMock = jest.fn(); // we're just going to check if it got called

    const resp = {
      data: {
        homepages: {
          rows: [{}, {}, {}, {}, {}],
        },
      },
    };
    axios.get.mockResolvedValue(resp);
    // Act

    await fetchHomepages()(dispatchMock, getStateMock);
    // Assert
    const firstAxiosCall = axios.get.mock.calls[0];
    const firstAxiosCallArgument = firstAxiosCall[0];

    expect(getStateMock.mock.calls.length).toBe(1);
    expect(firstAxiosCallArgument).toBe(
      "http://localhost:4000/homepages?limit=10&offset=2"
    );

    const firstDispatchCall = dispatchMock.mock.calls[0];
    const firstDispatchCallArgument = firstDispatchCall[0];

    expect(firstDispatchCallArgument).toEqual({
      payload: [{}, {}, {}, {}, {}],
      type: "FETCH_HOMEPAGES_SUCCESS",
    });

    done();
  });
});
