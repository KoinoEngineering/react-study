import { AppBar, createStyles, Toolbar, withStyles, Typography, IconButton } from "@material-ui/core";
import React from "react";
import GitHubMarkLight from "../../img/common/GitHubMarkLight.png";
import Logo from "../../img/common/Logo.svg";
import packageJson from "../../../package.json";

export const HEADER_HIGHT = 64;
const styles = createStyles({
    iconArea: {
        position: "absolute",
        right: 0
    },
    root: {
        position: "relative"
    },
    toolBarClasses: {
        regular: {
            height: HEADER_HIGHT
        },
    },
});

class CommonHeader extends React.PureComponent<any, never>{
    public render() {
        const { classes } = this.props;
        return <AppBar className={classes.root}>
            <Toolbar id="CommonHeaderToolBar" classes={classes.toolBarClasses} >
                <span id="titleArea">
                    <Typography variant="h5">{packageJson.name}</Typography>
                </span>
                <span id="iconArea" className={classes.iconArea}>
                    <IconButton href={packageJson.repository.url}>
                        <img src={GitHubMarkLight} height={HEADER_HIGHT / 2} alt="view on Github" />
                    </IconButton>
                    <IconButton href={packageJson.author.url}>
                        <img src={Logo} height={HEADER_HIGHT / 2} alt="go to HomePage" />
                    </IconButton>
                </span>
            </Toolbar>
        </AppBar>;
    }
}

export default withStyles(styles)(CommonHeader);