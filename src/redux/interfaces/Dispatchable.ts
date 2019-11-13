import { Dispatch } from "redux";
import { IAction } from "../action";

export interface Dispatchable {
    dispatch: Dispatch<IAction>;
}