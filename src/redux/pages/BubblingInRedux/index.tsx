import { createStyles, withStyles, Button } from "@material-ui/core";
import { WithStyles } from "@material-ui/styles";
import ClassNames from "classnames";
import { RecordOf } from "immutable";
import React from "react";
import { Dispatchable } from "../../interfaces/Dispatchable";
import { IBubblingInRedux } from "../../state/BubblingInRedux";
import TextBoxWithFocusBlur from "./TextBoxWithFocusBlur";
import { CreateClearEvent } from "../../action";

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
});



export interface BubblingInReduxProps extends WithStyles<typeof styles>, Dispatchable {
    state: RecordOf<IBubblingInRedux>;
}

class BubblingInRedux extends React.Component<BubblingInReduxProps, never>{

    public render() {
        const {
            state,
            classes,
            dispatch
        } = this.props;
        return <div className={ClassNames(classes.root, classes.flexBox)} >
            <div className={classes.eventLog}>
                <div>
                    イベントログ
                </div>
                <ul>
                    {state
                        .get("event")
                        .get("log")
                        .map((logitem, idx) => {
                            return <li key={idx}>{logitem}</li>;
                        })}
                </ul>
            </div>
            <div className={classes.itemArea} >
                <div>テキストボックスにClickとBlurイベントが設定してあるときのイベント発火の確認用</div>
                <div className={classes.h1} >
                    side by side
                    <TextBoxWithFocusBlur id="TextBox1" dispatch={dispatch} />
                    <TextBoxWithFocusBlur id="TextBox2" dispatch={dispatch} />
                </div>
                <div className={classes.h1} >
                    state shareing
                    <TextBoxWithFocusBlur id="TextBox3" dispatch={dispatch} activeElementId={state.get("activeElementId")} textField={{ value: "state.ActiveElementId is " + state.get("activeElementId") }} />
                    <TextBoxWithFocusBlur id="TextBox4" dispatch={dispatch} activeElementId={state.get("activeElementId")} textField={{ value: "state.ActiveElementId is " + state.get("activeElementId") }} />
                </div>
                <div className={classes.h1} >
                    <Button variant="outlined" onClick={CreateClearEvent(dispatch)} >クリア</Button>
                </div>
            </div>
        </div>;
    }
}

export default withStyles(styles)(BubblingInRedux);