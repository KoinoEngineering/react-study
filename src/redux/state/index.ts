import { Record, RecordOf } from "immutable";
import { BubblingInReduxState, IBubblingInReduxState } from "./BubblingInRedux";
import { initialRecursiveCombinedState, RecursiveCombinedReducerState } from "./RecursiveCombinedReducer/RecursiveCombinedReducer";

export interface IState {
    bubblingInRedux: RecordOf<IBubblingInReduxState>
    recursiveCombinedReducer: RecursiveCombinedReducerState
}

export const State = Record<IState>({
    bubblingInRedux: BubblingInReduxState(),
    recursiveCombinedReducer: initialRecursiveCombinedState()
});