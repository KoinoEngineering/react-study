import MyDispatch from "./MyDispatch";

export type IDRequired<P = {}> = P & { id: string };

export type IPropsBase<S> = {
    state: S;
    dispatch: MyDispatch<S>["Set"];
}

export type IPropsBaseReset<S> = {
    state: S;
    dispatch: MyDispatch<S>["Reset"];
} 
