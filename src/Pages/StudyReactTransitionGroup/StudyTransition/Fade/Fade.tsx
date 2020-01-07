import React, { Dispatch } from "react";
import { Transition } from "react-transition-group";

const defaultStyle = (duration: number) => {
    return {
        opacity: 0,
        transition: `opacity ${duration}ms ease-in-out`,
    };
};
const transitionStyles = {
    entered: { opacity: 1 },
    entering: { opacity: 1 },
};

export interface FadeState {
    duration: number;
    in: boolean;
    transitionStyle: keyof typeof transitionStyles;
}

export interface FadeProps {
    state: FadeState
    dispatch: Dispatch<FadeState>;
}

export const Fade: React.FC<FadeProps> = (props: FadeProps) => {

    const toggleInHandler = (state: FadeState, dispatch: Dispatch<FadeState>) => {
        return () => {
            dispatch({ ...state, in: !state.in });
        };
    };
    return <Transition in={props.state.in} timeout={props.state.duration}>
        <div style={{
            ...defaultStyle(props.state.duration),
            ...transitionStyles[props.state.transitionStyle]
        }} onClick={toggleInHandler(props.state, props.dispatch)}>
            {"I'm A fade Transition!"}
        </div>
    </Transition>;
};