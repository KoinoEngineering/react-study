import React from "react";
import { Link } from "react-router-dom";

export default class Navigation extends React.Component<{}, never> {
    public render() {
        return (<nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
        </nav>
        );
    }
}