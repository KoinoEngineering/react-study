import { Button, makeStyles } from "@material-ui/core";
import { RecordOf } from "immutable";
import React from "react";
import { Dispatch } from "redux";
import { IAction } from "../../action";
import { UnitAction } from "../../action/BubblingInRedux/UnitAction";
import { UnitPayload } from "../../reducer/BubblingInRedux/UnitReducer";
import { IUnitState, UnitState } from "../../state/BubblingInRedux/Unit";

interface IUnitProps {
    state: RecordOf<IUnitState>
    dispatch: Dispatch<IAction<UnitPayload>>
}

const useStyles = makeStyles({
    children: {
        paddingLeft: 10,
        paddingTop: 10,
    },
    root: {
        border: "solid black 1px",
    },
    textLeft: {
        textAlign: "left"
    },
});

export const Unit: React.FC<IUnitProps> = (props: IUnitProps) => {

    const classes = useStyles();

    const onChangeHandlerFactory = (dispatch: IUnitProps["dispatch"], state: IUnitProps["state"]) => {
        return () => {
            dispatch({
                payload: {
                    event: "change",
                    path: state.path,
                },
                type: UnitAction.UNIT_INCREMENT_EVENT_COUNT,
            });
        };
    };

    const onTextChangeHandlerFactory = (dispatch: IUnitProps["dispatch"], state: IUnitProps["state"]) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({
                payload: {
                    path: state.path,
                    text: e.currentTarget.value,
                },
                type: UnitAction.UNIT_CHANGE_TEXT,
            });
        };
    };

    const onClickHandlerFactory = (dispatch: IUnitProps["dispatch"], state: IUnitProps["state"]) => {
        return () => {
            dispatch({
                payload: {
                    event: "click",
                    path: state.path,
                },
                type: UnitAction.UNIT_INCREMENT_EVENT_COUNT,
            });
        };
    };
    const onDuplicateHandlerFactory = (dispatch: IUnitProps["dispatch"], state: IUnitProps["state"]) => {
        return () => {
            dispatch({
                payload: {
                    path: state.path,
                },
                type: UnitAction.UNIT_APPEND_CHILD,
            });
        };
    };
    const onAppendChildHandlerFactory = (dispatch: IUnitProps["dispatch"], state: IUnitProps["state"]) => {
        return () => {
            dispatch({
                payload: {
                    path: state.path,
                },
                type: UnitAction.UNIT_CREATE_CHILDREN,
            });
        };
    };
    return <div className={classes.root} onClick={onClickHandlerFactory(props.dispatch, props.state)} onChange={onChangeHandlerFactory(props.dispatch, props.state)}>
        <div className={classes.textLeft}>Change:{props.state.change} Click:{props.state.click}</div>
        <div className={classes.textLeft}>Text:<input type="text" value={props.state.text} onChange={onTextChangeHandlerFactory(props.dispatch, props.state)} /></div>
        <div className={classes.children}>
            {
                props.state.children
                    ? props.state.children.map((child: UnitState, idx: number) => {
                        return <div key={child.path.toJS().join(",") + "," + idx}>
                            <Unit state={child} dispatch={props.dispatch} />
                        </div>;
                    }).push(<div key="CreateChild">
                        <Button onClick={onDuplicateHandlerFactory(props.dispatch, props.state)} >子を増やす</Button>
                    </div>)
                    : <div>
                        <Button onClick={onAppendChildHandlerFactory(props.dispatch, props.state)} >子を作る</Button>
                    </div>
            }
        </div>
    </div>;
};