import { CSSProperties } from "@material-ui/core/styles/withStyles";
import ClassNames from "classnames";
import React, { Dispatch } from "react";
import { Transition } from "react-transition-group";
import { TransitionProps, TransitionStatus } from "react-transition-group/Transition";
import { childDispatcherFactory } from "../../../../common/Dispatch";
import { useDisplay, useWidth } from "../../../../common/Styles/Styles";
import TransitionComponentPropsSettings from "./TransitionComponentPropsSettings/TransitionComponentPropsSettings";
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
        backgroundColor: "#0000FF",
        color: "#FFFF00",
        width: "75%",
    },
    entering: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        width: "100%",
    },
    exited: {
        backgroundColor: "#FF0000",
        color: "#00FFFF",
        width: "50%",
    },
    exiting: {
        backgroundColor: "#000000",
        color: "#FFFFFF",
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

const TransitionTest: React.FC<TransitionTestProps> = (props: TransitionTestProps) => {

    const {
        state: {
            transitionProps,
        }
    } = props;

    const Display = useDisplay();
    const Width = useWidth();

    return <div>
        <div className={ClassNames(Display.inlineBlock, Width.p50)}>
            <div className={ClassNames(Display.inlineBlock, Width.p50)} style={{ textAlign: "left", verticalAlign: "top" }}>
                <TransitionSettings state={props.state.transitionSettings} dispatch={childDispatcherFactory(props.dispatch, props.state, "transitionSettings")} />
            </div>
            <div className={ClassNames(Display.inlineBlock, Width.p50)} style={{ textAlign: "left" }}>
                <TransitionComponentPropsSettings state={props.state.transitionProps} dispatch={childDispatcherFactory(props.dispatch, props.state, "transitionProps")} />
            </div>
        </div>
        <div className={ClassNames(Display.inlineBlock, Width.p50)} style={{ verticalAlign: "top" }}>
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