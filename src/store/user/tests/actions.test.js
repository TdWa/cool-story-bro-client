import { login, loginSuccess } from "../actions";
import {
  appDoneLoading,
  appLoading,
  showMessageWithTimeout,
} from "../../appState/actions";

import axios from "axios";

// module mocks are declared on a global scope, function mocks on the appropiate describe/test scope
jest.mock("axios");

describe("#login", () => {
  describe("when called", () => {
    test("should dispatch showMessageWithTimeout", async () => {
      // mock axios implementation
      const email = "a@a.com";
      const password = "a";
      const response = {
        data: {
          id: 2,
          createdAt: "2020-11-09T22:24:37.690Z",
          updatedAt: "2020-11-09T22:24:37.690Z",
          name: "dummy",
          email: "a@a.com",
          // token:
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYwNTcyNzIyMSwiZXhwIjoxNjA1NzM0NDIxfQ.sG4HPwwZ36yrjvQRweJRWmWRRYjgwSwdBvYfJgGDpjo",
          space: {
            backgroundColor: "#b8daff",
            color: "#000000",
            createdAt: "2020-11-09T22:24:37.761Z",
            description: "hjgjkhk",
            stories: [
              {
                content:
                  "ThisAllBeganIn1968ButIt'sKindOfALongStorySoJustStopAskingWhyAndDealWithIt",
                createdAt: "2020-11-09T22:24:37.847Z",
                id: 4,
                imageUrl:
                  "https://www.reidmiddleton.com/wp-content/uploads/2015/05/150519-MoarWhiteSpace-HeroImage.png",
                name: "WhyIDon'tLikeSpaces",
                spaceId: 2,
                updatedAt: "2020-11-09T22:24:37.847Z",
              },
            ],
            id: 2,
            title: "Dummy's space",
            updatedAt: "2020-11-10T12:08:50.645Z",
            userId: 2,
          },
        },
      };
      axios.get.mockImplementationOnce(() => Promise.resolve(response));

      // mock other two functions
      const getState = jest.fn();
      const dispatch = jest.fn();

      await login(email, password)(dispatch, getState); // call it twice because it's a thunk, we simulate redux

      // assert on dispatch
      // expect(dispatch).toHaveBeenCalledWith(
      //   showMessageWithTimeout("success", false, "welcome back!", 1500)
      // );
      expect(dispatch).toHaveBeenCalledWith(appLoading());
      expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
      // expect(dispatch).toHaveBeenCalledWith(loginSuccess(response.data));
    });
  });
});
