import MyDispatch from "../core/Interfaces/MyDispatch";

export const childDispatcherFactory = <S, K extends keyof S>(dispatch: MyDispatch<S>["Set"], state: S, key: K) => {
    return (value: S[K]) => {
        dispatch({
            ...state,
            [key]: value
        });
    };
};

type Resetter<T> = (prevState: T) => T

export const childDispatcherResetFactory = <S, K extends keyof S>(dispatch: MyDispatch<S>["Reset"], state: S, key: K) => {
    return (resetter: Resetter<S[K]>) => {
        dispatch((prevState) => {
            return {
                ...prevState,
                [key]: resetter(state[key])
            };
        });
    };
};
