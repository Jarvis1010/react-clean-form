import React from "react";
import toJSON from "enzyme-to-json";
import { shallow } from "enzyme";
//import Form from "./index";

describe("Stuff", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<div />);
  });
  it("Renders component", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
