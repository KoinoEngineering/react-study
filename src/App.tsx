import { makeStyles, MuiThemeProvider } from "@material-ui/core";
import React from "react";
import Theme from "./core/Theme";
import logo from "./logo.svg";
import LifeGame from "./react/LifeGame";

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

const App: React.FC = () => {

    const classes = useStyles();

    return (
        <MuiThemeProvider theme={Theme}>
            <div className={classes.App}>
                <LifeGame />
                <header className={classes.AppHeader}>
                    <img src={logo} className={classes.Applogo} alt="logo" />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
        </p>
                    <a
                        className={classes.AppLink}
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
        </a>
                </header>
            </div>
        </MuiThemeProvider>
    );
};

export default App;
