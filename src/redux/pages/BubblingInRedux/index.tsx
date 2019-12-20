import { createStyles, withStyles } from "@material-ui/core";
import { WithStyles } from "@material-ui/styles";
import ClassNames from "classnames";
import { RecordOf } from "immutable";
import React from "react";
import { Dispatchable } from "../../interfaces/Dispatchable";
import { IBubblingInReduxState } from "../../state/BubblingInRedux/index";
import { Unit } from "./Unit";

const styles = createStyles({
    eventLog: {
        boxSizing: "border-box",
        height: "100%",
        width: "25%",
    },
    flexBox: {
        display: "flex",
        flexDirection: "row",
    },
    h1: {
        padding: 10,
        paddingLeft: 20,
    },
    itemArea: {
        boxSizing: "border-box",
        height: "100%",
        width: "75%",
    },
    root: {
        height: "100%",
        width: "100%",
    },
    unitContainer: {
        margin: "auto"
    },
});



export interface BubblingInReduxProps extends WithStyles<typeof styles>, Dispatchable {
    state: RecordOf<IBubblingInReduxState>;
}

class BubblingInRedux extends React.Component<BubblingInReduxProps, never>{

    public render() {
        const {
            state,
            classes,
            dispatch
        } = this.props;
        return <div className={ClassNames(classes.root, classes.flexBox)} >
            <div className={classes.unitContainer}>
                <Unit dispatch={dispatch} state={state.root} />
            </div>
        </div>;
    }
}

export default withStyles(styles)(BubblingInRedux);