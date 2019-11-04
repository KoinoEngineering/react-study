import { makeStyles } from "@material-ui/styles";
import React from "react";
import { DISPATCHABLE } from "../../../../core/Interfaces/Dispatchable";
import Cell from "../Cell/Cell";
import { IFieldState } from "../Field/Field";

const useStyles = makeStyles({
    root: {
        height: 10,
    }
});

interface IRowProps {
    y: number;
    fieldState: IFieldState;
}


const Row: React.FC<IRowProps> = (props: IRowProps) => {
    const classes = useStyles();
    return <div className={classes.root}>
        {Array(props.fieldState[DISPATCHABLE.VALUE][props.y].length).fill(0).map((value, idx) => {
            return <Cell key={"Cell:" + props.y + "-" + idx} y={props.y} x={idx} fieldState={props.fieldState} />;
        })}

    </div>;
};


export default Row;