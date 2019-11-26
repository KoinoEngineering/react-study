import { SimpleCombineChildProps, SimpleCombineChildState, SimpleCombineChild } from "./SimpleCombineChild/SimpleCombineChild";
import React from "react";

export interface SimpleCombineProps {
    childA: SimpleCombineChildProps,
    childB: SimpleCombineChildProps,
}

export interface SimpleCombineState {
    childA: SimpleCombineChildState,
    childB: SimpleCombineChildState,
}

export class SimpleCombine extends React.PureComponent<SimpleCombineProps, never>{
    public render() {
        const {
            childA,
            childB
        } = this.props;
        return <div>
            <div>
                <SimpleCombineChild {...childA} />
            </div>
            <div>
                <SimpleCombineChild {...childB} />
            </div>
        </div>;
    }
}
