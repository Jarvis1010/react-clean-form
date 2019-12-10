/// <reference types="react" />
declare type InitialState = {
    [s: string]: any;
};
declare const useForm: (initialState?: InitialState) => [InitialState, (e: import("react").SyntheticEvent<Element, Event>) => void];
export default useForm;
