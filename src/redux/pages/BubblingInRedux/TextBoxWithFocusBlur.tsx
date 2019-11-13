import { Dispatchable } from "../../interfaces/Dispatchable";
import React from "react";
import { TextField, Omit, createStyles } from "@material-ui/core";
import { CreateFireEvent } from "../../action";
import { IBubblingInRedux } from "../../state/BubblingInRedux";
import { TextFieldProps } from "@material-ui/core/TextField";
import { WithStyles, withStyles } from "@material-ui/styles";

const styles = createStyles({
    root: {
        padding: 10
    }
});

export interface TextBoxWithFocusBlurProps extends Dispatchable, WithStyles<typeof styles> {
    activeElementId?: IBubblingInRedux["activeElementId"];
    id: string;
    textField?: Partial<Omit<TextFieldProps, "variant" | "onClick" | "onBlur" | "label">>;
}

class TextBoxWithFocusBlur extends React.Component<TextBoxWithFocusBlurProps, never>{

    public shouldComponentUpdate(nextProps: TextBoxWithFocusBlurProps) {
        return this.props.activeElementId !== nextProps.activeElementId;
    }

    public render() {
        const {
            classes,
            dispatch,
            id,
            textField
        } = this.props;

        return <div className={classes.root}>
            <TextField {...textField} variant="outlined" id={id} onClick={CreateFireEvent(dispatch, id)} onBlur={CreateFireEvent(dispatch, id)} label={id} />
        </div>;
    }
}

export default withStyles(styles)(TextBoxWithFocusBlur);