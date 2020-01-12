import { List } from "immutable";
import React from "react";
import { childDispatcherResetFactory } from "../../common/Dispatch";
import { IPropsBaseReset } from "../../core/Interfaces/Props";
import HanoiSettings, { IHanoiSettingsState } from "./HanoiSettings/HanoiSettings";
import Towers, { ITowersState, TowersState, ITowers } from "./Towers/Towers";

export interface IHanoiState {
    settings: IHanoiSettingsState;
    towers: ITowersState;
}

export const defaultTowers = (_calss: number): ITowers => {
    return {
        a: List(new Array(_calss).fill(0)),
        b: List(new Array(_calss).fill(0)),
        c: List(new Array(_calss).fill(0)),
    };
};

export const initHanoiState = (): IHanoiState => {
    return {
        settings: {
            class: 3,
            goto: "c",
            now: "a",
        },
        towers: new TowersState({
            ...defaultTowers(3),
            a: List([1, 2, 3]),
        })
    };
};

type IHanoiProps = IPropsBaseReset<IHanoiState>;
const Hanoi: React.FC<IHanoiProps> = (props: IHanoiProps) => {

    const towersDispatch = childDispatcherResetFactory(props.dispatch, props.state, "towers");
    return <div>
        <div>
            <HanoiSettings
                state={props.state.settings}
                dispatch={childDispatcherResetFactory(props.dispatch, props.state, "settings")}
                towersDispatch={towersDispatch}
            />
        </div>
        <div>
            <Towers state={props.state.towers} dispatch={towersDispatch} />
        </div>
    </div>;
};

export default Hanoi;