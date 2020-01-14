import React, { useState, useEffect } from "react";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { Transition } from "react-transition-group";
import { DELAY } from "../../../Hanoi";
import { TransitionStatus } from "react-transition-group/Transition";

interface IPlateProps {
    max: number;
    size: number;
}

const createStyle = (rate: number, timeout: number): CSSProperties => {
    console.log(rate);
    return {
        backgroundColor: "hsl(" + rate * 360 + ",75%,75%)",
        border: "solid black 1px",
        margin: "0px auto",
        textAlign: "center",
        transitionDuration: timeout + "ms",
        transitionProperty: "all",
        width: 0,
    };
};

type TransitionStyle = Partial<{ [K in TransitionStatus]: CSSProperties }>;

const transitionStyle = (rate: number): TransitionStyle => {
    return {
        entered: {
            width: (rate * 100) + "%",
        },
        exited: {
            width: 0
        }
    };
};

const Plate: React.FC<IPlateProps> = (props: IPlateProps) => {
    const {
        max,
        size
    } = props;
    const rate = size / max;

    const [inState, inDispatch] = useState<boolean>(false);
    useEffect(() => {
        if (!inState) {
            inDispatch(true);
        }
    }, [inState, inDispatch]);
    return <Transition
        appear={true}
        enter={false}
        exit={false}
        in={inState}
        timeout={DELAY}
    >
        {(state) => {
            return <div style={{
                ...createStyle(rate, DELAY),
                ...transitionStyle(rate)[state]
            }}>{size || "　"}</div>;
        }}
    </Transition >;
};

export default Plate;