import { Dispatch } from "redux";
import { IAction } from "../action";

export interface Dispatchable<P = any> {
    dispatch: Dispatch<IAction<P>>;
}