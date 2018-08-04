import React, { Component } from "react";

class QuickForm extends Component {
  static defaultProps = {
    initialState: {},
    onSubmit: () => null,
    submitValidator: () => true
  };

  state = { ...this.props.initialState, submitError: false };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value, submitError: false });
  };

  handleSubmit = e => {
    if (e) e.preventDefault();
    const { submitValidator, onSubmit } = this.props;
    if (submitValidator(this.state)) {
      const { submitError, ...state } = this.state; // eslint-disable-line
      onSubmit(state);
    } else {
      this.setState({ submitError: true });
    }
  };

  render() {
    const { initialState, onSubmit, submitValidator, ...props } = this.props; // eslint-disable-line
    return (
      <form
        {...props}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      >
        {this.props.children(this.state)}
      </form>
    );
  }
}

export default QuickForm;
