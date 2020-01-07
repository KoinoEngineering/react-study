import React, { useState } from "react";
import { Fade, FadeState } from "./Fade/Fade";
export const StudyTransition: React.FC = () => {
    const [state, dispatch] = useState<FadeState>({
        duration: 300,
        in: false,
        transitionStyle: "entered",
    }
    );

    return <div>
        <Fade state={state} dispatch={dispatch} />
    </div>;
};
