# react-clean-form

`react-clean-form` is a component with goal of being a composable, unopinionated form component that makes it easy to get a quick and easy form into your react app with out alot of boilerplate code. `react-clean-form` manages state for you so you can simply bring it in to your project, add in form fields that use the `name` prop that corresponds to the properties in the `initialState` prop, and add a handleSubmit function to the `onSubmitProp` to capture the state of the form at submission. There is no need to add the `value` prop to your form fields, `react-clean-form` handles that for you.

`react-clean-form` also has another other optional props. The `innerRef` prop is a pass-through prop to the rendered form's ref prop so you can have access to the form's ref. All other `props` are passed directly to the `form` element, including `className`.

## Installation

`npm install react-clean-form`

## Usage

```javascript
import Form from "react-clean-form";

const App = () => (
  <div>
    <Form
      initialState={{ input: "" }}
      onSubmit={handleSubmit}
      innerRef={handleRef}
    >
      <input name="input" />
      <button type="submit">Submit</button>
    </Form>
  </div>
);
```

## Props

| name         |   type   |   default    | description                                                                                       |
| ------------ | :------: | :----------: | ------------------------------------------------------------------------------------------------- |
| initialState |  Object  | empty Object | The initial state of the form                                                                     |
| onSubmit     | function |    no-op     | callback that will be called when the form is submited the form state is passed into the function |
| innerRef     | function |    no-op     | function to be passed to the form's ref prop                                                      |

## Contributing

In lieu of a formal styleguide, please format your code using 'prettier' prior to commit.

## Release History

- 2.1.1 - 2.1.2 Bug fix when value's were not set on mounting and when child is null
- 2.1.0 Improved functionality with multiple form elements
- 2.0.1 - 2.0.2 Bug Fix and documention fix
- 2.0.0 Removed the need to render children as a function.
- 1.0.1 - 1.0.2 Documentation update
- 1.0.0 Initial Stable Release
