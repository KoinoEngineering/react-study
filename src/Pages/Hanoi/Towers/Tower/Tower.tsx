import ClassNames from "classnames";
import { List } from "immutable";
import React from "react";
import { TransitionGroup } from "react-transition-group";
import { useDisplay, useWidth } from "../../../../common/Styles/Styles";
import { ITowers } from "../Towers";
import Plate from "./Plate/Plate";
import { makeStyles } from "@material-ui/core";

interface ITowerProps {
    series: number;
    delay: number
    name: keyof ITowers;
    tower: List<number>;
}

const useTowerStyle = makeStyles({
    root: {
        borderBottom: "solid black 1px"
    }
});

const Tower: React.FC<ITowerProps> = (props: ITowerProps) => {
    const {
        series,
        delay,
        name,
        tower
    } = props;
    const displayStyles = useDisplay();
    const widthStyles = useWidth();
    const towerStyle = useTowerStyle();
    return <div className={ClassNames(displayStyles.inlineBlock, widthStyles.p30)}>
        <div className={towerStyle.root}>
            <TransitionGroup>
                {
                    List(new Array<number>(series - tower.size)
                        .fill(0))
                        .concat(tower)
                        .map((value, idx) => {
                            return <Plate key={name + "_" + idx} size={value} max={series} timeout={delay} in={true} />;
                        })}
            </TransitionGroup>
        </div>
        <div>
            {name}
        </div>
    </div>;
};
export default Tower;