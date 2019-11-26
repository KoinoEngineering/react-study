import { Reducer } from "redux";
import { INumberBoxState } from "../../../../../../react/common/NumberBox/NumberBox";
import { IAction } from "../../../../../action";
import { SimpleCombineGrandChildActions } from "../../../../../action/RecursiveCombinedReducer/SimpleCombine/SimpleCombineChild/SimpleCombineGrandChild";
import { SimpleCombineGrandChildState } from "../../../../../pages/RecursiveCombinedReducer/SimpleCombine/SimpleCombineChild/SimpleCombineGrandChild/SimpleCombineGrandChild";

export interface SimpleCombineGrandChildPayload {
    target: keyof SimpleCombineGrandChildState,
    value: INumberBoxState;
}

export const SimpleCombineGrandChildReducer: Reducer<SimpleCombineGrandChildState, IAction> = (state: SimpleCombineGrandChildState = {
    numberA: "10",
    numberB: "10",
}, action: IAction) => {
    switch (action.type) {
        case SimpleCombineGrandChildActions.SIMPLE_COMBINE_GRANDCHILD_UPDATE:
            return { ...state, [action.payload.target]: action.payload.value };
        default:
            return state;
    }
};