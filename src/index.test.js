import React, { Fragment } from "react";
import toJSON from "enzyme-to-json";
import { shallow } from "enzyme";
import sinon from "sinon";
import Form from "./index";

describe("Form functions", () => {
  describe("form renders with truthy validator", () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(
        <Form
          initialState={{ input: "" }}
          submitValidator={() => true}
          onSubmit={spy}
        >
          {state => (
            <Fragment>
              <input name="input" value={state.input} />
              <button type="submit">Submit</button>
            </Fragment>
          )}
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

      expect(spy.calledOnce).toBe(true);
    });
    it("updates value of input", () => {
      const newValue = "Hello";
      wrapper
        .find("form")
        .first()
        .simulate("change", { target: { name: "input", value: newValue } });
      expect(wrapper.state().input).toBe(newValue);
    });
  });

  describe("form render with falsey validator", () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(
        <Form submitValidator={() => false} onSubmit={spy}>
          {() => (
            <Fragment>
              <input />
              <button type="submit">Submit</button>
            </Fragment>
          )}
        </Form>
      );
    });
    it("Renders component", () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
    it("does not call onSubmit", () => {
      wrapper
        .find("form")
        .first()
        .simulate("submit");

      expect(spy.calledOnce).toBe(false);
      expect(wrapper.state().submitError).toBe(true);
    });
  });
});
