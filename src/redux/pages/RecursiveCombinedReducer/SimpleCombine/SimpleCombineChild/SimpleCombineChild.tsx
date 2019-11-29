import React from "react";
import SimpleCombineGrandChild, { SimpleCombineGrandChildProps, SimpleCombineGrandChildState, } from "./SimpleCombineGrandChild/SimpleCombineGrandChild";

export interface SimpleCombineChildProps {
    state: SimpleCombineChildState;
    grandChildA: Omit<SimpleCombineGrandChildProps, "dispatch" | "state">;
    grandChildB: Omit<SimpleCombineGrandChildProps, "dispatch" | "state">;
}

export interface SimpleCombineChildState {
    grandChildA: SimpleCombineGrandChildState;
    grandChildB: SimpleCombineGrandChildState;
}

export class SimpleCombineChild extends React.PureComponent<SimpleCombineChildProps>{
    public render() {
        const {
            grandChildA,
            grandChildB,
            state,
        } = this.props;
        return <div>
            <div>
                <SimpleCombineGrandChild {...grandChildA} state={state.grandChildA} />
            </div>
            <div>
                <SimpleCombineGrandChild {...grandChildB} state={state.grandChildB} />
            </div>
        </div>;
    }
}