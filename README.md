# react-clean-form

`react-clean-form` is a component with goal of being a composable, un-opinionated form component that makes it easy to get a quick and easy form into your react app with out a lot of boilerplate code. `react-clean-form` manages state for you so you can simply bring it in to your project, add in form fields that use the `name` prop that corresponds to the properties in the `initialState` prop, and add a handleSubmit function to the `onSubmit` prop to capture the state of the form at submission. There is no need to add the `value` prop to your form fields, `react-clean-form` handles that for you. `react-clean-form` will reset the form to the initial state if a reset event is fired.

`react-clean-form` forwards the ref to the form element itself and all other `props` are passed directly to the `form` element, including `className` and `style`.

`react-clean-form` now exports a `useForm` hook that takes in an initialState and returns the form state and handleChange function in array, similar to `useState`

## Installation

`npm install react-clean-form`

## Usage

### Form Component

```javascript
import Form from 'react-clean-form';

const App = () => (
  <div>
    <Form initialState={{ input: '' }} onSubmit={handleSubmit}>
      <input name="input" />
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </Form>
  </div>
);
```

### useForm Hook

```javascript
import {useForm} from 'react-clean-form';

const App = () => (
  const [formState, handleChange] = useForm({ input: '' });
  <div>
    <form onReset={handleChange}>
      <input name="input" onChange={handleChange} value={formState['input']} />
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  </div>
);
```

## Props

| name         |   type   |   default    | description                                                                                        |
| ------------ | :------: | :----------: | -------------------------------------------------------------------------------------------------- |
| initialState |  Object  | empty Object | The initial state of the form                                                                      |
| onSubmit     | function |    no-op     | callback that will be called when the form is submitted the form state is passed into the function |

## Contributing

In lieu of a formal style guide, please format your code using 'prettier' prior to commit.

## Release History

- 3.0.1 added Typescript and updated to React Hooks. useForm hook exported as a named export.
- 2.1.3 fixed webpack build issue that was bundling react
- 2.1.1 - 2.1.2 Bug fix when value's were not set on mounting and when child is null
- 2.1.0 Improved functionality with multiple form elements
- 2.0.1 - 2.0.2 Bug Fix and documentation fix
- 2.0.0 Removed the need to render children as a function.
- 1.0.1 - 1.0.2 Documentation update
- 1.0.0 Initial Stable Release
