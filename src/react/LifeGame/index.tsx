import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { DISPATCHABLE } from "../../core/Interfaces/Dispatchable";
import NumberBox from "../common/NumberBox/NumberBox";
import { Field, IFieldState } from "./parts/Field/Field";

const createStyle = makeStyles({
    root: {
        width: "100%"
    }
});

const LifeGame: React.FC = () => {
    const classes = createStyle();
    const width = useState("10");
    const height = useState("10");
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>();
    const fieldState = useState<boolean[][]>(
        Array<boolean[]>(Number(height[DISPATCHABLE.VALUE]))
            .fill([])
            .map(() => {
                return Array<boolean>(Number(width[DISPATCHABLE.VALUE]))
                    .fill(false);
            }));

    const handleStartClick = () => {
        if (!intervalId) {
            setIntervalId(setInterval(() => { updateGeneral(fieldState); }, 1000));
        }
    };

    const handleStopClick = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(undefined);
        }
    };


    const updateGeneral = (fieldState: IFieldState) => { //, heightValue: string, widthValue: string
        const [field, dispatch] = fieldState;
        // const heightDiff = [Number(heightValue) - 1, 0, 1];
        // const widthDiff = [Number(widthValue) - 1, 0, 1];
        dispatch(field.map((row) => {
            return row.map((cell) => {
                return !cell;
            });
        }));
    };
    // テキストボックスの値を監視して走るeffect
    const heightValue = height[DISPATCHABLE.VALUE];
    const widthValue = width[DISPATCHABLE.VALUE];
    const fieldDispather = fieldState[DISPATCHABLE.DISPATCHER];
    useEffect(() => {
        const fieldDispatcher = fieldDispather;
        fieldDispatcher(Array<boolean[]>(Number(heightValue))
            .fill([])
            .map(() => {
                return Array<boolean>(Number(widthValue))
                    .fill(false);
            }));
    }, [heightValue, widthValue, fieldDispather]);
    return <div className={classes.root}>
        <div id="inputArea" >
            <NumberBox state={width} />
            <NumberBox state={height} />
            <Button onClick={handleStartClick}>start</Button>
            <Button onClick={handleStopClick}>stop</Button>
        </div>
        <div id="fieldArea">
            <Field fieldState={fieldState} />
        </div>
    </div>;
};
export default LifeGame;
