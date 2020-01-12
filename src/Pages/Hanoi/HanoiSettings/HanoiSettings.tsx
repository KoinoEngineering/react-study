import ClassNames from "classnames";
import { makeStyles, MenuItem, Select } from "@material-ui/core";
import { List } from "immutable";
import React from "react";
import MyDispatch from "../../../core/Interfaces/MyDispatch";
import { IPropsBaseReset } from "../../../core/Interfaces/Props";
import { defaultTowers } from "../Hanoi";
import { ITowersState, TowersState } from "../Towers/Towers";

export interface IHanoiSettingsState {
    class: number;
    now: keyof ITowersState;
    goto: keyof ITowersState;
}
interface HanoiSettingsProps extends IPropsBaseReset<IHanoiSettingsState> {
    divProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    towersDispatch: MyDispatch<ITowersState>["Reset"];
}

const HanoiKeys: (keyof ITowersState)[] = ["a", "b", "c"];

const HanoiSettings: React.FC<HanoiSettingsProps> = (props: HanoiSettingsProps) => {

    const paddingStyles = makeStyles({
        bottom5: {
            paddingBottom: 5
        }
    })();
    const selectStyles = makeStyles({
        root: {
            paddingBottom: 5,
            paddingTop: 5,
        }
    })();

    const borderStyles = makeStyles({
        solidBlack1: {
            border: "solid black 1px"
        }
    })();


    const handleChildSelectChangeFactory = <K extends keyof IHanoiSettingsState>(key: K) => {
        return (
            event: React.ChangeEvent<{ name?: string; value: unknown }>,
        ) => {
            props.dispatch((prevState) => {
                return {
                    ...prevState,
                    [key]: event.target.value as IHanoiSettingsState[K]
                };
            });
        };
    };


    const handleClassChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>,
    ) => {
        const _class = event.target.value as number;
        handleChildSelectChangeFactory("class")(event);
        props.towersDispatch(() => {
            return new TowersState({
                ...defaultTowers(_class),
                [props.state.now]: List(new Array(_class)
                    .fill(0)
                    .map((_, idx) => {
                        return idx + 1;
                    }))
            });
        });
    };
    return <div  {...props.divProps} className={ClassNames(props.divProps?.className, borderStyles.solidBlack1)}>
        <div><h3>Settings</h3></div>
        <div className={paddingStyles.bottom5}>
            段数 :  <Select classes={selectStyles} value={props.state.class} onChange={handleClassChange} variant={"outlined"}>
                {new Array<number>(100).fill(0).map((_, idx) => {
                    const tmp = idx + 1;
                    return <MenuItem key={"class_" + tmp} value={tmp}>{tmp}</MenuItem>;
                })}
            </Select>
        </div>
        <div className={paddingStyles.bottom5}>
            {"現在地: " + props.state.now}
        </div>
        <div className={paddingStyles.bottom5}>
            移動先 : <Select classes={selectStyles} value={props.state.goto} onChange={handleChildSelectChangeFactory("goto")} variant={"outlined"}>
                {HanoiKeys.filter((key: keyof ITowersState) => {
                    return key !== props.state.now;
                }).map((key: keyof ITowersState) => {
                    return <MenuItem key={key} value={key} >{key}</MenuItem>;
                })}
            </Select>
        </div>
    </div>;
};

export default HanoiSettings;