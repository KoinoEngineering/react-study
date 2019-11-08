import { makeStyles } from "@material-ui/styles";
import React, { useMemo } from "react";
import Cell, { CellMouseEventFactory } from "../Cell/Cell";

const useStyles = makeStyles({
    root: {
        height: 10,
    }
});

export type IRowState = boolean[];

interface IRowProps {
    y: number;
    row: IRowState;
    CellsOnclick: CellMouseEventFactory;
}


const Row: React.FC<IRowProps> = (props: IRowProps) => {
    const {
        root,
    } = useStyles();

    const {
        y,
        row,
        CellsOnclick } = props;
    return useMemo(() => {
        return <div className={root}>
            {row.map((cell, idx) => {
                return <Cell
                    key={"Cell:" + y + "-" + idx}
                    y={y}
                    x={idx}
                    alive={cell}
                    onClickEventFactory={CellsOnclick} />;
            })}
        </div>;
    }, [root, y, row, CellsOnclick]);
};

export default Row;