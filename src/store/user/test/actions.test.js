import { homepageUpdated, HOMEPAGE_UPDATED } from "../actions";

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
});
