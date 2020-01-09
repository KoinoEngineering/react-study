import MyDispatch from "../core/Interfaces/MyDispatch";

export const childDispatcherFactory = <S, K extends keyof S>(dispatch: MyDispatch<S>["Set"], state: S, key: K) => {
    return (value: S[K]) => {
        dispatch({
            ...state,
            [key]: value
        });
    };
};

