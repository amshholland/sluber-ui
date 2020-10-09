import React from 'react';
import FindRidePage from './FindRidePage'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Toolbar, AppBar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  export default function SimpleTabs() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              Sluber
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <FindRidePage></FindRidePage>
        </Container>
      </div>
    );
  }