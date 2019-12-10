import { useState } from 'react';
type InitialState = { [s: string]: any };

const useForm = (
  initialState: InitialState = {},
): [InitialState, (e: React.SyntheticEvent) => void] => {
  const [state, setState] = useState(initialState);

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      [s: string]: string;
    };

    const { name } = target;

    setState(state => ({
      ...state,
      [name]: target.type === 'checkbox' ? target.checked : target.value,
    }));
  };

  return [state, handleChange];
};

export default useForm;
