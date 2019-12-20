import { List, Record, RecordOf } from "immutable";
import { UnitState, IUnitState } from "./Unit";

export interface IBubblingInReduxState {
    root: RecordOf<IUnitState>;
}

export const BubblingInReduxState = Record<IBubblingInReduxState>({
    root: new UnitState({ path: List(["root"]) })
});