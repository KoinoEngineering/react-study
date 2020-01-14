import { makeStyles } from "@material-ui/core";
import { List, Record } from "immutable";
import React from "react";
import { IDispatchable, IPropsBase } from "../../../core/Interfaces/Props";
import Tower from "./Tower/Tower";

export interface ITowers {
    a: List<number>
    b: List<number>
    c: List<number>
}

export class TowersState extends Record<ITowers>({
    a: List<number>(),
    b: List<number>(),
    c: List<number>(),
}) {

    /**
     * 移動させる
     * @param now 現在地
     * @param goto 行き先
     */
    public Move(now: keyof ITowers, goto: keyof ITowers) {
        return this
            .update(goto, (goto) => {
                // 現在地の1つ目の項目を一番上に追加する
                return goto.unshift(this.getIn([now, 0]));
            })
            .update(now, (now) => {
                // 現在地の一つ目を削除する
                return now.shift();
            });
    }
}

interface ITowersProps extends IPropsBase<TowersState>, IDispatchable<TowersState> {
    series: number;
    delay: number
}

const Towers: React.FC<ITowersProps> = (props: ITowersProps) => {

    const {
        delay,
        series,
        state: {
            a,
            b,
            c
        }
    } = props;

    const borderStyle = makeStyles({
        solidBalck1: {
            border: "solid black 1px",
        }
    })();

    return <div className={borderStyle.solidBalck1}>
        <Tower tower={a} series={series} name={"a"} delay={delay} />
        <Tower tower={b} series={series} name={"b"} delay={delay} />
        <Tower tower={c} series={series} name={"c"} delay={delay} />
    </div>;
};


export default Towers;