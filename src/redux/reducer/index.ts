import { Reducer } from "redux";
import { RecordOf } from "immutable";
import { IState, State } from "../state";
import { IAction } from "../action";
export const reducer: Reducer<RecordOf<IState>, IAction> = (state = State()) => {
    return state;
};