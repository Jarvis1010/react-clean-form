import React from 'react';

type InitialState = { [s: string]: any };

export default function useForm(initialState: InitialState = {}) {
  const [state, setState] = React.useState(initialState);

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      [s: string]: string;
    };

    let value;
    const { name } = target;

    value = target.type === 'checkbox' ? target.checked : target.value;

    if (target.type === 'select-multiple') {
      const oldValues = state[name];
      value = oldValues.includes(target.value)
        ? oldValues.filter(x => x !== target.value)
        : oldValues.concat(target.value);
    }

    setState(state => ({
      ...state,
      [name]: value,
    }));

    return [state, handleChange];
  };
}
