import React from "react";
import { StudyTransition } from "./StudyTransition/StudyTransition";

export class StudyReactTransitionGroup extends React.PureComponent {

    public render() {
        return <div>
            <div>
                <pre>{`
                    react-transition-groupのindex.d.tsの以下のものについて調査する
                    基本的にはサンプルを動かせるにするだけ
                    export { default as Transition } from './Transition';
                    export { default as CSSTransition } from './CSSTransition';
                    export { default as TransitionGroup } from './TransitionGroup';
                    export { default as SwitchTransition } from './SwitchTransition';
                    export { default as config } from './config';`}
                </pre>
            </div>
            <div>
                <div>
                    <StudyTransition />
                </div>
            </div>
            <div>
                <div>
                    {`export { default as CSSTransition } from './CSSTransition';`}
                </div>
            </div>
            <div>
                <div>
                    {`export { default as TransitionGroup } from './TransitionGroup';`}
                </div>
            </div>
            <div>
                <div>
                    {`export { default as SwitchTransition } from './SwitchTransition';`}
                </div>
            </div>
            <div>
                <div>
                    {`export { default as config } from './config';`}
                </div>
            </div>
        </div>;
    }
}