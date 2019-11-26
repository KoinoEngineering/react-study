import React from "react";
import { SimpleCombineProps, SimpleCombine } from "./SimpleCombine/SimpleCombine";

export interface RecursiveCombinedReducerProps {
    simpleCombine: SimpleCombineProps;
}

export class RecursiveCombinedReducer extends React.PureComponent<RecursiveCombinedReducerProps, never>{
    public render() {
        const {
            simpleCombine
        } = this.props;
        return <div>
            <div>
                <SimpleCombine {...simpleCombine} />
            </div>
        </div>;
    }
}