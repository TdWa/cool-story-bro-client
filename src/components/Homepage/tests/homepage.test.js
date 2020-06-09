import React from "react";
import renderer from "react-test-renderer";

import Homepage from "../index.js";

describe("<Homepage >", () => {
  test("should render without props", () => {
    // Should it? this is a decision you should make over your components.
    // Writing tests helps us think of all the open possibilities we left
    // in our code and how they would affect our app.
    const component = renderer.create(<Homepage />); // "render" the component
    const tree = component.toJSON(); // Convert it to JSON
    expect(tree).toMatchSnapshot(); // Compare to stored snapshot
  });
});
