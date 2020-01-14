import ClassNames from "classnames";
import { List } from "immutable";
import React from "react";
import { useDisplay, useWidth } from "../../../../common/Styles/Styles";
import Plate from "./Plate/Plate";

interface ITowerProps {
    tower: List<number>;
    class: number;
}

const Tower: React.FC<ITowerProps> = (props: ITowerProps) => {
    const displayStyles = useDisplay();
    const widthStyles = useWidth();
    return <div className={ClassNames(displayStyles.inlineBlock, widthStyles.p30)}>
        {
            List(new Array<number>(props.class - props.tower.size)
                .fill(0))
                .concat(props.tower)
                .map((value, idx) => {
                    return <Plate key={"plate_" + (value || value + "_" + idx)} size={value} />;
                })}
    </div>;
};
export default Tower;