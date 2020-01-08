import { Slider, TextField, SliderProps } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { isArray } from "util";
import MyDispatch from "../../../core/Interfaces/MyDispatch";

const createStyles = makeStyles({
    root: {
        display: "inline-block"
    },
    textFieldRoot: {
        paddingBottom: 0,
        paddingTop: 0,
    }
});

export type INumberBoxState = string;

export interface INumberBoxProps {
    state: INumberBoxState;
    dispatch: MyDispatch<string>["Set"];
    min?: number;
    max?: number;
    label?: TextFieldProps["label"];
    slider?: Pick<SliderProps, "step">;
}

const NumberBox: React.FC<INumberBoxProps> = (props: INumberBoxProps) => {
    const [sliderValue, setSlideValue] = useState(parseInt(props.state));
    const classes = createStyles();
    useEffect(() => { setSlideValue(parseInt(props.state)); }, [props.state]);

    const handleChangeTextFieldFactory = (dispatcher: MyDispatch<string>["Set"]): React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> => {
        return (e) => {
            if (!isNaN(Number(e.target.value)) && Number(e.target.value) >= (props.min || 0) && Number(e.target.value) <= (props.max || 100)) {
                // 先頭の０の繰り返しは外す
                dispatcher(e.target.value.replace(/^0+/, "0"));
            }
        };
    };
    const handleChangeSliderFactory = (dispatcher: MyDispatch<string>["Set"]): ((event: React.ChangeEvent<{}>, value: number | number[]) => void) => {
        return (e, value) => {
            !isArray(value) && dispatcher(value.toString());
        };
    };
    return <div className={classes.root}>
        <TextField
            value={props.state}
            margin="normal"
            variant="outlined"
            label={props.label}
            InputProps={{
                classes: { root: classes.textFieldRoot }
            }}
            onChange={handleChangeTextFieldFactory(props.dispatch)}
        />
        <Slider
            value={sliderValue}
            step={1}
            marks
            min={props.min || 0}
            max={props.max || 100}
            {...props.slider}
            valueLabelDisplay="auto"
            onChange={(e, value) => { !isArray(value) && setSlideValue(value); }}
            onChangeCommitted={handleChangeSliderFactory(props.dispatch)}
        />
    </div>;
};
export default NumberBox;