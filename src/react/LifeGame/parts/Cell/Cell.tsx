import { Button, colors, WithStyles, createStyles, withStyles } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { IDispatchable, DISPATCHABLE } from "../../../../core/Interfaces/Dispatchable";


interface IStyleProps {
    alive: boolean;
}

const styles = createStyles({
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

export interface ICellProps extends WithStyles<typeof styles> {
    alive: IDispatchable<boolean>;
}

class Cell extends React.PureComponent<ICellProps> {
    constructor(props: ICellProps) {
        super(props);
        //初期化
        this.state = { alive: false };
    }

    private HandleClickButton(alive: IDispatchable<boolean>) {
        return () => {
            alive[DISPATCHABLE.DISPATCHER](!alive[DISPATCHABLE.VALUE]);
        };
    }


    render() {
        const {
            classes,
            alive
        } = this.props;
        return <Button
            className={classNames(classes.root, { alive: alive[DISPATCHABLE.VALUE] })}
            onClick={this.HandleClickButton(alive)}
        />;
    }
}

export default withStyles(styles)(Cell);