import { RecordOf, Record } from "immutable";
import { IBubblingInRedux, BubblingInRedux } from "./BubblingInRedux";
import { SimpleCombineState } from "../pages/RecursiveCombinedReducer/SimpleCombine/SimpleCombine";
import { initialSimpleCombineState } from "./RecursiveCombinedReducer/SimpleCombine/SimpleCombineState";

export interface IState {
    bubblingInRedux: RecordOf<IBubblingInRedux>
    recursiveCombinedReducer: SimpleCombineState
}

export const State = Record<IState>({
    bubblingInRedux: BubblingInRedux(),
    recursiveCombinedReducer: initialSimpleCombineState()
});