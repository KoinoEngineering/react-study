import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useMemo, useState } from "react";

export const UseMemoTest: React.FC = () => {
    const [y, setY] = useState(0);
    const [x, setX] = useState(0);

    const rootInlineBlock = makeStyles({
        root: {
            display: "inline-block",
        }
    })();

    const incrementY = () => {
        setY((value) => { return ++value; });
    };

    const decrementY = () => {
        setY((value) => { return --value; });
    };

    const incrementX = () => {
        setX((value) => { return ++value; });
    };

    const decrementX = () => {
        setX((value) => { return --value; });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const ans = useMemo(() => { return x + y; }, [x]);
    return <div>
        <div>
            <div>
                <Typography classes={rootInlineBlock}>y:</Typography>
                <Typography classes={rootInlineBlock}>{y}</Typography>
            </div>
            <div>
                <Button classes={rootInlineBlock} onClick={incrementY} variant="outlined">increment</Button>
                <Button classes={rootInlineBlock} onClick={decrementY} variant="outlined">decrement</Button>
            </div>
        </div>
        <div>
            <div>
                <Typography classes={rootInlineBlock}>x:</Typography>
                <Typography classes={rootInlineBlock}>{x}</Typography>
            </div>
            <div>
                <Button classes={rootInlineBlock} onClick={incrementX} variant="outlined">increment</Button>
                <Button classes={rootInlineBlock} onClick={decrementX} variant="outlined">decrement</Button>
            </div>
        </div>
        <div>
            <Typography classes={rootInlineBlock} >ans:</Typography>
            <Typography classes={rootInlineBlock}>{ans}</Typography>
        </div>
    </div>;
};