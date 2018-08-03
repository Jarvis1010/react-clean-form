import React from "react";
import toJSON from "enzyme-to-json";
import { shallow, mount, render } from "enzyme";
import Form from "./index";

describe("Stuff", () => {
  it("Renders component with JSX", () => {
    const wrapper = shallow(<Form />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
