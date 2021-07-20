import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import React from "react";
import {Link} from "react-router-dom";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#ffffff'
        }
    }
});

const useStyles = makeStyles({
    root: {
        '& .MuiTab-root:hover': {
            backgroundColor: '#ffffff17',
        }
    }
});

function TabNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <MuiThemeProvider theme={theme}>
            <Tabs
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                aria-label='Main Navigation'
                classes={{ root: classes.root }}
                indicatorColor='secondary'
                showLabels
                centered
            >
                <Tab label='Find Ride' component={Link} to={'/FindRidePage'}/>
                <Tab label='Post Ride' component={Link} to={'/PostRide'}/>
                <Tab label='Account' />
            </Tabs>
        </MuiThemeProvider>
    );
}

export default TabNavigation;