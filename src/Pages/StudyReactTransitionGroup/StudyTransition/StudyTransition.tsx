import React from "react";
import MyDispatch from "../../../core/Interfaces/MyDispatch";
import TransitionTest, { TransitionTestState } from "./TransitionTest/TransitionTest";

export interface IStudyTransitionState {
    transitionTest: TransitionTestState;
}
export interface IStudyTransitionProps {
    state: IStudyTransitionState;
    dispatch: MyDispatch<IStudyTransitionState>["Set"];
}

const StudyTransition: React.FC<IStudyTransitionProps> = (props: IStudyTransitionProps) => {

    const transitionTestDispatcher = (transitionTest: TransitionTestState) => {
        props.dispatch({
            ...props.state,
            transitionTest
        });
    };

    return <div >
        <TransitionTest state={props.state.transitionTest} dispatch={transitionTestDispatcher} />
    </div>;
};

export default StudyTransition;