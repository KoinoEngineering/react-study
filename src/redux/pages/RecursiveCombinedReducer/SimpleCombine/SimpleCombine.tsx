import { SimpleCombineChildProps, SimpleCombineChildState, SimpleCombineChild } from "./SimpleCombineChild/SimpleCombineChild";
import React from "react";

export interface SimpleCombineProps {
    state: SimpleCombineState;
    childA: Omit<SimpleCombineChildProps, "state">;
    childB: Omit<SimpleCombineChildProps, "state">;
}

export interface SimpleCombineState {
    childA: SimpleCombineChildState,
    childB: SimpleCombineChildState,
}

export class SimpleCombine extends React.PureComponent<SimpleCombineProps, never>{
    public render() {
        const {
            childA,
            childB,
            state,
        } = this.props;
        return <div>
            <div>
                <SimpleCombineChild {...childA} state={state.childA} />
            </div>
            <div>
                <SimpleCombineChild {...childB} state={state.childB} />
            </div>
        </div>;
    }
}