import React from "react";

export default class Static extends React.Component<{}, never>{
    public shouldComponentUpdate() {
        return false;
    }

    public render() {
        return (<div>
            {this.props.children}
        </div>);
    }
}