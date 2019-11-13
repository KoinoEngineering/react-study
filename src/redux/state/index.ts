import { RecordOf, Record } from "immutable";
import { IBubblingInRedux, BubblingInRedux } from "./BubblingInRedux";

export interface IState {
    bubblingInRedux: RecordOf<IBubblingInRedux>
}

export const State = Record<IState>({
    bubblingInRedux: BubblingInRedux()
});