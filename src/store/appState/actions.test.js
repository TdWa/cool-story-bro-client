import { setMessage } from "./actions";

describe("appState action", () => {
  test("setMessage action creator, should return an action object", () => {
    // AAA
    // Arrange -> setup some data
    const variant = "danger";
    const dismissable = true;
    const text = "Something went wrong";

    // Act -> Execute the code
    const action = setMessage(variant, dismissable, text);

    // Assert -> Did it do what we expected
    expect(action).toEqual({
      payload: {
        dismissable: true,
        text: "Something went wrong",
        variant: "danger",
      },
      type: "SET_MESSAGE",
    });
  });

  test("setMessage should an error when given a variant other than danger or success", () => {
    // AAA
    // Arrange -> setup some data
    const variant = "fakevariant";
    const dismissable = true;
    const text = "Something went wrong";

    // Act -> Execute the code
    expect(() => setMessage(variant, dismissable, text)).toThrow();

    // Assert -> Did it do what we expected
  });
});
