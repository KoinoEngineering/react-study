import { Action, Dispatch } from "redux";
import { EventHandler, SyntheticEvent } from "react";

export interface IAction<P = any> extends Action {
    payload: P
}

export const actions = {
    CLEAR_EVENT: "CLEAR_EVENT",
    FIRE_EVENT: "FIRE_EVENT"
};


export const CreateFireEvent = (dispatch: Dispatch<IAction>, id?: string): EventHandler<SyntheticEvent<any>> => {
    return (e) => {
        dispatch({
            payload: {
                id: id,
                type: e.type,
            },
            type: actions.FIRE_EVENT,
        });
    };
};

export const CreateClearEvent = (dispatch: Dispatch<IAction>): EventHandler<SyntheticEvent<any>> => {
    return () => {
        dispatch({
            payload: {},
            type: actions.CLEAR_EVENT,
        });
    };
};

export default actions;