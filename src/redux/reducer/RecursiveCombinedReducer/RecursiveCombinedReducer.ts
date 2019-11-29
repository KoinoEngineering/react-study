import { combineReducers, Reducer } from "redux";
import { IAction } from "../../action";
import { IState } from "../../state";
import { SimpleCombineReducer } from "./SimpleCombine/SimpleCombineReducer";

export const RecursiveCombinedReducer: Reducer<IState["recursiveCombinedReducer"], IAction> = combineReducers({
    simpleCombine: SimpleCombineReducer
});