import { Reducer } from "redux";
import { IAction } from "../../../../../action";
import { SimpleCombineGrandChildActions } from "../../../../../action/RecursiveCombinedReducer/SimpleCombine/SimpleCombineChild/SimpleCombineGrandChild";
import { SimpleCombineGrandChildState, ReduxNumberBoxState } from "../../../../../pages/RecursiveCombinedReducer/SimpleCombine/SimpleCombineChild/SimpleCombineGrandChild/SimpleCombineGrandChild";

export interface SimpleCombineGrandChildPayload {
    target: keyof SimpleCombineGrandChildState,
    value: ReduxNumberBoxState;
}

export const SimpleCombineGrandChildReducer: Reducer<SimpleCombineGrandChildState, IAction> = (state: SimpleCombineGrandChildState = {
    numberA: {
        state: "0",
    },
    numberB: {
        state: "100",
    },
}, action: IAction<SimpleCombineGrandChildPayload>): SimpleCombineGrandChildState => {
    switch (action.type) {
        case SimpleCombineGrandChildActions.SIMPLE_COMBINE_GRANDCHILD_UPDATE:
            return { ...state, [action.payload.target]: { ...action.payload.value } };
        default:
            return state;
    }
};