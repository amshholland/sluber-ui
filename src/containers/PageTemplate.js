import React from 'react';
import FindRidePage from './FindRidePage';
import PostRide from "../components/PostRide";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Toolbar, AppBar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BottomNavBar from "../components/BottomNavigation";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import {useMediaQuery} from "@material-ui/core";
import TabNavigation from "../components/TabNavigation";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography component={'span'}>{children}</Typography>
          </Box>
        )}
        <Link to="/postRide"> Go to test comp</Link>
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    container: {
       marginBottom: theme.spacing(14),
    }
  }));

  export default function SimpleTabs() {
      const classes = useStyles();
      const isActive = useMediaQuery("(min-width: 1036px");
  
    return (
      <div className={classes.root}>
        <Router>
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title}>
                        Sluber
                    </Typography>
                </Toolbar>
                {isActive && <TabNavigation />}
            </AppBar>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/FindRidePage" />
                </Route>
                <Route exact path="/FindRidePage">
                    <FindRidePage/>
                </Route>
                <Route exact path="/PostRide">
                    <PostRide/>
                </Route>
                <Route exact path="/Account">
                    Account
                </Route>
            </Switch>
            <Container className={classes.container}>
                <Link to="/FindRidePage"/>
                {!isActive && <BottomNavBar/>}
            </Container>
        </Router>
      </div>
    );
  }