import React from "react";
import { DISPATCHABLE, IDispatchable } from "../../../../core/Interfaces/Dispatchable";
import Row, { IRowState } from "../Row/Row";
import { CellMouseEventFactory } from "../Cell/Cell";


export type IFieldState = IDispatchable<IRowState[]>;

export interface IFieldProps {
    fieldState: IFieldState;
    CellsOnclick: CellMouseEventFactory;
}

export const Field: React.FC<IFieldProps> = (props: IFieldProps) => {
    const fieldStateValue = props.fieldState[DISPATCHABLE.VALUE];
    return <div>
        {props.fieldState[DISPATCHABLE.VALUE].map((row, idx) => {
            return <Row key={"Row:" + idx} y={idx} row={fieldStateValue[idx]} CellsOnclick={props.CellsOnclick} />;
        })}
    </div>;
};