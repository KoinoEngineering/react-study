import React from "react";
import { ReactFactorial } from "./parts/ReactFactorial/ReactFactorial";

export class RecursiveDispatching extends React.PureComponent {
    public render() {
        return <div>
            <div className="description" style={{ paddingBottom: "1rem", whiteSpace: "pre-line", width: "100%", }}>
                <div style={{ margin: "0 auto", textAlign: "left", whiteSpace: "pre-line", width: "fit-content", }}>
                    {`Fact : 求める階乗の数(最大21)
                Delay : 計算１回あたりの間隔(ms) , Factを変更すると合計１秒になるように自動で変更される`}
                </div>
            </div>
            <div className="main">
                <div className="ReactArea" style={{ display: "inline-block" }}>
                    <ReactFactorial />
                </div>
                <div className="ReduxArea" style={{ display: "inline-block" }}>
                    {"Redux Ver Here\nComming Soon ..."}
                </div>
            </div>
        </div>;
    }
}