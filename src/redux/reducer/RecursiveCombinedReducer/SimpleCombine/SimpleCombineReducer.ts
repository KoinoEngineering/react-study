import { combineReducers } from "redux";
import { SimpleCombineState } from "../../../pages/RecursiveCombinedReducer/SimpleCombine/SimpleCombine";
import { SimpleCombineChildReducer } from "./SimpleCombineChild/SimpleCombineChildReducer";

export const SimpleCombineReducer = combineReducers<SimpleCombineState>({
    childA: SimpleCombineChildReducer,
    childB: SimpleCombineChildReducer,
});