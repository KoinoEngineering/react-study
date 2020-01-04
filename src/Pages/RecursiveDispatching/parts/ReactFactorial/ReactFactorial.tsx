import React from "react";
import { FactorialState, Factorial } from "../common/Factorial/Factorial";

interface ReactFactorialState {
    factorial: FactorialState;
}

type ReactFactorialProps = {}

export class ReactFactorial extends React.PureComponent<ReactFactorialProps, ReactFactorialState>{
    constructor(props: ReactFactorialProps) {
        super(props);
        this.state = {
            factorial: {
                ans: 1,
                max: 0,
            }
        };
    }

    private setFactorial = (factorial: FactorialState) => {
        return this.setState({
            ...this.state,
            factorial
        });
    }

    public render() {
        const {
            state: reactState,
            setFactorial
        } = this;
        return <div>
            <div className="ReactArea">
                <Factorial state={reactState.factorial} dispatch={setFactorial} />
            </div>
        </div>;
    }
}