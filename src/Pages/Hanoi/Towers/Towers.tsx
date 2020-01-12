import { List, Record, RecordOf } from "immutable";
import React from "react";
import MyDispatch from "../../../core/Interfaces/MyDispatch";

export type ITowersState = RecordOf<ITowers>;
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

interface ITowersProps {
    state: ITowersState;
    dispatch: MyDispatch<ITowersState>["Reset"];
}

const Towers: React.FC<ITowersProps> = (props: ITowersProps) => {
    return <div>{JSON.stringify(props)}</div>;
};
export default Towers;