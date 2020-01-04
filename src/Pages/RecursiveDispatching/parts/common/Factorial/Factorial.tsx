import React, { ChangeEventHandler, Dispatch, EventHandler } from "react";


/**
 * State Interface
 * カウントアップ式にしたいのでmaxを保持する作りにする
 *
 * @export
 * @interface FactorialState
 */
export interface FactorialState {
    max: number;
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

type HandleFactory<H extends EventHandler<any>> = (state: FactorialState, dispatch: Dispatch<FactorialState>) => H;

export class Factorial extends React.PureComponent<FactorialProps, never>{

    private handleInputChange: HandleFactory<ChangeEventHandler<HTMLInputElement>> = (state, dispatch) => {
        return (e) => {
            const tmp = Number(e.currentTarget.value);
            if (isNaN(tmp)) {
                return;
            }
            dispatch({ ...state, max: tmp });
            return;
        };
    }

    public render() {
        const { state, dispatch } = this.props;
        return <div>
            <div className="InputArea">
                <div className="MaxArea">
                    <span>Max:</span><span><input type="text" value={state.max} onChange={this.handleInputChange(state, dispatch)} /></span>
                </div>
                <div className="ButtonArea">
                    <button>calculate</button>
                </div>
            </div>
            <div className="AnsArea">
                {"Ans:" + state.ans}
            </div>
        </div>;
    }
}