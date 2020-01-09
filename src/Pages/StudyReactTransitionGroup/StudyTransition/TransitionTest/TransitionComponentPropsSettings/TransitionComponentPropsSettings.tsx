import { Checkbox, FormControlLabel } from "@material-ui/core";
import ClassNames from "classnames";
import React from "react";
import { TransitionProps } from "react-transition-group/Transition";
import { useWidth } from "../../../../../common/Styles/Styles";
import MyDispatch from "../../../../../core/Interfaces/MyDispatch";
import NumberBox from "../../../../../react/common/NumberBox/NumberBox";

interface ITransitionComponentPropsSettingsProps {
    state: TransitionProps;
    dispatch: MyDispatch<TransitionProps>["Set"]
}

const TransitionComponentPropsSettings: React.FC<ITransitionComponentPropsSettingsProps> = (props: ITransitionComponentPropsSettingsProps) => {

    const checkboxClickHandlerFactory = <K extends keyof TransitionProps>(key: K) => {
        return () => {
            props.dispatch({
                ...props.state,
                [key]: !props.state[key]
            });
        };
    };

    const timeoutDispatcher = (value: string) => {
        props.dispatch({
            ...props.state,
            timeout: Number(value),
        });
    };

    const WidthStyles = useWidth();

    return <div>
        <h2>
            Transition Component Props
                </h2>
        <div>
            Transitionコンポーネントのprops設定
                </div>
        <div className={ClassNames(WidthStyles.p100)} style={{ borderColor: "black", borderStyle: "solid", borderWidth: 1 }}>
            <FormControlLabel
                control={<Checkbox
                    color={"primary"}
                    checked={props.state.appear}
                    onClick={checkboxClickHandlerFactory("appear")} />}
                label="appear"
            />
            <div style={{ paddingLeft: "2rem" }}>
                <small>通常初回のマウント時にはエフェクトはかからない。<code>appear</code>を<code>true</code>にするとマウント時にもエフェクトがかかるようになる</small>
            </div>
        </div>
        <div className={ClassNames(WidthStyles.p100)} style={{ borderColor: "black", borderStyle: "solid", borderWidth: 1 }}>
            <FormControlLabel
                control={<Checkbox
                    color={"primary"}
                    checked={props.state.enter}
                    onClick={checkboxClickHandlerFactory("enter")} />}
                label="enter"
            />
            <div style={{ paddingLeft: "2rem" }}>
                <small>
                    <code>in</code>を<code>true</code>にした場合の動作を変更する<br />
                    <ul>
                        <li>
                            <code>true</code>の場合：exited -&gt; entering -&gt; entered<br />
                        </li>
                        <li>
                            <code>false</code>の場合：exited -&gt; entered
                                </li>
                    </ul>
                </small>
            </div>
        </div>
        <div className={ClassNames(WidthStyles.p100)} style={{ borderColor: "black", borderStyle: "solid", borderWidth: 1 }}>
            <FormControlLabel
                control={<Checkbox
                    color={"primary"}
                    checked={props.state.exit}
                    onClick={checkboxClickHandlerFactory("exit")} />}
                label="exit"
            />
            <div style={{ paddingLeft: "2rem" }}>
                <small>
                    <code>in</code>を<code>false</code>にした場合の動作を変更する<br />
                    <ul>
                        <li>
                            <code>true</code>の場合：entered -&gt; exiting -&gt; exited<br />
                        </li>
                        <li>
                            <code>false</code>の場合：entered -&gt; exited
                                </li>
                    </ul>
                </small>
            </div>
        </div>
        <div className={ClassNames(WidthStyles.p100)} style={{ borderColor: "black", borderStyle: "solid", borderWidth: 1 }}>
            <FormControlLabel
                control={<Checkbox
                    color={"primary"}
                    checked={props.state.mountOnEnter}
                    onClick={checkboxClickHandlerFactory("mountOnEnter")} />}
                label="mountOnEnter"
            />
            <div style={{ paddingLeft: "2rem" }}>
                <small>
                    通常マウント時に子コンポーネントもマウントされるが、<br />
                    <code>true</code>を設定すると、初回の<code>in</code>を<code>true</code>にしたときにマウントされる<br />
                    <code>unmountOnExit</code>を設定しなければその後はマウントされ続ける</small>
            </div>
        </div>
        <div className={ClassNames(WidthStyles.p100)} style={{ borderColor: "black", borderStyle: "solid", borderWidth: 1 }}>
            <FormControlLabel
                control={<Checkbox
                    color={"primary"}
                    checked={props.state.unmountOnExit}
                    onClick={checkboxClickHandlerFactory("unmountOnExit")} />}
                label="unmountOnExit"
            />
            <div style={{ paddingLeft: "2rem" }}>
                <small><code>true</code>を設定すると状態が<code>exited</code>になったときにアンマウントされる</small>
            </div>
        </div>
        <div className={ClassNames(WidthStyles.p100)} style={{ borderColor: "black", borderStyle: "solid", borderWidth: 1 }}>
            <NumberBox
                state={props.state.timeout.toString()}
                dispatch={timeoutDispatcher}
                max={2000}
                label="timeout(ms)"
                slider={{
                    step: 50
                }} />
            <div style={{ paddingLeft: "2rem" }}>
                <small>次の状態までの<code>timeout(ms)</code></small>
            </div>
        </div>
    </div>;
};

export default TransitionComponentPropsSettings;