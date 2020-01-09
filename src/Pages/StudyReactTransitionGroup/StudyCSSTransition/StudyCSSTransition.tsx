import React from "react";
import { useWidth } from "../../../common/Styles/Styles";

const StudyCSSTransition: React.FC = () => {

    const widthStyle = useWidth();

    return <div>
        基本的には<code>Transition</code>コンポーネントと同一<br />
        <code>props</code>に追加されている<code>classNames</code>を指定することによって自動的に指定したクラス名を変更するようになる<br />
        指定のオブジェクトを使用すれば各段階ごとに指定したクラスを適用させることもできる
        <code>classNames</code>に<code>example</code>を指定した場合
        <div className={widthStyle.MaxContent} style={{ margin: "0px auto" }}>
            <ul>
                <li>初回のマウント時 : example-appear -&gt; example-appear-active -&gt; example-appear-done</li>
                <li><code>in</code>を<code>true</code>にしたとき : example-enter -&gt; example-enter-active -&gt; example-enter-done</li>
                <li><code>in</code>を<code>false</code>にしたとき : example-exit -&gt; example-exit-active -&gt; example-exit-done</li>
            </ul>
        </div>
    </div>;
};
export default StudyCSSTransition;