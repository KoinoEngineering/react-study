import { combineReducers } from "redux";
import { SimpleCombineChildState } from "../../../../pages/RecursiveCombinedReducer/SimpleCombine/SimpleCombineChild/SimpleCombineChild";
import { SimpleCombineGrandChildReducer, SimpleCombineGrandChildPayload } from "./SimpleCombineGrandChild/SimpleCombineGrandChildReducer";
import { IAction } from "../../../../action";

export const SimpleCombineChildReducer = combineReducers<SimpleCombineChildState, IAction<SimpleCombineGrandChildPayload>>({
    grandChildA: SimpleCombineGrandChildReducer,
    grandChildB: SimpleCombineGrandChildReducer,
});