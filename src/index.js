import React, { Component } from "react";

class CleanForm extends Component {
  static defaultProps = {
    initialState: {},
    onSubmit: () => null,
    innerRef: () => null
  };

  state = this.props.initialState;

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    if (e) e.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    /* eslint-disable */
    const { onSubmit, innerRef, ...props } = this.props;
    /* eslint-enable */
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        value: this.state[child.name]
      })
    );

    return (
      <form
        {...props}
        ref={innerRef}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      >
        {children}
      </form>
    );
  }
}

export default CleanForm;
