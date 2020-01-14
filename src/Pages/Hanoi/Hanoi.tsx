import { List } from "immutable";
import React, { useState, useEffect } from "react";
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
    state: "calculating" | "processing" | "finished";
    tasks: IHanoiTasks;
}

const keys: (keyof ITowers)[] = ["a", "b", "c"];
type IHanoiTasks = ([keyof ITowers, keyof ITowers])[];

const Hanoi: React.FC<IHanoiProps> = (props: IHanoiProps) => {

    const [innerState, innerDispatch] = useState<HanoiInnerState>({
        state: "finished",
        tasks: [] as IHanoiTasks,
    });

    const dispatchSettings = childDispatcherFactory(props.dispatch, props.state, "settings");
    const tasks = innerState.tasks;
    const { dispatch, state } = props;
    useEffect(() => {
        const task = tasks.shift();
        if (task) {
            innerDispatch((prev) => {
                return {
                    ...prev,
                    tasks: [...tasks]
                };
            });
            dispatch({
                ...state,
                towers: state.towers.Move(task[0], task[1])
            });
        } else {
            innerDispatch((prev) => {
                return {
                    ...prev,
                    state: "finished"
                };
            });
        }
    }, [tasks, dispatch, state]);
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
            <button disabled={innerState.state !== "finished"} onClick={() => {
                const tmp: keyof ITowers | undefined = keys.find((value) => {
                    return value !== props.state.settings.now && value !== props.state.settings.goto;
                });

                if (!tmp) {
                    throw new Error("An unexpected error has occurred");
                }

                console.log("calclate start:" + new Date());
                innerDispatch((prev) => {
                    return {
                        ...prev,
                        state: "calculating",
                    };
                });
                setTimeout(() => {
                    innerDispatch({
                        state: "processing",
                        tasks: hanoiEntry(
                            props.state.settings.class,
                            props.state.settings.now,
                            props.state.settings.goto,
                            tmp
                        )
                    });
                    console.log("calclate end:" + new Date());
                }, 1000);
            }}  >{innerState.state === "finished" ? "start" : (innerState.state + "...")}</button>
        </div>
        <div>
            <Towers state={props.state.towers} dispatch={childDispatcherFactory(props.dispatch, props.state, "towers")} class={props.state.settings.class} />
        </div>
        <div>{JSON.stringify(innerState.tasks)}</div>
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

const hanoiEntry = (classes: number, from: keyof ITowers, to: keyof ITowers, tmp: keyof ITowers): IHanoiTasks => {
    const ret: IHanoiTasks = JSON.parse("[" + hanoi(classes, "", from, to, tmp) + "[\"\",\"\"]]");
    ret.pop();
    return ret;
};

export default Hanoi;