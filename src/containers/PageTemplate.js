import React, { Component, Button } from 'react';
import OfferRidePage from "./OfferRidePage"
import FindRidePage from "./FindRidePage"
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
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
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
  export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Offer A Ride" {...a11yProps(0)} />
            <Tab label="Find a Ride" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <OfferRidePage></OfferRidePage>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <FindRidePage></FindRidePage>
        </TabPanel>
      </div>
    );
  }

// class PageTemplate extends Component {
//     constructor (props) {
//         super(props)
//         this.state = {
//             tab: "Offer"
//         }
//     }

//     onPress = e => {
//         this.setState({tab: e})
//     }

//     render () {
//         let temp;
//         if (this.state.tab == "Offer") {
//             temp = "offer"
//         } else {
//             temp = "Find"
//         }
//         return (
//             <div>
//                 <div onClick={this.onPress.bind(this, "Offer")}>Offer a Ride</div>
//                 <div onClick={this.onPress.bind(this, "Find")}>Find a Ride</div>
//                 {temp}
//             </div>
//           );
//     }
//   }
  
//   export default PageTemplate;