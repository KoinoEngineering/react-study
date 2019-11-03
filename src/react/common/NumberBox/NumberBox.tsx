import { Slider, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { isArray } from "util";
import { DISPATCHABLE, IDispatchable } from "../../../core/Interfaces/Dispatchable";

const createStyles = makeStyles({
    root: {
        display: "inline-block"
    },
    textFieldRoot: {
        paddingBottom: 0,
        paddingTop: 0,
    }
});

type INumberBoxState = IDispatchable<string>

interface INumberBoxProps {
    state: INumberBoxState;
}

const NumberBox: React.FC<INumberBoxProps> = (props: INumberBoxProps) => {
    const classes = createStyles();

    const handleChangeTextFieldFactory = (dispatcher: INumberBoxState["1"]): React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> => {
        return (e) => {
            if (!isNaN(Number(e.target.value))) {
                // 先頭の０の繰り返しは外す
                dispatcher(e.target.value.replace(/^0+/, "0"));
            }
        };
    };
    const handleChangeSliderFactory = (dispatcher: INumberBoxState["1"]): ((event: React.ChangeEvent<{}>, value: number | number[]) => void) => {
        return (e, value) => {
            !isArray(value) && dispatcher(value.toString());
        };
    };
    return <div className={classes.root}>
        <TextField
            value={props.state[DISPATCHABLE.VALUE]}
            margin="normal"
            variant="outlined"
            InputProps={{
                classes: { root: classes.textFieldRoot }
            }}
            onChange={handleChangeTextFieldFactory(props.state[DISPATCHABLE.DISPATCHER])}
        />
        <Slider
            value={parseInt(props.state[DISPATCHABLE.VALUE])}
            step={1}
            marks
            min={0}
            max={100}
            valueLabelDisplay="auto"
            onChange={handleChangeSliderFactory(props.state[DISPATCHABLE.DISPATCHER])}
        />
    </div>;
};
export default NumberBox;