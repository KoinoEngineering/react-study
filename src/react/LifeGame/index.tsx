import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { DISPATCHABLE } from "../../core/Interfaces/Dispatchable";
import NumberBox from "../common/NumberBox/NumberBox";
import { Field } from "./parts/Field/Field";

const createStyle = makeStyles({
    root: {
        width: "100%"
    }
});

const LifeGame: React.FC = () => {
    const classes = createStyle();
    const width = useState("10");
    const height = useState("10");
    const delay = useState("1");
    const [started, setStarted] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>();
    const fieldState = useState<boolean[][]>(
        Array<boolean[]>(Number(height[DISPATCHABLE.VALUE]))
            .fill([])
            .map(() => {
                return Array<boolean>(Number(width[DISPATCHABLE.VALUE]))
                    .fill(false);
            }));

    const handleStartClick = () => {
        if (!started) {
            setStarted(true);
        }
    };

    const handleStopClick = () => {
        if (started) {
            setStarted(false);
        }
    };

    const nextAlive = (cell: boolean, neighborAlive: number): boolean => {
        if (cell) {
            if (neighborAlive <= 1) {
                return false;
            } else if (neighborAlive === 2 || neighborAlive === 3) {
                return cell;
            } else {
                return false;
            }
        } else {
            if (neighborAlive === 3) {
                return true;
            }
        }
        return cell;
    };

    // startedとfieldを監視して世代を進めるeffect
    const fieldStateValue = fieldState[DISPATCHABLE.VALUE];
    const fieldStateDispatcher = fieldState[DISPATCHABLE.DISPATCHER];
    useEffect(() => {
        if (started) {
            if (timeoutId) {
                clearTimeout(timeoutId);
                setTimeoutId(undefined);
            }
            setTimeoutId(setTimeout(() => {
                fieldStateDispatcher(fieldStateValue.map((row, idxY) => {
                    return row.map((cell, idxX) => {
                        const fieldHeight = fieldStateValue.length;
                        const fieldWidth = fieldStateValue[idxY].length;
                        const heightDiff = [fieldHeight - 1, 0, 1];
                        const widthDiff = [fieldWidth - 1, 0, 1];
                        let neighborAliveCount = 0;
                        for (let y = 0; y < 3; y++) {
                            for (let x = 0; x < 3; x++) {
                                if ((x !== 1 ||
                                    y !== 1) &&
                                    fieldStateValue[(idxY + heightDiff[y]) % fieldHeight][(idxX + widthDiff[x]) % fieldWidth]) {
                                    neighborAliveCount++;
                                }
                            }
                        }
                        return nextAlive(cell, neighborAliveCount);
                    });
                }));
            }, Number(delay[DISPATCHABLE.VALUE]) * 1000));
        }
    }, [started, fieldStateValue, fieldStateDispatcher]);
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
            <div>
                <NumberBox state={width} label="幅" />
                <NumberBox state={height} label="高さ" />
                <NumberBox state={delay} label="間隔(s)" min={0} max={10} />
            </div>
            <div>
                <Button onClick={handleStartClick}>start</Button>
                <Button onClick={handleStopClick}>stop</Button>
            </div>
        </div>
        <div id="fieldArea">
            <Field fieldState={fieldState} />
        </div>
    </div>;
};
export default LifeGame;
