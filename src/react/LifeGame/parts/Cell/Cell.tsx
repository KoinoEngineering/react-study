import { Button, colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import React, { MouseEventHandler, useCallback, useMemo } from "react";

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
        verticalAlign: "unset",
        width: 10,
    },
});

export type CellMouseEventFactory = (y: number, x: number) => MouseEventHandler<HTMLButtonElement>;

export interface ICellProps {
    y: number;
    x: number;
    alive: boolean;
    onClickEventFactory: CellMouseEventFactory;
}

const Cell: React.FC<ICellProps> = (props: ICellProps) => {

    const {
        root
    } = useStyles();

    const {
        onClickEventFactory: onClick,
        y,
        x,
        alive,
    } = props;
    const onClickHandler = useCallback(() => {
        console.log("call onClickHandler");
        return onClick(y, x);
    }, [onClick, y, x,]);
    return useMemo(() => {
        return <Button
            ref={React.createRef<HTMLButtonElement>()}
            className={classNames(root, { alive })}
            onClick={onClickHandler}
        >{""}</Button>;
    }, [alive, root, onClickHandler]);
};

export default Cell;