import React from "react";
import { connect } from "react-redux";
import { IState } from "../../state";
import { SimpleCombine, SimpleCombineProps, SimpleCombineState } from "./SimpleCombine/SimpleCombine";
import { RecordOf } from "immutable";

export interface RecursiveCombinedReducerProps {
    state: SimpleCombineState;
    simpleCombine: Omit<SimpleCombineProps, "state">;
}

class RecursiveCombinedReducer extends React.PureComponent<RecursiveCombinedReducerProps, never>{
    public render() {
        const {
            state,
            simpleCombine
        } = this.props;
        return <div>
            <div>
                <SimpleCombine {...simpleCombine} state={state} />
            </div>
        </div>;
    }
}

const mapstateToProps = (state: RecordOf<IState>) => {
    return {
        state: state.recursiveCombinedReducer.simpleCombine
    };
};

export default connect(mapstateToProps)(RecursiveCombinedReducer);