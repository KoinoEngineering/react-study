import { SimpleCombineGrandChildState } from "../../../../../pages/RecursiveCombinedReducer/SimpleCombine/SimpleCombineChild/SimpleCombineGrandChild/SimpleCombineGrandChild";
import { INumberBoxState } from "../../../../../../react/common/NumberBox/NumberBox";


// 後で移す
const initialNumberBoxState = (): INumberBoxState => { return "10"; };


export const initialSimpleCombineGrandChildState = (): SimpleCombineGrandChildState => {
    return {
        numberA: initialNumberBoxState(),
        numberB: initialNumberBoxState(),
    };
};