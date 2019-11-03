import { Button, colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import React from "react";
import { DISPATCHABLE } from "../../../../core/Interfaces/Dispatchable";
import { IFieldState } from "../Field/Field";



const useStyles = makeStyles({
    root: {
        "&.alive": {
            backgroundColor: colors.grey[900]
        },
        backgroundColor: colors.grey[50],
        border: "1px solid",
        borderColor: colors.grey[900],
        borderRadius: 0,
        boxSizing: "border-box",
        display: "inline-block",
        height: 10,
        minWidth: 10,
        padding: 0,
        width: 10,
    },
});

export interface ICellProps {
    y: number;
    x: number;
    fieldState: IFieldState;
}

const Cell: React.FC<ICellProps> = (props: ICellProps) => {
    const classes = useStyles();
    const HandleClickButtonFactory = (fieldState: IFieldState, y: number, x: number) => {
        const field = fieldState[DISPATCHABLE.VALUE];
        const fieldDispatcher = fieldState[DISPATCHABLE.DISPATCHER];
        return () => {
            fieldDispatcher(field.map((row, idxY) => {
                return idxY === y
                    ? row.map((value, idxX) => {
                        return idxX === x
                            ? !field[y][x]
                            : value;
                    })
                    : row;
            }));
        };
    };

    return <Button
        className={classNames(classes.root, { alive: props.fieldState[DISPATCHABLE.VALUE][props.y][props.x] })}
        onClick={HandleClickButtonFactory(props.fieldState, props.y, props.x)}
    />;
};

export default Cell;