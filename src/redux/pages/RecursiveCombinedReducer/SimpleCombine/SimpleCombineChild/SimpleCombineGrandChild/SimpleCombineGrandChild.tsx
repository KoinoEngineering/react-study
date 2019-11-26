import React from "react";
import NumberBox, { INumberBoxProps, INumberBoxState } from "../../../../../../react/common/NumberBox/NumberBox";

export interface SimpleCombineGrandChildProps {
    numberA: INumberBoxProps;
    numberB: INumberBoxProps;
}

export interface SimpleCombineGrandChildState {
    numberA: INumberBoxState;
    numberB: INumberBoxState;
}

export class SimpleCombineGrandChild extends React.PureComponent<SimpleCombineGrandChildProps>{
    public render() {
        const {
            numberA,
            numberB
        } = this.props;
        return <div>
            <div>
                <NumberBox {...numberA} />
            </div>
            <div>
                <NumberBox {...numberB} />
            </div>
        </div>;
    }
}