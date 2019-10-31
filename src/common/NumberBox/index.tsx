import React, { ChangeEvent } from "react";
import { ComponentBase } from "../../core/Component";
import { INumberBoxProps } from "./props";
import { generateAction } from "../../core/Action";
import { createStyles, withStyles, Slider, TextField } from "@material-ui/core";

const style = createStyles({
    root: {
        display: "inline-block"
    },
    textFieldRoot: {
        paddingTop: 0,
        paddingBottom: 0
    }
});

class NumberBox extends ComponentBase<INumberBoxProps> {
    render() {
        const { state, dispatch, classes } = this.props;
        return <div className={classes.root}>
            <TextField
                {...state.get("textField").toJS()}
                margin="normal"
                variant="outlined"
                InputProps={{ classes: { root: classes.textFieldRoot } }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { return dispatch(generateAction("PUT_COMMON_NUMBERBOX_CHANGE", state.get("path"), { value: e.target.value })); }}
            />
            <Slider
                step={1}
                marks
                min={5}
                max={100}
                valueLabelDisplay="auto"
                onChange={(e, value) => { return dispatch(generateAction("PUT_COMMON_NUMBERBOX_CHANGE", state.get("path"), { value: value.toString() })); }}
            />
        </div>;
    }
}

export default withStyles(style)(NumberBox);