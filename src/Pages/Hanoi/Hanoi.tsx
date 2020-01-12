import React from "react";
import { IHanoiSettingsState } from "./HanoiSettings/HanoiSettings";
import { ITowersState, TowersState } from "./Towers/Towers";

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

const Hanoi: React.FC = () => {
    return <div>Hanoi</div>;
};

export default Hanoi;