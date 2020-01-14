import { List } from "immutable";
import React, { useEffect } from "react";
import { childDispatcherFactory } from "../../common/Dispatch";
import { IDispatchable, IPropsBase } from "../../core/Interfaces/Props";
import HanoiSettings, { IHanoiSettingsState } from "./HanoiSettings/HanoiSettings";
import Towers, { ITowers, TowersState } from "./Towers/Towers";

export interface IHanoiState {
    progress: "calculating" | "processing" | "finished";
    settings: IHanoiSettingsState;
    tasks: IHanoiTasks;
    towers: TowersState;
}

export const defaultTowers = Object.freeze({
    a: List(),
    b: List(),
    c: List(),
});

export const initHanoiState = (): IHanoiState => {
    return {
        progress: "finished",
        settings: {
            class: 3,
            goto: "c",
            now: "a",
        },
        tasks: [],
        towers: new TowersState({
            ...defaultTowers,
            a: List([1, 2, 3]),
        })
    };
};

type IHanoiProps = IPropsBase<IHanoiState> & IDispatchable<IHanoiState>;

const keys: (keyof ITowers)[] = ["a", "b", "c"];
type IHanoiTasks = ([keyof ITowers, keyof ITowers])[];
export const DELAY = 1000;
const Hanoi: React.FC<IHanoiProps> = (props: IHanoiProps) => {

    const dispatchSettings = childDispatcherFactory(props.dispatch, props.state, "settings");
    const {
        dispatch,
        state,
        state: {
            progress,
            tasks,
            towers,
        }
    } = props;
    useEffect(() => {
        setTimeout(() => {
            const task = tasks.shift();
            if (task) {
                dispatch({
                    ...state,
                    tasks: [...tasks],
                    towers: towers.Move(task[0], task[1]),
                });
            } else {
                if (progress === "processing") {
                    dispatch({
                        ...state,
                        progress: "finished",
                        settings: {
                            ...state.settings,
                            goto: keys.filter((key) => {
                                return key !== state.settings.goto;
                            })[0],
                            now: state.settings.goto,
                        }
                    });
                }
            }
        }, DELAY);
    }, [dispatch, state, progress, tasks, towers]);
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
            <button disabled={progress !== "finished"} onClick={() => {
                const tmp: keyof ITowers | undefined = keys.find((value) => {
                    return value !== props.state.settings.now && value !== props.state.settings.goto;
                });

                if (!tmp) {
                    throw new Error("An unexpected error has occurred");
                }

                console.log("calclate start:" + new Date());
                dispatch({
                    ...state,
                    progress: "calculating"
                });
                setTimeout(() => {
                    dispatch({
                        ...state,
                        progress: "processing",
                        tasks: hanoiEntry(
                            props.state.settings.class,
                            props.state.settings.now,
                            props.state.settings.goto,
                            tmp
                        )
                    });
                    console.log("calclate end:" + new Date());
                }, 1000);
            }}  >{progress === "finished" ? "start" : (progress + "...")}</button>
        </div>
        <div>
            <Towers state={props.state.towers} dispatch={childDispatcherFactory(props.dispatch, props.state, "towers")} class={props.state.settings.class} />
        </div>
        <div>{JSON.stringify(tasks)}</div>
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