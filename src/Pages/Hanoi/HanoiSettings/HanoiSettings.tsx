import ClassNames from "classnames";
import { makeStyles, MenuItem, Select } from "@material-ui/core";
import { List } from "immutable";
import React from "react";
import MyDispatch from "../../../core/Interfaces/MyDispatch";
import { IPropsBase, IDispatchable } from "../../../core/Interfaces/Props";
import { defaultTowers, IHanoiState } from "../Hanoi";
import { TowersState, ITowers } from "../Towers/Towers";
import NumberBox from "../../../react/common/NumberBox/NumberBox";
import { childDispatcherFactory } from "../../../common/Dispatch";
import { useDisplay } from "../../../common/Styles/Styles";

export interface IHanoiSettingsState {
    series: number;
    delay: number;
    fromKey: keyof ITowers;
    toKey: keyof ITowers;
}
interface HanoiSettingsProps extends IPropsBase<IHanoiSettingsState>, IDispatchable<IHanoiSettingsState> {
    divProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    // useEffectがうまく使えてないないので妥協案
    stateHanoi: IHanoiState;
    dispatchHanoi: MyDispatch<IHanoiState>["Set"];
}

const HanoiKeys: (keyof ITowers)[] = ["a", "b", "c"];

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


    const handleChildSelectChangeFactory = <K extends keyof IHanoiSettingsState>(state: IHanoiSettingsState, key: K) => {
        return (
            event: React.ChangeEvent<{ name?: string; value: unknown }>,
        ) => {
            props.dispatch({
                ...state,
                [key]: event.target.value as IHanoiSettingsState[K]
            });
        };
    };


    const handleClassChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>,
    ) => {
        const newClass = event.target.value as number;
        props.dispatchHanoi({
            ...props.stateHanoi,
            settings: {
                ...props.state,
                series: newClass
            },
            towers: new TowersState({
                ...defaultTowers,
                [props.state.fromKey]: List(new Array(newClass).fill(0).map((_, idx) => {
                    return idx + 1;
                }))
            })
        });
    };

    const displayStyles = useDisplay();
    return <div  {...props.divProps} className={ClassNames(props.divProps?.className, borderStyles.solidBlack1)}>
        <div><h3>Settings</h3></div>
        <div className={paddingStyles.bottom5}>
            段数 :  <Select classes={selectStyles} value={props.state.series} onChange={handleClassChange} variant={"outlined"}>
                {new Array<number>(20).fill(0).map((_, idx) => {
                    const tmp = idx + 1;
                    return <MenuItem key={"class_" + tmp} value={tmp}>{tmp}</MenuItem>;
                })}
            </Select> (手数 : {(2 ** props.state.series) - 1}手)
        </div>
        <div className={paddingStyles.bottom5}>
            {"現在地: " + props.state.fromKey}
        </div>
        <div className={paddingStyles.bottom5}>
            移動先 : <Select classes={selectStyles} value={props.state.toKey} onChange={handleChildSelectChangeFactory(props.state, "toKey")} variant={"outlined"}>
                {HanoiKeys.filter((key: keyof ITowers) => {
                    return key !== props.state.fromKey;
                }).map((key: keyof ITowers) => {
                    return <MenuItem key={key} value={key} >{key}</MenuItem>;
                })}
            </Select>
        </div>
        <div className={paddingStyles.bottom5}>
            <div className={ClassNames(displayStyles.inlineBlock, "MuiFormControl-marginNormal")} style={{ verticalAlign: "top", }}>間隔(ms)&nbsp;:&nbsp;</div><NumberBox
                state={props.state.delay.toString()}
                dispatch={(value: string) => { childDispatcherFactory(props.dispatch, props.state, "delay")(Number(value)); }}
                max={1000}
                slider={{
                    step: 50
                }}
            />
        </div>
    </div>;
};

export default HanoiSettings;