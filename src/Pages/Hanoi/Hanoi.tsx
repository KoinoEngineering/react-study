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
            delay: 300,
            fromKey: "a",
            goto: "c",
            series: 3,
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
const Hanoi: React.FC<IHanoiProps> = (props: IHanoiProps) => {

    const dispatchSettings = childDispatcherFactory(props.dispatch, props.state, "settings");
    const {
        dispatch,
        state,
        state: {
            progress,
            tasks,
            towers,
            settings: {
                delay
            }
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
                            fromKey: state.settings.goto,
                            goto: keys.filter((key) => {
                                return key !== state.settings.goto;
                            })[0],
                        }
                    });
                }
            }
        }, delay);
    }, [delay, dispatch, state, progress, tasks, towers]);
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
                    return value !== props.state.settings.fromKey && value !== props.state.settings.goto;
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
                            props.state.settings.series,
                            props.state.settings.fromKey,
                            props.state.settings.goto,
                            tmp
                        )
                    });
                    console.log("calclate end:" + new Date());
                }, 1000);
            }}  >{progress === "finished" ? "start" : (progress + "...")}</button>
        </div>
        <div>
            <Towers
                delay={delay}
                state={towers}
                dispatch={childDispatcherFactory(props.dispatch, props.state, "towers")}
                series={props.state.settings.series}
            />
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