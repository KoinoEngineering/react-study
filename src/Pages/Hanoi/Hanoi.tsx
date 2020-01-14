import { List } from "immutable";
import React, { useState } from "react";
import { childDispatcherFactory } from "../../common/Dispatch";
import { IDispatchable, IPropsBase } from "../../core/Interfaces/Props";
import HanoiSettings, { IHanoiSettingsState } from "./HanoiSettings/HanoiSettings";
import Towers, { ITowers, TowersState } from "./Towers/Towers";

export interface IHanoiState {
    settings: IHanoiSettingsState;
    towers: TowersState;
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

interface HanoiInnerState {
    processing: boolean;
    tasks: IHanoiTasks;
}

const keys: (keyof ITowers)[] = ["a", "b", "c"];
type IHanoiTasks = ([keyof ITowers, keyof ITowers])[];

const Hanoi: React.FC<IHanoiProps> = (props: IHanoiProps) => {

    const [innerState, dispatchInner] = useState<HanoiInnerState>({
        processing: false,
        tasks: [],
    });

    const dispatchSettings = childDispatcherFactory(props.dispatch, props.state, "settings");

    return <div>
        <div>
            <HanoiSettings
                state={props.state.settings}
                dispatch={dispatchSettings}
                stateHanoi={props.state}
                dispatchHanoi={props.dispatch}
            />
        </div>
        <div style={{ paddingBottom: 5, paddingTop: 5 }}>
            <button disabled={innerState.processing} onClick={() => {
                dispatchInner((prevState) => {
                    return {
                        ...prevState,
                        processing: !prevState.processing
                    };
                });

                const tmp: keyof ITowers | undefined = keys.find((value) => {
                    return value !== props.state.settings.now && value !== props.state.settings.goto;
                });

                if (!tmp) {
                    throw "An unexpected error has occurred";
                }
                setTimeout(() => {
                    console.log(hanoiEntry(
                        props.state.settings.class,
                        props.state.settings.now,
                        props.state.settings.goto,
                        tmp
                    ));
                    setTimeout(() => {
                        dispatchInner((prevState) => {
                            return {
                                ...prevState,
                                processing: !prevState.processing
                            };
                        });
                    }, 1000);
                }, 1000);
            }}  >{innerState.processing ? "processing..." : "start"}</button>
        </div>
        <div>
            <Towers state={props.state.towers} dispatch={childDispatcherFactory(props.dispatch, props.state, "towers")} class={props.state.settings.class} />
        </div>
    </div>;
};


const hanoi = (classes: number, ans: string, from: keyof ITowers, to: keyof ITowers, tmp: keyof ITowers): string => {
    if (classes === 1) {
        return ans + "[\"" + from + "\",\"" + to + "\"],";
    } else {
        // 一つ上をtmpに逃がす
        const rested = hanoi(classes - 1, ans, from, tmp, to);
        // 移動する
        const moved = rested + "[\"" + from + "\",\"" + to + "\"],";
        // tmpを戻す
        return hanoi(classes - 1, moved, tmp, to, from);
    }
};

const hanoiEntry = (classes: number, from: keyof ITowers, to: keyof ITowers, tmp: keyof ITowers): (keyof ITowers[])[] => {
    const ret: (keyof ITowers[])[] = JSON.parse("[" + hanoi(classes, "", from, to, tmp) + "[\"\",\"\"]]");
    ret.pop();
    return ret;
};

export default Hanoi;