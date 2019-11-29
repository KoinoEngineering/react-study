import { Record, RecordOf } from "immutable";
import { BubblingInRedux, IBubblingInRedux } from "./BubblingInRedux";
import { initialRecursiveCombinedState, RecursiveCombinedReducerState } from "./RecursiveCombinedReducer/RecursiveCombinedReducer";

export interface IState {
    bubblingInRedux: RecordOf<IBubblingInRedux>
    recursiveCombinedReducer: RecursiveCombinedReducerState
}

export const State = Record<IState>({
    bubblingInRedux: BubblingInRedux(),
    recursiveCombinedReducer: initialRecursiveCombinedState()
});