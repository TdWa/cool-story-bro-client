import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import Space from "../Space";

const props = {
  id: 99,
  backgroundColor: "white",
  color: "black",
  title: "AwesomeSpace",
  description: "This is MY space",
  showLink: true,
};

describe("<Space />", () => {
  test.skip("should render without props", () => {
    // Should it? this is a decision you should make over your components.
    // Writing tests helps us think of all the open possibilities we left
    // in our code and how they would affect our app.

    const component = renderer.create(<Space />); // "render" the component
    const tree = component.toJSON(); // Convert it to JSON
    expect(tree).toMatchSnapshot(); // Compare to stored snapshot
  });

  test.skip("should render with all props", () => {
    const component = renderer.create(<Space {...props} />); // "render" the component
    const tree = component.toJSON(); // Convert it to JSON
    expect(tree).toMatchSnapshot(); // Compare to stored snapshot
  });

  test("A Link should render when showLink prop is set to true", () => {
    const component = renderer.create(
      <MemoryRouter>
        <Space {...props} />
      </MemoryRouter>
    ); // "render" the component
    const tree = component.toJSON(); // Convert it to JSON
    expect(tree).toMatchSnapshot(); // Compare to stored snapshot
  });
});
