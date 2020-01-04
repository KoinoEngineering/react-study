import { List, RecordOf } from "immutable";
import { Reducer } from "redux";
import { IAction } from "../../action";
import { UnitAction } from "../../action/BubblingInRedux/UnitAction";
import { BubblingInReduxState, IBubblingInReduxState } from "../../state/BubblingInRedux";
import { UnitState } from "../../state/BubblingInRedux/Unit";

export interface UnitPayload {
    path: List<string>;
    event?: "click" | "change";
    text?: string;
    idx?: number;
}

export const UnitReducer: Reducer<RecordOf<IBubblingInReduxState>, IAction<UnitPayload>> = (state = new BubblingInReduxState({}), action) => {
    switch (action.type) {
        case UnitAction.UNIT_CREATE_CHILDREN:
            return state.updateIn(action.payload.path.toJS(), (unit: UnitState) => {
                return unit.CreateChildren();
            });

        case UnitAction.UNIT_APPEND_CHILD:
            return state.updateIn(action.payload.path.toJS(), (unit: UnitState) => {
                return unit.AppendChild();
            });

        case UnitAction.UNIT_INCREMENT_EVENT_COUNT:
            return state.updateIn(action.payload.path.toJS(), (unit: UnitState) => {
                return action.payload.event ? unit.IncrementEventCount(action.payload.event) : state;
            });

        case UnitAction.UNIT_CHANGE_TEXT:
            return state.updateIn(action.payload.path.toJS(), (unit: UnitState) => {
                return action.payload.text !== undefined ? unit.ChangeText(action.payload.text) : unit;
            });

        default:
            return state;
    }
};