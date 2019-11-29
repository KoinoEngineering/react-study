import { SimpleCombineState } from "../../pages/RecursiveCombinedReducer/SimpleCombine/SimpleCombine";
import { initialSimpleCombineState } from "./SimpleCombine/SimpleCombineState";

export interface RecursiveCombinedReducerState {
    simpleCombine: SimpleCombineState;
}


export const initialRecursiveCombinedState = (): RecursiveCombinedReducerState => {
    return {
        simpleCombine: initialSimpleCombineState()
    };
};