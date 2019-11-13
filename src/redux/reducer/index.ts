import { Reducer } from "redux";
import { RecordOf, List } from "immutable";
import { IState, State } from "../state";
import actions, { IAction } from "../action";
export const reducer: Reducer<RecordOf<IState>, IAction> = (state = State(), action: IAction) => {
    if (document.activeElement && document.activeElement.id) {
        state = state.update("bubblingInRedux", (bubblingInRedux) => {
            return bubblingInRedux.set("activeElementId", document.activeElement && document.activeElement.id);
        });
    }
    switch (action.type) {
        case actions.FIRE_EVENT:
            return state.update("bubblingInRedux", (bubblingInRedux) => {
                return bubblingInRedux.update("event", (event) => {
                    return event.update("log", (log) => {
                        return log.push(action.payload.type + (action.payload.id ? ":" + action.payload.id : ""));
                    });
                });
            });
        case actions.CLEAR_EVENT:
            return state.update("bubblingInRedux", (bubblingInRedux) => {
                return bubblingInRedux.update("event", (event) => {
                    return event.set("log", List());
                });
            });
        default:
            return state;
    }
};