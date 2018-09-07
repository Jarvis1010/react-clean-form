import React from "react";
import toJSON from "enzyme-to-json";
import { shallow } from "enzyme";
import Form from "./index";

describe("Form functions", () => {
  let wrapper;
  let spy;
  beforeEach(() => {
    spy = jest.fn();
    wrapper = shallow(
      <Form
        initialState={{
          input: "",
          select: "",
          selectMultiple: [],
          radio: "",
          checkbox1: false,
          checkbox2: false
        }}
        onSubmit={spy}
      >
        <input name="input" />
        <select name="select">
          <option value="value1">Value1</option>
          <option value="value2">Value2</option>
        </select>
        <select multiple name="selectMultiple">
          <option value="value1">Value1</option>
          <option value="value2">Value2</option>
        </select>
        <input type="radio" name="radio" value="radio1" /> Radio1
        <input type="radio" name="radio" value="radio2" /> Radio2
        <input type="checkbox" name="checkbox1" value="checkbox1" /> checkbox1
        <input type="checkbox" name="checkbox2" value="checkbox2" /> checkbox2
        <button type="submit">Submit</button>
      </Form>
    );
  });
  it("Renders component", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it("calls custom onSubmit", () => {
    wrapper
      .find("form")
      .first()
      .simulate("submit");

    expect(spy.mock.calls.length).toBe(1);
  });
  it("updates value of input", () => {
    const newValue = "Hello";
    wrapper
      .find("form")
      .first()
      .simulate("change", { target: { name: "input", value: newValue } });
    expect(wrapper.state().input).toBe(newValue);
  });
  it("updates value of select", () => {
    const newValue = "value1";
    wrapper
      .find("form")
      .first()
      .simulate("change", { target: { name: "select", value: newValue } });
    expect(wrapper.state().select).toBe(newValue);
  });
  it("adds value of select when multiple true", () => {
    const newValue = "value1";
    const newValue2 = "value2";
    const form = wrapper.find("form").first();
    form.simulate("change", {
      target: {
        type: "select-multiple",
        name: "selectMultiple",
        value: newValue
      }
    });
    form.simulate("change", {
      target: {
        type: "select-multiple",
        name: "selectMultiple",
        value: newValue2
      }
    });
    expect(wrapper.state().selectMultiple).toContain(newValue);
    expect(wrapper.state().selectMultiple).toContain(newValue2);
  });
  it("removes value of select when multiple true", () => {
    const newValue = "value1";
    const newValue2 = "value2";
    const form = wrapper.find("form").first();
    form.simulate("change", {
      target: {
        type: "select-multiple",
        name: "selectMultiple",
        value: newValue
      }
    });
    form.simulate("change", {
      target: {
        type: "select-multiple",
        name: "selectMultiple",
        value: newValue2
      }
    });
    form.simulate("change", {
      target: {
        type: "select-multiple",
        name: "selectMultiple",
        value: newValue
      }
    });

    expect(wrapper.state().selectMultiple).toContain(newValue2);
    expect(wrapper.state().selectMultiple).not.toContain(newValue);
  });
  it("Keeps value of radio buttons", () => {
    const radios = wrapper.find('input[type="radio"]');
    radios.first().simulate("click");
    expect(radios.first().props().value).toBe("radio1");
    expect(radios.last().props().value).toBe("radio2");
  });
  it("Checks the box", () => {
    const form = wrapper.find("form").first();

    form.first().simulate("change", {
      target: {
        type: "checkbox",
        name: "checkbox1",
        checked: true
      }
    });
    expect(wrapper.state().checkbox1).toBe(true);
  });
});
