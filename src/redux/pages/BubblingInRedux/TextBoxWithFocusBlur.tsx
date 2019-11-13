import { Dispatchable } from "../../interfaces/Dispatchable";
import React from "react";
import { TextField } from "@material-ui/core";
import { CreateFireEvent } from "../../action";
import { IBubblingInRedux } from "../../state/BubblingInRedux";

export interface TextBoxWithFocusBlurProps extends Dispatchable {
    activeElementId?: IBubblingInRedux["activeElementId"]
    id: string;
}

export class TextBoxWithFocusBlur extends React.Component<TextBoxWithFocusBlurProps, never>{

    public shouldComponentUpdate(nextProps: TextBoxWithFocusBlurProps) {
        return this.props.activeElementId !== nextProps.activeElementId;
    }

    public render() {
        const {
            dispatch,
            id
        } = this.props;

        return <div>
            <TextField variant="outlined" id={id} onClick={CreateFireEvent(dispatch, id)} onBlur={CreateFireEvent(dispatch, id)} />
        </div>;
    }
}