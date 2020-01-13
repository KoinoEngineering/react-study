import MyDispatch from "./MyDispatch";

export type IDRequired<P = {}> = P & { id: string };

export interface IDispatchable<S> {
    dispatch: MyDispatch<S>["Set"];
}

export interface IResettable<S> {
    dispatch: MyDispatch<S>["Reset"];
}

export type IPropsBase<S> = {
    state: S;
}
