import { ReduxNumberBoxState, SimpleCombineGrandChildState } from "../../../../../pages/RecursiveCombinedReducer/SimpleCombine/SimpleCombineChild/SimpleCombineGrandChild/SimpleCombineGrandChild";

// 後で移す
const initialNumberBoxState = (state?: ReduxNumberBoxState["state"]): ReduxNumberBoxState => { return { state: state || "10" }; };

export const initialSimpleCombineGrandChildState = (): SimpleCombineGrandChildState => {
    return {
        numberA: initialNumberBoxState("0"),
        numberB: initialNumberBoxState("100"),
    };
};