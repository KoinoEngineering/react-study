import React from "react";
import { ReactFactorial } from "./parts/ReactFactorial/ReactFactorial";

export class RecursiveDispatching extends React.PureComponent {
    public render() {
        return <div>
            <div className="ReactArea" style={{ display: "inline-block" }}>
                <ReactFactorial />
            </div>
            <div className="ReduxArea" style={{ display: "inline-block" }}>
                {"Redux Ver Here\nComming Soon ..."}
            </div>
        </div>;
    }
}