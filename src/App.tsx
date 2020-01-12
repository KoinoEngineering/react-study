import { makeStyles, MuiThemeProvider } from "@material-ui/core";
import { RecordOf } from "immutable";
import React, { useState } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { childDispatcherFactory, childDispatcherResetFactory } from "./common/Dispatch";
import Theme from "./core/Theme";
import Hanoi, { IHanoiState, initHanoiState } from "./Pages/Hanoi/Hanoi";
import { RecursiveDispatching } from "./Pages/RecursiveDispatching/RecursiveDispatching";
import StudyReactTransitionGroup, { IStudyReactTransitionGroupState } from "./Pages/StudyReactTransitionGroup/StudyReactTransitionGroup";
import LifeGame from "./react/LifeGame";
import { UseMemoTest } from "./react/UseMemoTest/UseMemoTest";
import { Dispatchable } from "./redux/interfaces/Dispatchable";
import BubblingInRedux from "./redux/pages/BubblingInRedux";
import RecursiveCombinedReducer from "./redux/pages/RecursiveCombinedReducer/RecursiveCombinedReducer";
import { IState } from "./redux/state";

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

interface IAppState {
    hanoi: IHanoiState;
    studyReactTransitionGroup: IStudyReactTransitionGroupState;
}

export interface IAppProps extends Dispatchable {
    state: RecordOf<IState>;
}

const App: React.FC<IAppProps> = (props: IAppProps) => {

    const classes = useStyles();

    const [state, dispatch] = useState<IAppState>({
        hanoi: initHanoiState(),
        studyReactTransitionGroup: {
            studyTransition: {
                transitionTest: {
                    transitionProps: {
                        appear: true,
                        enter: true,
                        exit: true,
                        in: true,
                        mountOnEnter: false,
                        timeout: 1000,
                        unmountOnExit: false,
                    },
                    transitionSettings: {
                        transitionDuration: 1000,
                        transitionProperty: "all",
                        transitionTimingFunction: "ease",
                    },
                }
            }
        }
    });

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
                            <li><Link to='/RecursiveCombinedReducer'>RecursiveCombinedReducer</Link></li>
                            <li><Link to='/RecursiveDispatching'>RecursiveDispatching</Link></li>
                            <li><Link to='/StudyReactTransitionGroup'>StudyReactTransitionGroup</Link></li>
                            <li><Link to='/Hanoi'>Hanoi</Link></li>
                        </ul>
                        <hr />
                        <Route exact path='/' />
                        <Route path='/LifeGame' component={LifeGame} />
                        <Route path='/UseMemoTest' component={UseMemoTest} />
                        <Route path='/BubblingInRedux' render={() => { return <BubblingInRedux state={props.state.get("bubblingInRedux")} dispatch={props.dispatch} />; }} />
                        <Route path='/RecursiveCombinedReducer' render={() => {
                            return <RecursiveCombinedReducer simpleCombine={{
                                childA: {
                                    grandChildA: {
                                        numberA: { label: "childA,grandChildA,numberA" },
                                        numberB: { label: "childA,grandChildA,numberB" },
                                    },
                                    grandChildB: {
                                        numberA: { label: "childA,grandChildB,numberA" },
                                        numberB: { label: "childA,grandChildB,numberB" },
                                    },
                                },
                                childB: {
                                    grandChildA: {
                                        numberA: { label: "childB,grandChildA,numberA" },
                                        numberB: { label: "childB,grandChildA,numberB" },
                                    },
                                    grandChildB: {
                                        numberA: { label: "childB,grandChildB,numberA" },
                                        numberB: { label: "childB,grandChildB,numberB" },
                                    },
                                },
                            }} />;
                        }} />
                        <Route path='/RecursiveDispatching' component={RecursiveDispatching} />
                        <Route path='/StudyReactTransitionGroup' render={() => {
                            return <StudyReactTransitionGroup
                                state={state.studyReactTransitionGroup}
                                dispatch={childDispatcherFactory(dispatch, state, "studyReactTransitionGroup")} />;
                        }} />
                        <Route path='/Hanoi' render={() => {
                            return <Hanoi
                                state={state.hanoi}
                                dispatch={childDispatcherResetFactory(dispatch, state, "hanoi")} />;
                        }} />
                    </div>
                </BrowserRouter>
            </div>
        </MuiThemeProvider>
    );
};

export default App;
