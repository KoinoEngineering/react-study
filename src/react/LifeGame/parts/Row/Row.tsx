import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import React from "react";
import Cell from "../Cell/Cell";
import { IFieldState } from "../Field/Field";
import { DISPATCHABLE } from "../../../../core/Interfaces/Dispatchable";

const styles = createStyles({});

interface IRowProps extends WithStyles<typeof styles> {
    y: number;
    fieldState: IFieldState;
}


const Row: React.FC<IRowProps> = (props: IRowProps) => {

    return <div>
        {Array(props.fieldState[DISPATCHABLE.VALUE][props.y].length).fill(0).map((value, idx) => {
            return <Cell key={"Cell:" + props.y + "-" + idx} y={props.y} x={idx} fieldState={props.fieldState} />;
        })}

    </div>;
};


export default withStyles(styles)(Row);