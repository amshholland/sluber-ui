import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';
import PageTemplate from './containers/PageTemplate';
import PostRide from './components/PostRide';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Toolbar, AppBar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow:1,
        },
        title: {
            flexGrow: 1,
        },
      }));

function App() {
        const classes = useStyles();
  return (
    <div className='App'>
    <AppBar position='static'>
                       <Toolbar>
                          <Typography variant='h6' className={classes.title}>
                            Sluber
                          </Typography>
                       </Toolbar>
                    </AppBar>
      <Router>
        <Switch>
            <Route path="/PostRide">
      <PostRide />
      </Route>
            <Route path="/">
            <PageTemplate></PageTemplate>
      </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
