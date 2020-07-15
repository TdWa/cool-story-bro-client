import axios from "axios";
import { fetchHomepages } from "./actions";
import rootreducer from "../rootReducer";

jest.mock("axios"); // replace axios with a fake function, that doesn't call the api

describe("fetchHomepages", () => {
  test("should work", async (done) => {
    // AAA
    // Arrange -> mocking
    // don't call the actual api -> mock axios
    const fakeResponse = {
      data: {
        homepages: {
          rows: [{}, {}],
        },
      },
    };
    axios.get.mockResolvedValue(fakeResponse);

    // does getState get called? -> mock getState
    const fakeState = rootreducer();
    const getStateMock = jest.fn();
    getStateMock.mockReturnValueOnce(fakeState);

    // does dispatch get called? -> mock dispatch
    const dispatchMock = jest.fn();

    // Act
    await fetchHomepages()(dispatchMock, getStateMock);
    // Assert

    // does getStateMock get called?
    expect(getStateMock.mock.calls.length).toBe(1);
    // did we make a request? with the correct pagination?
    const firstCallToAxios = axios.get.mock.calls[0];
    const firstArgumentOfFirstCall = firstCallToAxios[0];
    expect(firstArgumentOfFirstCall).toBe(
      "http://localhost:4000/homepages?limit=10&offset=0"
    );
    // did we dispatch an action at the end of the thunk?

    expect(dispatchMock.mock.calls.length).toBe(1);
    expect(dispatchMock.mock.calls[0][0]).toEqual({
      payload: [{}, {}],
      type: "FETCH_HOMEPAGES_SUCCESS",
    });
    done();
  });
});
