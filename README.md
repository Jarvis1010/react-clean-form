# react-clean-form

`react-clean-form` is a component that uses the render function as a child pattern passing state into the function. The goal of the form was to build a composable, unopinionated form that makes it easy to get a quick and easy form into your react app with out alot of boilerplate code. `react-clean-form` manages state for you so you can simply bring it in to your project, add the `initialState` and corresponding input fields, and add a handleSubmit function to the `onSubmitProp` to capture the state of the form at submission.

`react-clean-form` also has two other optional props. The `innerRef` prop is a pass through prop to the rendered form's ref prop so you can have access to the form's ref and the `submitValidator` lets you pass a custom submission validation function that will change the value of the state.submitError value to true if there are fields that are in an invalid state (The value returns to false as soon as the state is changed again). All other `props` are passed directly to the `form` element, including `className`.

## Installation

`npm install react-clean-form`

## Usage

```
import Form from 'react-clean-form';

const App = () => (
   <div>
      <Form initialState={{input:''}} onSubmit={handleSubmit} submitValidator={validator} innerRef={handleRef}>
        {state => (
            <Fragment>
                <input name="input" value={state.input}/>
                <button type="submit">Submit</button>
                {state.submitError && <span>Error submiting form</span>}
            </Fragment>
        )}
      </Form>
   </div>
);
```

## Props

| name            |   type   |       default        | description                                                                                                                  |
| --------------- | :------: | :------------------: | ---------------------------------------------------------------------------------------------------------------------------- |
| initialState    |  Object  |     empty Object     | The initial state of the form                                                                                                |
| onSubmit        | function |        no-op         | callback that will be called when the form is submited the form state is passed into the function                            |
| submitValidator | function | no-op returning true | function that will be used to check if a submission is valid. If it passes a false, submitError on state will be set to true |
| innerRef        | function |        no-op         | function to be passed to the form's ref prop                                                                                 |

## Contributing

In lieu of a formal styleguide, please format your code using 'prettier' prior to commit.

## Release History

- 1.0.1 - 1.0.2 Documentation update
- 1.0.0 Initial Stable Release
