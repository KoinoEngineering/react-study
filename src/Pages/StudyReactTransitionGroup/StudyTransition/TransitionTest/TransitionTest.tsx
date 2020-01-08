import { Checkbox, FormControlLabel } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import ClassNames from "classnames";
import React, { Dispatch } from "react";
import { Transition } from "react-transition-group";
import { TransitionProps, TransitionStatus } from "react-transition-group/Transition";
import { useDisplay, useWidth } from "../../../../common/Styles/Styles";
import NumberBox from "../../../../react/common/NumberBox/NumberBox";
import TransitionSettings from "./TransitionSettings/TransitionSettings";

const defaultStyle = (setting: ITransitionSettings): CSSProperties => {
    return {
        backgroundColor: "#FF0000",
        border: "black solid 1px",
        boxSizing: "border-box",
        color: "#00FFFF",
        margin: "0px auto",
        transitionDuration: setting.transitionDuration + "ms",
        transitionProperty: setting.transitionProperty,
        transitionTimingFunction: setting.transitionTimingFunction,
        width: "50%",
    };
};

type TransitionStyles = {
    [S in TransitionStatus]: any;
};

const transitionStyles: Partial<TransitionStyles> = {
    entered: {
        backgroundColor: "#00FF00",
        color: "#FF00FF",
        width: "75%",
    },
    entering: {
        backgroundColor: "#FFFF00",
        color: "#0000FF",
        width: "100%",
    },
    exited: {
        backgroundColor: "#0000FF",
        color: "#FFFF00",
        width: "50%",
    },
    exiting: {
        backgroundColor: "#FF00FF",
        color: "#00FF00",
        width: "25%",
    },
};

export interface TransitionTestState {
    transitionProps: TransitionProps;
    transitionSettings: ITransitionSettings
}

export interface ITransitionSettings {
    transitionDuration: number,
    transitionProperty: string,
    transitionTimingFunction: TimingFunction,
}

type TimingFunction = "ease" | "ease-in" | "ease-in-out" | "ease-out" | "step-end" | "step-start" | "linear";

export interface TransitionTestProps {
    state: TransitionTestState;
    dispatch: Dispatch<TransitionTestState>;
}

type CheckBoxKeys = "appear" | "enter" | "exit" | "mountOnEnter" | "unmountOnExit"

const TransitionTest: React.FC<TransitionTestProps> = (props: TransitionTestProps) => {

    const {
        state: {
            transitionProps,
        }
    } = props;

    const Display = useDisplay();
    const Width = useWidth();

    const clickCheckBoxHandlerFactory = (state: TransitionTestState, dispatch: Dispatch<TransitionTestState>, key: CheckBoxKeys) => {
        return () => {
            dispatch({
                ...state,
                transitionProps: {
                    ...state.transitionProps,
                    [key]: !state.transitionProps[key]
                }
            });
        };
    };

    const timeoutDispatcherFactory = (state: TransitionTestState, dispatch: Dispatch<TransitionTestState>): React.Dispatch<React.SetStateAction<string>> => {
        return (value: React.SetStateAction<string>) => {
            if (typeof value === "function") {
                throw "Unexpected usage";
            } else {
                dispatch({
                    ...state,
                    transitionProps: {
                        ...state.transitionProps,
                        timeout: Number(value)
                    }
                });
            }
        };
    };

    const transitionSettingsDispatcher = (transitionSettings: ITransitionSettings) => {
        props.dispatch({
            ...props.state,
            transitionSettings
        });
    };

    return <div>
        <div className={ClassNames(Display.inlineBlock, Width.p50)}>
            <div className={ClassNames(Display.inlineBlock, Width.p50)} style={{ textAlign: "left", verticalAlign: "top" }}>
                <TransitionSettings state={props.state.transitionSettings} dispatch={transitionSettingsDispatcher} />
            </div>
            <div className={ClassNames(Display.inlineBlock, Width.p50)} style={{ textAlign: "left" }}>
                <h2>
                    Transition Component Props
                </h2>
                <div>
                    Transitionコンポーネントのprops設定
                </div>
                <div className={ClassNames(Width.p100)} style={{ borderColor: "black", borderStyle: "solid", borderWidth: 1 }}>
                    <FormControlLabel
                        control={<Checkbox
                            color={"primary"}
                            checked={transitionProps.appear}
                            onClick={clickCheckBoxHandlerFactory(props.state, props.dispatch, "appear")} />}
                        label="appear"
                    />
                    <div style={{ paddingLeft: "2rem" }}>
                        <small>通常初回のマウント時にはエフェクトはかからない。<code>appear</code>を<code>true</code>にするとマウント時にもエフェクトがかかるようになる</small>
                    </div>
                </div>
                <div className={ClassNames(Width.p100)} style={{ borderColor: "black", borderStyle: "solid", borderWidth: 1 }}>
                    <FormControlLabel
                        control={<Checkbox
                            color={"primary"}
                            checked={transitionProps.enter}
                            onClick={clickCheckBoxHandlerFactory(props.state, props.dispatch, "enter")} />}
                        label="enter"
                    />
                    <div style={{ paddingLeft: "2rem" }}>
                        <small>
                            <code>in</code>を<code>true</code>にした場合の動作を変更する<br />
                            <ul>
                                <li>
                                    <code>true</code>の場合：exited -&gt; entering -&gt; entered<br />
                                </li>
                                <li>
                                    <code>false</code>の場合：exited -&gt; entered
                                </li>
                            </ul>
                        </small>
                    </div>
                </div>
                <div className={ClassNames(Width.p100)} style={{ borderColor: "black", borderStyle: "solid", borderWidth: 1 }}>
                    <FormControlLabel
                        control={<Checkbox
                            color={"primary"}
                            checked={transitionProps.exit}
                            onClick={clickCheckBoxHandlerFactory(props.state, props.dispatch, "exit")} />}
                        label="exit"
                    />
                    <div style={{ paddingLeft: "2rem" }}>
                        <small>
                            <code>in</code>を<code>false</code>にした場合の動作を変更する<br />
                            <ul>
                                <li>
                                    <code>true</code>の場合：entered -&gt; exiting -&gt; exited<br />
                                </li>
                                <li>
                                    <code>false</code>の場合：entered -&gt; exited
                                </li>
                            </ul>
                        </small>
                    </div>
                </div>
                <div className={ClassNames(Width.p100)} style={{ borderColor: "black", borderStyle: "solid", borderWidth: 1 }}>
                    <FormControlLabel
                        control={<Checkbox
                            color={"primary"}
                            checked={transitionProps.mountOnEnter}
                            onClick={clickCheckBoxHandlerFactory(props.state, props.dispatch, "mountOnEnter")} />}
                        label="mountOnEnter"
                    />
                    <div style={{ paddingLeft: "2rem" }}>
                        <small>
                            通常マウント時に子コンポーネントもマウントされるが、<br />
                            <code>true</code>を設定すると、初回の<code>in</code>を<code>true</code>にしたときにマウントされる<br />
                            <code>unmountOnExit</code>を設定しなければその後はマウントされ続ける</small>
                    </div>
                </div>
                <div className={ClassNames(Width.p100)} style={{ borderColor: "black", borderStyle: "solid", borderWidth: 1 }}>
                    <FormControlLabel
                        control={<Checkbox
                            color={"primary"}
                            checked={transitionProps.unmountOnExit}
                            onClick={clickCheckBoxHandlerFactory(props.state, props.dispatch, "unmountOnExit")} />}
                        label="unmountOnExit"
                    />
                    <div style={{ paddingLeft: "2rem" }}>
                        <small><code>true</code>を設定すると状態が<code>exited</code>になったときにアンマウントされる</small>
                    </div>
                </div>
                <div className={ClassNames(Width.p100)} style={{ borderColor: "black", borderStyle: "solid", borderWidth: 1 }}>
                    <NumberBox
                        state={transitionProps.timeout.toString()}
                        dispatch={timeoutDispatcherFactory(props.state, props.dispatch)}
                        max={2000}
                        label="timeout(ms)"
                        slider={{
                            step: 50
                        }} />
                    <div style={{ paddingLeft: "2rem" }}>
                        <small>次の状態までの<code>timeout(ms)</code></small>
                    </div>
                </div>
            </div>
        </div>
        <div className={ClassNames(Display.inlineBlock, Width.p50)} >
            <button onClick={() => { props.dispatch({ ...props.state, transitionProps: { ...props.state.transitionProps, in: !transitionProps.in } }); }}>{transitionProps.in ? "Exit" : "Enter"}</button>
            <Transition {...transitionProps}>
                {(status: keyof TransitionStyles) => {
                    return <div style={{
                        ...defaultStyle(props.state.transitionSettings),
                        ...transitionStyles[status]
                    }}>
                        {status}
                    </div>;
                }}
            </Transition>
        </div>
    </div>;
};

export default TransitionTest;