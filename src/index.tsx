import * as React from 'react';

type State = { [s: string]: any };

const { useState } = React;

export const useForm = (
  initialState: State = {},
): [State, (e: React.SyntheticEvent) => void] => {
  const [state, setState] = useState(initialState);

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      [s: string]: string;
    };

    const { name } = target;
    const newState =
      e.type === 'reset'
        ? () => initialState
        : (state: State) => ({
            ...state,
            [name]: target.type === 'checkbox' ? target.checked : target.value,
          });

    setState(newState);
  };

  return [state, handleChange];
};

export type FormProps = {
  initialState: State;
  onSubmit?: (state: State) => void;
  children?: React.ReactNode;
} & React.PropsWithoutRef<JSX.IntrinsicElements['form']>;

export type Ref = HTMLFormElement;

type CloneFunc = (child: React.ReactNode) => React.ReactNode;
type CloneFuncType = 'value' | 'checked';
type Cloner = (type: CloneFuncType) => CloneFunc;
type CloneTypes = { [s: string]: CloneFunc };

const CleanForm = React.forwardRef<Ref, FormProps>(
  ({ initialState = {}, onSubmit = () => {}, children, ...props }, ref) => {
    const [state, handleChange] = useForm(initialState);

    const cloner: Cloner = type => child => {
      const defaultFormValues = {
        value: '',
        checked: false,
        radio: false,
      };

      return child && (child as any).props
        ? React.cloneElement(child as any, {
            [type]: state.hasOwnProperty((child as any).props.name)
              ? state[(child as any).props.name]
              : (child as any).props[type]
              ? (child as any).props[type]
              : defaultFormValues[type],
            onChange: handleChange,
            children: React.Children.map(
              (child as any).props.children,
              deepMap,
            ),
          })
        : child;
    };

    const cloneTypes: CloneTypes = {
      default: cloner('value'),
      checkbox: cloner('checked'),
      radio: (child: React.ReactNode): React.ReactNode => {
        return (child as any).props
          ? React.cloneElement(child as any, {
              checked:
                (child as any).props.value === state[(child as any).props.name],
              onChange: handleChange,
              children: React.Children.map(
                (child as any).props.children,
                deepMap,
              ),
            })
          : child;
      },
    };

    const deepMap = (child: React.ReactNode): React.ReactNode => {
      const type = child && (child as any).props && (child as any).props.type;
      return cloneTypes[type]
        ? cloneTypes[type](child)
        : cloneTypes.default(child);
    };

    const newChildren = React.Children.map(children, deepMap);

    return (
      <form
        {...props}
        ref={ref}
        onSubmit={e => {
          if (e) e.preventDefault();
          onSubmit(state);
        }}
        onReset={handleChange}
      >
        {newChildren}
      </form>
    );
  },
);

export default CleanForm;
