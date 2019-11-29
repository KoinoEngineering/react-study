import { SimpleCombineChildState } from "../../../../pages/RecursiveCombinedReducer/SimpleCombine/SimpleCombineChild/SimpleCombineChild";
import { initialSimpleCombineGrandChildState } from "./SimpleCombineGrandChild/SimpleCombineGrandChildState";

export const initialSimpleCombineChildState = (): SimpleCombineChildState => {
    return {
        grandChildA: initialSimpleCombineGrandChildState(),
        grandChildB: initialSimpleCombineGrandChildState(),
    };
};