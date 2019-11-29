import { SimpleCombineState } from "../../../pages/RecursiveCombinedReducer/SimpleCombine/SimpleCombine";

import { initialSimpleCombineChildState } from "./SimpleCombineChild/SimpleCombineChildState";

export const initialSimpleCombineState = (): SimpleCombineState => {
    return {
        childA: initialSimpleCombineChildState(),
        childB: initialSimpleCombineChildState(),
    };
};