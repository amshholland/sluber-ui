import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        width: "100%",
        marginTop: "2em",
        position: "fixed",
        bottom: 0,
        right: 0,

    },
});


function BottomNavBar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            classes={{ root: classes.root }}
        >
            <BottomNavigationAction
                label="Find Ride"
                icon={<DirectionsCarIcon />}
                component={Link}
                to={'/FindRidePage'}
            />
            <BottomNavigationAction
                label="Post Ride"
                icon={<PostAddIcon />}
                component={Link}
                to={'/PostRide'}
            />
            <BottomNavigationAction
                label="Account"
                icon={<PersonIcon />}
            />
        </BottomNavigation>
    );
}

export default BottomNavBar;
