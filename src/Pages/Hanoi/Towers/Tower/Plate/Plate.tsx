import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { Transition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";

interface IPlateProps {
    in: boolean;
    max: number;
    size: number;
    timeout: number;
}

const createStyle = (rate: number, timeout: number): CSSProperties => {
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
            width: 0,
        },
    };
};

const Plate: React.FC<IPlateProps> = (props: IPlateProps) => {
    const {
        max,
        size,
        timeout,
    } = props;
    const rate = size / max;

    return <Transition
        appear={true}
        enter={false}
        exit={false}
        in={props.in}
        timeout={timeout}
        unmountOnExit={true}
        mountOnEnter={true}
    >
        {(state) => {
            return <div style={{
                ...createStyle(rate, timeout),
                ...transitionStyle(rate)[state]
            }}>{size || "　"}</div>;
        }}
    </Transition >;
};

export default Plate;