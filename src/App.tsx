import React from "react";
import logo from "./logo.svg";
import { makeStyles } from "@material-ui/core";

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
        <div className={classes.App}>
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
    );
};

export default App;
