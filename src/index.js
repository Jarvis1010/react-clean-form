import React, { Component } from "react";

class CleanForm extends Component {
  static defaultProps = {
    initialState: {},
    onSubmit: () => null,
    innerRef: () => null
  };

  state = this.props.initialState;

  defaultValues = {
    value: "",
    checked: false,
    radio: false
  };

  cloner = type => child => {
    return child && child.props
      ? React.cloneElement(child, {
          [type]: this.state.hasOwnProperty(child.props.name)
            ? this.state[child.props.name]
            : child.props[type]
              ? child.props[type]
              : this.defaultValues[type],
          children: React.Children.map(child.props.children, this.deepMap)
        })
      : child;
  };

  cloneTypes = {
    default: this.cloner("value"),
    checkbox: this.cloner("checked"),
    radio: child => {
      return child.props
        ? React.cloneElement(child, {
            checked: child.props.value === this.state[child.props.name],
            children: React.Children.map(child.props.children, this.deepMap)
          })
        : child;
    }
  };

  deepMap = child =>
    this.cloneTypes[child && child.props && child.props.type]
      ? this.cloneTypes[child.props.type](child)
      : this.cloneTypes.default(child);

  handleChange = ({ target }) => {
    let value;
    const name = target.name;

    if (target.type === "select-multiple") {
      const oldValue = this.state[name];
      value = oldValue.includes(target.value)
        ? oldValue.filter(x => x !== target.value)
        : oldValue.concat(target.value);
    } else {
      value = target.type === "checkbox" ? target.checked : target.value;
    }

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    if (e) e.preventDefault();
    this.props.onSubmit(this.state);
  };

  handleReset = e => {
    if (e) e.preventDefault();
    this.setState(this.props.initialState);
  };

  render() {
    /* eslint-disable */
    const { initialState, onSubmit, innerRef, ...props } = this.props;
    /* eslint-enable */
    const children = React.Children.map(this.props.children, this.deepMap);

    return (
      <form
        {...props}
        ref={innerRef}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onReset={this.handleReset}
      >
        {children}
      </form>
    );
  }
}

export default CleanForm;
