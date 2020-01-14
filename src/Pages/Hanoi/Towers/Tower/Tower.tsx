import ClassNames from "classnames";
import { List } from "immutable";
import React from "react";
import { TransitionGroup } from "react-transition-group";
import { useDisplay, useWidth } from "../../../../common/Styles/Styles";
import { ITowers } from "../Towers";
import Plate from "./Plate/Plate";

interface ITowerProps {
    tower: List<number>;
    class: number;
    name: keyof ITowers;
}

interface PlateStyleProps {
    rate: number,
    timeout: number
}

const Tower: React.FC<ITowerProps> = (props: ITowerProps) => {
    const displayStyles = useDisplay();
    const widthStyles = useWidth();
    return <div className={ClassNames(displayStyles.inlineBlock, widthStyles.p30)}>
        <TransitionGroup>
            {
                List(new Array<number>(props.class - props.tower.size)
                    .fill(0))
                    .concat(props.tower)
                    .map((value, idx) => {
                        return <Plate key={props.name + "_" + idx} size={value} max={props.class} />;
                    })}
        </TransitionGroup>
    </div>;
};
export default Tower;