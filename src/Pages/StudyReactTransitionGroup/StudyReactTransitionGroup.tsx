import React from "react";
import StudyTransition, { IStudyTransitionState } from "./StudyTransition/StudyTransition";
import { useAnchor, useWidth } from "../../common/Styles/Styles";
import MyDispatch from "../../core/Interfaces/MyDispatch";
import { childDispatcherFactory } from "../../common/Dispatch";

export interface IStudyReactTransitionGroupState {
    studyTransition: IStudyTransitionState;
}
interface IStudyReactTransitionGroupProps {
    state: IStudyReactTransitionGroupState;
    dispatch: MyDispatch<IStudyReactTransitionGroupState>["Set"]
}


const StudyReactTransitionGroup: React.FC<IStudyReactTransitionGroupProps> = (props: IStudyReactTransitionGroupProps) => {

    const AnchorStyle = useAnchor();
    const WidthStyle = useWidth();

    return <div style={{ padding: 10 }}>
        <div className={WidthStyle.MaxContent} style={{ margin: "0px auto", whiteSpace: "pre-line", width: "max-content" }}>
            react-transition-groupのindex.d.tsの以下のものについて調査する
            <ul>
                <li><a href="#Transition" className={AnchorStyle.unset}>Transition</a></li>
                <li><a href="#CSSTransition" className={AnchorStyle.unset}>CSSTransition</a></li>
                <li><a href="#TransitionGroup" className={AnchorStyle.unset}>TransitionGroup</a></li>
                <li><a href="#SwitchTransition" className={AnchorStyle.unset}>SwitchTransition</a></li>
                <li><a href="#config" className={AnchorStyle.unset}>config</a></li>
            </ul>
        </div>
        <div>
            <div>
                <div>
                    <h1 id="Transition">Transition</h1>
                </div>
                <StudyTransition state={props.state.studyTransition} dispatch={childDispatcherFactory(props.dispatch, props.state, "studyTransition")} />
            </div>
        </div>
        <div>
            <div>
                <div>
                    <h1 id="CSSTransition">CSSTransition</h1>
                </div>
                {`export { default as CSSTransition } from './CSSTransition';`}
            </div>
        </div>
        <div>
            <div>
                <div>
                    <h1 id="TransitionGroup">TransitionGroup</h1>
                </div>
                {`export { default as TransitionGroup } from './TransitionGroup';`}
            </div>
        </div>
        <div>
            <div>
                <div>
                    <h1 id="SwitchTransition">SwitchTransition</h1>
                </div>
                {`export { default as SwitchTransition } from './SwitchTransition';`}
            </div>
        </div>
        <div>
            <div>
                <div>
                    <h1 id="config">config</h1>
                </div>
                {`export { default as config } from './config';`}
            </div>
        </div>
    </div>;
};

export default StudyReactTransitionGroup;