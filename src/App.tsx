import { makeStyles, MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Theme from "./core/Theme";
import LifeGame from "./react/LifeGame";
import { UseMemoTest } from "./react/UseMemoTest/UseMemoTest";
import BubblingInRedux from "./redux/pages/BubblingInRedux";
import { RecordOf } from "immutable";
import { IState } from "./redux/state";
import { Dispatchable } from "./redux/interfaces/Dispatchable";

const useStyles = makeStyles({
    App: {
        textAlign: "center"
    },
    AppHeader: {
        alignItems: "center",
        backgroundColor: "#282c34",
        color: "white",
        display: "flex",
        flexDirection: "column",
        fontSize: "calc(10px + 2vmin)",
        justifyContent: "center",
        minHeight: "100vh",
    },
    AppLink: {
        color: "#09d3ac",
    },
    Applogo: {
        height: "40vmin",
    },
}
);

export interface IAppProps extends Dispatchable {
    state: RecordOf<IState>;
}

const App: React.FC<IAppProps> = (props: IAppProps) => {

    const classes = useStyles();

    return (
        <MuiThemeProvider theme={Theme}>
            <div className={classes.App}>
                <BrowserRouter>
                    <div>
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/LifeGame'>LifeGame</Link></li>
                            <li><Link to='/UseMemoTest'>UseMemoTest</Link></li>
                            <li><Link to='/BubblingInRedux'>BubblingInRedux</Link></li>
                        </ul>
                        <hr />

                        <Route exact path='/' />
                        <Route path='/LifeGame' component={LifeGame} />
                        <Route path='/UseMemoTest' component={UseMemoTest} />
                        <Route path='/BubblingInRedux' render={() => { return <BubblingInRedux state={props.state.get("bubblingInRedux")} dispatch={props.dispatch} />; }} />
                    </div>
                </BrowserRouter>
            </div>
        </MuiThemeProvider>
    );
};

export default App;
