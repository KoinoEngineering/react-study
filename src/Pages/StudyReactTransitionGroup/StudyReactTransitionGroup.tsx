import React from "react";
import { StudyTransition } from "./StudyTransition/StudyTransition";
import { useAnchor } from "../../common/Styles/Styles";

export const StudyReactTransitionGroup = () => {

    const AnchorStyle = useAnchor();

    return <div style={{ padding: 10 }}>
        <div style={{ whiteSpace: "pre-line" }}>
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
                <StudyTransition />
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
