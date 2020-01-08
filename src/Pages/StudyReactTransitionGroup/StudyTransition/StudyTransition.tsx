import React, { useState } from "react";
import TransitionTest, { TransitionTestState } from "./TransitionTest/TransitionTest";

export const StudyTransition: React.FC = () => {
    const [state, dispatch] = useState<TransitionTestState>({
        transitionProps: {
            appear: true,
            enter: true,
            exit: true,
            in: true,
            timeout: 1000,
        },
        transitionSettings: {
            transitionDuration: 1000,
            transitionProperty: "all",
            transitionTimingFunction: "ease"
        }
    });

    return <div >
        <TransitionTest state={state} dispatch={dispatch} />
    </div>;
};
