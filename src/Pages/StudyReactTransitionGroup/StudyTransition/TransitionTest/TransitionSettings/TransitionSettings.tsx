import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { Dispatch } from "react";
import NumberBox from "../../../../../react/common/NumberBox/NumberBox";
import { ITransitionSettings } from "../TransitionTest";

export interface ITransitionSettingsProps {
    state: ITransitionSettings;
    dispatch: Dispatch<ITransitionSettings>;
}

const TransitionSettings: React.FC<ITransitionSettingsProps> = (props: ITransitionSettingsProps) => {

    const transitionDurationDispathcer = (value: string) => {
        props.dispatch({
            ...props.state,
            transitionDuration: Number(value)
        });
    };


    const handleChangeSelectFactory = <K extends keyof ITransitionSettings>(key: K) => {
        return (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
            props.dispatch({
                ...props.state,
                [key]: event.target.value as ITransitionSettings[K]
            });
        };
    };
    return <div>
        <h2>Transition Setting</h2>
        <div>
            Transitionのしかたを設定する
        </div>
        <div style={{ border: "black solid 1px" }}>
            <div>
                Transition Duration
            </div>
            <div >
                <ul>
                    <li><small>Transitionに要する時間</small></li>
                </ul>
            </div>
            <NumberBox
                state={props.state.transitionDuration.toString()}
                dispatch={transitionDurationDispathcer}
                max={2000}
                slider={{ step: 50 }}
            />
        </div>
        <div style={{ border: "black solid 1px", paddingBottom: "1rem", paddingTop: "1rem" }}>
            <div>
                Transition Property
            </div>
            <div >
                <ul>
                    <li><small>Transitionさせたい属性</small></li>
                </ul>
            </div>
            <FormControl variant="outlined" fullWidth={true}>
                <Select
                    id="TransitionProperty"
                    value={props.state.transitionProperty}
                    onChange={handleChangeSelectFactory("transitionProperty")}
                >
                    <MenuItem value={"all"}>all</MenuItem>
                    <MenuItem value={"background-color"}>background-color</MenuItem>
                    <MenuItem value={"color"}>color</MenuItem>
                    <MenuItem value={"width"}>width</MenuItem>
                </Select>
            </FormControl>
        </div>
        <div style={{ border: "black solid 1px", paddingBottom: "1rem", paddingTop: "1rem" }}>
            <div>
                Transition Timing Function
            </div>
            <div >
                <ul>
                    <li><small>Transitionのしかた</small></li>
                </ul>
            </div>
            <FormControl variant="outlined" fullWidth={true}>
                <Select
                    id="TransitionTimingFunction"
                    value={props.state.transitionTimingFunction}
                    onChange={handleChangeSelectFactory("transitionTimingFunction")}
                >
                    <MenuItem value={"ease"}>ease</MenuItem>
                    <MenuItem value={"ease-in"}>ease-in</MenuItem>
                    <MenuItem value={"ease-in-out"}>ease-in-out</MenuItem>
                    <MenuItem value={"ease-out"}>ease-out</MenuItem>
                    <MenuItem value={"step-end"}>step-end</MenuItem>
                    <MenuItem value={"step-start"}>step-start</MenuItem>
                    <MenuItem value={"linear"}>linear</MenuItem>
                </Select>
            </FormControl>
        </div>
    </div>;
};

export default TransitionSettings;