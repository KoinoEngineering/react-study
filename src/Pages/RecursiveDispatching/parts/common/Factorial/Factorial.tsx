import React, { ChangeEventHandler, Dispatch, EventHandler, MouseEventHandler } from "react";


/**
 * State Interface
 * カウントアップ式にしたいのでmaxを保持する作りにする
 *
 * @export
 * @interface FactorialState
 */
export interface FactorialState {
    fact: number;
    delay: number;
    ans: number;
}


/**
 * Props Interface
 *
 * @export
 * @interface FactorialProps
 */
export interface FactorialProps {
    state: FactorialState;
    dispatch: Dispatch<FactorialState>;
}

interface FactorialInnerState {
    Enabled: boolean
}

type HandleFactory<H extends EventHandler<any>> = (state: FactorialState, dispatch: Dispatch<FactorialState>) => H;

export class Factorial extends React.PureComponent<FactorialProps, FactorialInnerState>{
    constructor(props: FactorialProps) {
        super(props);
        this.state = {
            Enabled: true
        };
    }

    private handleMaxChange: HandleFactory<ChangeEventHandler<HTMLInputElement>> = (state, dispatch) => {
        return (e) => {
            const tmp = Number(e.currentTarget.value);
            if (isNaN(tmp) || tmp < 0) {
                return;
            }
            dispatch({
                ans: 1,
                delay: tmp === 0 ? 1000 : 1000 / tmp,
                fact: tmp,
            });
            return;
        };
    }
    private handleDelayChange: HandleFactory<ChangeEventHandler<HTMLInputElement>> = (state, dispatch) => {
        return (e) => {
            const tmp = Number(e.currentTarget.value);
            if (isNaN(tmp) || tmp < 0) {
                return;
            }
            dispatch({ ...state, delay: tmp });
            return;
        };
    }

    private handleCalculateClick: HandleFactory<MouseEventHandler<HTMLButtonElement>> = (state, dispatch) => {
        return () => {
            /// ansを1に初期化
            const newState = { ...state, ans: 1 };
            this.setState({ Enabled: false });
            dispatch(newState);
            /// call setFactorial
            this.setFactorial(newState, dispatch);
        };
    }

    private setFactorial = (state: FactorialState, dispatch: Dispatch<FactorialState>, value: number = 1): void => {
        if (value > state.fact) {
            this.setState({ Enabled: true });
            return;
        } else {
            const newState = { ...state, ans: state.ans * value };
            dispatch(newState);
            setTimeout(() => {
                this.setFactorial(newState, dispatch, value + 1);
            }, newState.delay);
        }
    }

    public render() {
        const { state, dispatch } = this.props;
        const innerState = this.state;
        return <div>
            <div className="InputArea">
                <div className="MaxArea" style={{ paddingBottom: "1rem" }}>
                    <span>Fact:</span><span><input disabled={!innerState.Enabled} type="text" value={state.fact} onChange={this.handleMaxChange(state, dispatch)} /></span>
                </div>
                <div className="DelayArea" style={{ paddingBottom: "1rem" }}>
                    <span>Delay:</span><span><input disabled={!innerState.Enabled} type="text" value={state.delay} onChange={this.handleDelayChange(state, dispatch)} /></span>
                </div>
                <div className="ButtonArea" style={{ paddingBottom: "1rem" }}>
                    <button disabled={!innerState.Enabled} onClick={this.handleCalculateClick(state, dispatch)}>calculate</button>
                </div>
            </div>
            <div className="AnsArea" style={{ paddingBottom: "1rem" }}>
                {state.fact > 21 ? "Max is too large" : "Ans:" + state.ans}
            </div>
        </ div>;
    }
}