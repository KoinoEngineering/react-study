import React from "react";
import MyDispatch from "../../../core/Interfaces/MyDispatch";
import { ITowers } from "../Towers/Towers";

export interface IHanoiSettingsState {
    class: number;
    now: keyof ITowers;
    goto: keyof ITowers;
}
interface HanoiSettingsProps {
    state: IHanoiSettingsState;
    dispatch: MyDispatch<IHanoiSettingsState>["Reset"]
}

const HanoiSettings: React.FC<HanoiSettingsProps> = (props: HanoiSettingsProps) => {
    return <div>{JSON.stringify(props)}</div>;
};

export default HanoiSettings;