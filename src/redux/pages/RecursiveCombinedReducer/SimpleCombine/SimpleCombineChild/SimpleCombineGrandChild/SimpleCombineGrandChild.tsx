import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import NumberBox, { INumberBoxProps } from "../../../../../../react/common/NumberBox/NumberBox";
import { IAction } from "../../../../../action";
import { SimpleCombineGrandChildActions } from "../../../../../action/RecursiveCombinedReducer/SimpleCombine/SimpleCombineChild/SimpleCombineGrandChild";
import { SimpleCombineGrandChildPayload } from "../../../../../reducer/RecursiveCombinedReducer/SimpleCombine/SimpleCombineChild/SimpleCombineGrandChild/SimpleCombineGrandChildReducer";

export interface SimpleCombineGrandChildProps {
    state: SimpleCombineGrandChildState;
    numberA: Omit<INumberBoxProps, "dispatch" | "state">;
    numberB: Omit<INumberBoxProps, "dispatch" | "state">;
    dispatch: Dispatch<IAction<SimpleCombineGrandChildPayload>>;
}

export type ReduxNumberBoxState = Pick<INumberBoxProps, "state">;
export interface SimpleCombineGrandChildState {
    numberA: ReduxNumberBoxState;
    numberB: ReduxNumberBoxState;
}

class SimpleCombineGrandChild extends React.PureComponent<SimpleCombineGrandChildProps>{

    private updateValueCreator = (dispatch: Dispatch<IAction<SimpleCombineGrandChildPayload>>, target: SimpleCombineGrandChildPayload["target"], prevState: string): React.Dispatch<React.SetStateAction<string>> => {
        return (value: string | ((prevState: string) => string)) => {
            if (typeof value === "function" && prevState === undefined) {
                throw new Error("reset function needs prevState");
            }
            dispatch({
                payload: {
                    target,
                    value: { state: typeof value === "function" ? value(prevState) : value },
                },
                type: SimpleCombineGrandChildActions.SIMPLE_COMBINE_GRANDCHILD_UPDATE,
            });
        };
    }

    public render() {
        const {
            numberA,
            numberB,
            dispatch,
            state,
        } = this.props;
        return <div>
            <div>
                <NumberBox {...numberA} state={state.numberA.state} dispatch={this.updateValueCreator(dispatch, "numberA", state.numberA.state)} />
            </div>
            <div>
                <NumberBox {...numberB} state={state.numberB.state} dispatch={this.updateValueCreator(dispatch, "numberB", state.numberB.state)} />
            </div>
        </div>;
    }
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>): Pick<SimpleCombineGrandChildProps, "dispatch"> => {
    return {
        dispatch: dispatch
    };
};

export default connect(null, mapDispatchToProps)(SimpleCombineGrandChild);