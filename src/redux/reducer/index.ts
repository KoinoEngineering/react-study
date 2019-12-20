import { RecordOf } from "immutable";
import { Reducer } from "redux";
import { IAction } from "../action";
import { IState, State } from "../state";
import { UnitReducer } from "./BubblingInRedux/UnitReducer";
import { RecursiveCombinedReducer } from "./RecursiveCombinedReducer/RecursiveCombinedReducer";
export const reducer: Reducer<RecordOf<IState>, IAction> = (state = State(), action: IAction) => {
    return state
        .update("recursiveCombinedReducer", (state: IState["recursiveCombinedReducer"]) => {
            return RecursiveCombinedReducer(state, action);
        })
        .update("bubblingInRedux", (state: IState["bubblingInRedux"]) => {
            return UnitReducer(state, action);
        });

};