import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { create } from 'react-test-renderer';
import Form from './index';

describe('Form functions', () => {
  let container;
  let spy;
  const initialState = {
    input: '',
    select: '',
    selectMultiple: [],
    radio: '',
    checkbox1: false,
    checkbox2: false,
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    spy = jest.fn();
    act(() => {
      ReactDOM.render(
        <Form initialState={initialState} onSubmit={spy}>
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
          {false && <p>null value</p>}
        </Form>,
        container,
      );
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('Renders component', () => {
    const renderedForm = create(
      <Form initialState={initialState}>
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
        {false && <p>null value</p>}
      </Form>,
    );
    expect(renderedForm.toJSON()).toMatchSnapshot();
  });

  it('calls custom onSubmit', () => {
    expect(spy.mock.calls.length).toBe(0);
    const submitBtn = container.querySelector('form').querySelector('button');
    act(() => {
      submitBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(spy.mock.calls.length).toBe(1);
  });

  it('updates value of input', () => {
    const newValue = 'Hello';
    const input = container
      .querySelector('form')
      .querySelector('[name="input"]');
    act(() => {
      input.value = newValue;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    expect(input.value).toBe(newValue);
  });

  it('updates value of select', () => {
    const newValue = 'value1';
    const select = container
      .querySelector('form')
      .querySelector('[name="select"]');
    act(() => {
      select.value = newValue;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });

    expect(select.value).toBe(newValue);
  });

  it('Keeps value of radio buttons', () => {
    const radios = document.querySelectorAll('input[type="radio"]');
    act(() => {
      radios[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(radios[0].value).toBe('radio1');
    expect(radios[1].value).toBe('radio2');
  });

  it('Radio inputs toggle', () => {
    const radios = document.querySelectorAll('input[type="radio"]');
    expect(radios[0].checked).toBe(false);
    expect(radios[1].checked).toBe(false);

    act(() => {
      radios[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(radios[0].checked).toBe(true);
    expect(radios[1].checked).toBe(false);

    act(() => {
      radios[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(radios[0].checked).toBe(false);
    expect(radios[1].checked).toBe(true);
  });
  it('Checks the box', () => {
    const checkbox = document.querySelector('input[type="checkbox"]');
    expect(checkbox.checked).toBe(false);

    act(() => {
      checkbox.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(checkbox.checked).toBe(true);
  });
});
