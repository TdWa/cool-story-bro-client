import { storyDeleteSuccess } from "./actions";

function isOk(situation) {
  if (situation === true) {
    return "OK";
  } else {
    return "Oh no!";
  }
}

describe("User actions", () => {
  test("isOk returns 'OK' when the situation is true ", () => {
    // Arranging
    const situation = true;

    // Act
    const result = isOk(situation);

    // Assert
    expect(result).toBe("OK");
  });

  test('isOk returns "Oh no" when the situation is false', () => {
    // Arranging
    const situation = false;

    // Act
    const result = isOk(situation);

    // Assert
    expect(result).toBe("Oh no!");
  });

  describe("storyDeleteSuccess", () => {
    test("should create a STORY_DELETE_SUCCESS action with the id as a payload", () => {
      // Arrange
      const storyId = 1;

      // Act
      const result = storyDeleteSuccess(storyId);

      // Assert
      expect(result).toEqual({
        type: "STORY_DELETED_SUCCESS",
        payload: 1,
      });
    });

    test("should throw an error when given an id that is not a number", () => {
      // Arrange
      const storyId = "bla";

      // Act & Asserting
      expect(() => {
        storyDeleteSuccess(storyId);
      }).toThrow(TypeError);
    });
  });
});
