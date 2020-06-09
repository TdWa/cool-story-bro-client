import axios from "axios";
import { homepageUpdated, signUp, HOMEPAGE_UPDATED } from "../actions";

jest.mock("axios");

describe("#user actions", () => {
  describe("homepageUpdated", () => {
    test("should return an action object with a payload", () => {
      // AAA
      // Arrange
      const homepage = { title: "I am a fake homepage" };

      // Act
      const action = homepageUpdated(homepage);

      // Assert
      expect(action.type).toBe("HOMEPAGE_UPDATED");
      expect(action.payload).toEqual({ title: "I am a fake homepage" });
    });
  });

  describe("signup", () => {
    test("should make a request to POST /signup, dispatch loginsucces, show a message and set app to done loading on success", async (done) => {
      // When to use a mock
      // If you want isolate some functionality, but you can't fully isolate it
      // mock -> success
      // mock -> failure

      // Arrange
      const response = {
        data: {
          createdAt: "2020-06-09T13:23:11.684Z",
          email: "rein@rein.be",
          homepage: {
            backgroundColor: "#ffffff",
            color: "#000000",
            createdAt: "2020-06-09T13:23:11.719Z",
            description: null,
            id: 3,
            stories: [],
            title: "Reindert's page",
            updatedAt: "2020-06-09T13:23:11.719Z",
            userId: 3,
          },
          id: 3,
          name: "Reindert",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU5MTcwODk5MSwiZXhwIjoxNTkxNzE2MTkxfQ.UXC5cXoGZCdEHkWQYKZnPxBPh7PpJFhwoktFybmUchY",
          updatedAt: "2020-06-09T13:23:11.684Z",
        },
      };

      axios.post.mockImplementationOnce(() => Promise.resolve(response));
      const dispatch = jest.fn(() => {});

      // ACT
      await signUp("Reindert", "rein@rein.be", "abcd1234")(dispatch);

      // ASSERT
      // dispatch was called, 3 times
      expect(dispatch).toHaveBeenCalledTimes(4);
      const secondDispatch = dispatch.mock.calls[1][0];
      expect(secondDispatch.type).toBe("LOGIN_SUCCESS");
      expect(secondDispatch.payload.email).toBe("rein@rein.be");

      done();
    });

    test("should set a message when POST /signup fails and set the app to done loading", async () => {
      // ARRANGE
      axios.post.mockImplementationOnce(() =>
        Promise.reject({
          message: "There is an existing account with this email",
        })
      );

      const dispatch = jest.fn(() => {});

      // ACT
      await signUp("Reindert", "rein@rein.be", "abcd1234")(dispatch);

      // ASSERT
      expect(dispatch.mock.calls[0][0].type).toBe("APP_LOADING");
      expect(dispatch.mock.calls[1][0].type).toBe("SET_MESSAGE");
      expect(dispatch.mock.calls[1][0].payload.text).toBe(
        "There is an existing account with this email"
      );
      expect(dispatch.mock.calls[2][0].type).toBe("APP_DONE_LOADING");
    });
  });
});
