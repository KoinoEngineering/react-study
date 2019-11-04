import React from "react";
import { DISPATCHABLE, IDispatchable } from "../../../../core/Interfaces/Dispatchable";
import Row from "../Row/Row";


export type IFieldState = IDispatchable<boolean[][]>;

export interface IFieldProps {
    fieldState: IFieldState;
}

export const Field: React.FC<IFieldProps> = (props: IFieldProps) => {
    return <div>
        {props.fieldState[DISPATCHABLE.VALUE].map((row, idx) => {
            return <Row key={"Row:" + idx} y={idx} fieldState={props.fieldState} />;
        })}
    </div>;
};