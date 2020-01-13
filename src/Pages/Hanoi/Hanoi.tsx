import { List } from "immutable";
import React from "react";
import { childDispatcherFactory } from "../../common/Dispatch";
import { IDispatchable, IPropsBase } from "../../core/Interfaces/Props";
import HanoiSettings, { IHanoiSettingsState } from "./HanoiSettings/HanoiSettings";
import Towers, { ITowersState, TowersState } from "./Towers/Towers";

export interface IHanoiState {
    settings: IHanoiSettingsState;
    towers: ITowersState;
}

export const defaultTowers = Object.freeze({
    a: List(),
    b: List(),
    c: List(),
});

export const initHanoiState = (): IHanoiState => {
    return {
        settings: {
            class: 3,
            goto: "c",
            now: "a",
        },
        towers: new TowersState({
            ...defaultTowers,
            a: List([1, 2, 3]),
        })
    };
};

type IHanoiProps = IPropsBase<IHanoiState> & IDispatchable<IHanoiState>;
const Hanoi: React.FC<IHanoiProps> = (props: IHanoiProps) => {

    return <div>
        <div>
            <HanoiSettings
                state={props.state.settings}
                dispatch={childDispatcherFactory(props.dispatch, props.state, "settings")}
                stateHanoi={props.state}
                dispatchHanoi={props.dispatch}
            />
        </div>
        <div>
            <Towers state={props.state.towers} dispatch={childDispatcherFactory(props.dispatch, props.state, "towers")} class={props.state.settings.class} />
        </div>
    </div>;
};

export default Hanoi;