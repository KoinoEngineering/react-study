export type IDispatchable<T> = [T, React.Dispatch<React.SetStateAction<T>>];
export enum DISPATCHABLE {
    VALUE,
    DISPATCHER
}