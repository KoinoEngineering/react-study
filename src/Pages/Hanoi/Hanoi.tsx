import React from "react";
import { childDispatcherResetFactory } from "../../common/Dispatch";
import { IPropsBaseReset } from "../../core/Interfaces/Props";
import HanoiSettings, { IHanoiSettingsState } from "./HanoiSettings/HanoiSettings";
import Towers, { ITowersState, TowersState } from "./Towers/Towers";

export interface IHanoiState {
    settings: IHanoiSettingsState;
    towers: ITowersState;
}

export const initHanoiState = (): IHanoiState => {
    return {
        settings: {
            class: 3,
            goto: "c",
            now: "a",
        },
        towers: new TowersState()
    };
};

type IHanoiProps = IPropsBaseReset<IHanoiState>;
const Hanoi: React.FC<IHanoiProps> = (props: IHanoiProps) => {

    return <div>
        <div>
            <HanoiSettings state={props.state.settings} dispatch={childDispatcherResetFactory(props.dispatch, props.state, "settings")} />
        </div>
        <div>
            <Towers state={props.state.towers} dispatch={childDispatcherResetFactory(props.dispatch, props.state, "towers")} />
        </div>
    </div>;
};

export default Hanoi;