import React from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { Dispatch } from "redux";
import NumberBox, { INumberBoxProps } from "../../../../../../react/common/NumberBox/NumberBox";
import { IAction } from "../../../../../action";
import { SimpleCombineGrandChildActions } from "../../../../../action/RecursiveCombinedReducer/SimpleCombine/SimpleCombineChild/SimpleCombineGrandChild";
import { SimpleCombineGrandChildPayload } from "../../../../../reducer/RecursiveCombinedReducer/SimpleCombine/SimpleCombineChild/SimpleCombineGrandChild/SimpleCombineGrandChildReducer";

export interface SimpleCombineGrandChildProps {
    numberA: INumberBoxProps;
    numberB: INumberBoxProps;
    dispatch: Dispatch<IAction<SimpleCombineGrandChildPayload>>;
}

export type ReduxNumberBoxState = Pick<INumberBoxProps, "state">;
export interface SimpleCombineGrandChildState {
    numberA: ReduxNumberBoxState;
    numberB: ReduxNumberBoxState;
}

class SimpleCombineGrandChild extends React.PureComponent<SimpleCombineGrandChildProps>{

    private updateValueCreator = (dispatch: Dispatch<IAction>, prevState: string): React.Dispatch<React.SetStateAction<string>> => {
        return (value: string | ((prevState: string) => string)) => {
            if (typeof value === "function" && prevState === undefined) {
                throw new Error("reset function needs prevState");
            }
            dispatch({
                payload: {
                    value: typeof value === "function" ? value(prevState) : value
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
        } = this.props;
        return <div>
            <div>
                <NumberBox {...numberA} dispatch={this.updateValueCreator(dispatch, numberA.state)} />
            </div>
            <div>
                <NumberBox {...numberB} dispatch={this.updateValueCreator(dispatch, numberB.state)} />
            </div>
        </div>;
    }
}

const mapDispatchToProps: MapDispatchToProps<Pick<SimpleCombineGrandChildProps, "dispatch">, SimpleCombineGrandChildProps> = (dispatch: SimpleCombineGrandChildProps["dispatch"]) => {
    return {
        dispatch
    };
};

export default connect(null, mapDispatchToProps)(SimpleCombineGrandChild);