import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import React, { useEffect } from "react";
import {Link, useLocation} from "react-router-dom";
import {createTheme, MuiThemeProvider} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const theme = createTheme({
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
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/FindRidePage':
                setValue(0);
                break;
            case '/PostRide':
                setValue(1);
                break;
            case '/Account':
                setValue(2);
                break;
        }
    }, [location]);


    return (
        <MuiThemeProvider theme={theme}>
            <Tabs
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                aria-label='Main Navigation'
                classes={{ root: classes.root }}
                indicatorColor="secondary"
                centered
            >
                <Tab label='Find Ride' component={Link} to={'/FindRidePage'}/>
                <Tab label='Post Ride' component={Link} to={'/PostRide'}/>
            </Tabs>
        </MuiThemeProvider>
    );
}

export default TabNavigation;