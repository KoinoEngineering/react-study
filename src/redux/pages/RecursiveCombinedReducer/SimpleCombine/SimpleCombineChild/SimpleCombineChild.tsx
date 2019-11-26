import React from "react";
import { SimpleCombineGrandChildProps, SimpleCombineGrandChildState, SimpleCombineGrandChild } from "./SimpleCombineGrandChild/SimpleCombineGrandChild";

export interface SimpleCombineChildProps {
    grandChildA: SimpleCombineGrandChildProps;
    grandChildB: SimpleCombineGrandChildProps;
}

export interface SimpleCombineChildState {
    grandChildA: SimpleCombineGrandChildState;
    grandChildB: SimpleCombineGrandChildState;
}

export class SimpleCombineChild extends React.PureComponent<SimpleCombineChildProps>{
    public render() {
        const {
            grandChildA,
            grandChildB
        } = this.props;
        return <div>
            <div>
                <SimpleCombineGrandChild {...grandChildA} />
            </div>
            <div>
                <SimpleCombineGrandChild {...grandChildB} />
            </div>
        </div>;
    }
}