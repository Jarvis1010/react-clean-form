# react-clean-form

react-clean-form is a component that uses the render function as a child pattern.

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

- 1.0.0 Initial Stable Release
