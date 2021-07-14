import React, { Component, useState } from 'react';
import '../styles/menuStyles.css';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Map from './Map';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '& .MuiInput-root:before': {
      transition: 'none',
      borderBottom: '2px solid #ddd',
    },

    '& .MuiInput-root:after': {
      transition: 'none',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid #3f51b5',
    },
  },
});

const TopMenu = ({ value, handleChange }) => {
  const classes = useStyles();
  const [isPostRideOpen, setIsPostRideOpen] = useState(false);
  const [employee, setEmployee] = useState('driver');
  const [tripValue, setTripValue] = useState({
    tripId: null,
    origin: null,
    destination: null,
    departureTime: null,
    arrivalTime: null,
    seatsAvailable: null,
    comments: null,
    passengers: [
      {
        name: null,
        phoneNumber: null,
      },
    ],
    driver: {
      name: null,
      phoneNumber: null,
    },
    originator: 'DRIVER',
  });

  const handleChangeData = (e) => {
    let temp = tripValue;
    if (e.target.id === 'name' || e.target.id === 'phoneNumber') {
      if (tripValue.originator === 'DRIVER') {
        temp.driver[e.target.id] = e.target.value;
      } else {
        temp.passengers[0][e.target.id] = e.target.value;
      }
    } else if (
      e.target.id === 'departureTime' ||
      e.target.id === 'arrivalTime'
    ) {
      temp[e.target.id] = e.target.value + ':00Z';
    } else {
      temp[e.target.id] = e.target.value;
    }
  };

  const handleChangeEmpl = (e) => {
    let temp = tripValue;
    temp['originator'] = e;
  };

  const handlePostOpen = () => {
    setIsPostRideOpen(true);
  };

  const handlePostClose = (e) => {
    setIsPostRideOpen(false);
    setTripValue({
      origin: null,
      destination: null,
      departureTime: null,
      arrivalTime: null,
      seatsAvailable: null,
      comments: null,
      driver: {
        name: null,
        phoneNumber: null,
      },
      passengers: [
        {
          name: null,
          phoneNumber: null,
        },
      ],
      originator: 'DRIVER',
    });
  };

  const handlePostRide = (value) => {
    axios
      .post(
        process.env.REACT_APP_SLUBER_SERVICE_URL + '/trips',
        this.state.tripValue
      )
      .then((res) => {
        this.props.addToData(this.state.tripValue);
        this.handlePostClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEmployeeChange = (e) => {
    setEmployee(e.target.value);
  };

  return (
    <div className="top-menu-cont">
      <div className="search-cont">
        <TextField
          id="date-search-input"
          type="date"
          className={`search-date ${classes.root}`}
          fullWidth
          disableUnderline={true}
        />
      </div>

      <div className="post-ride-btn-cont">
        <div className="post-ride-btn">
          <Button variant="contained" color="primary" onClick={handlePostOpen}>
            Search
          </Button>
        </div>
      </div>

      <Map />

      <div className="post-ride-btn-cont">
        <div className="post-ride-tog">
          <RadioGroup
            row
            aria-label="usertype"
            name="user1"
            value={value}
            onChange={handleChange}
          >
            <div className="post-ride-cont">
              <FormControlLabel
                value="driver"
                control={<Radio />}
                label="Driver Posts"
              />
            </div>
            <div className="post-ride-cont">
              <FormControlLabel
                value="passenger"
                control={<Radio />}
                label="Passenger Posts"
              />
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
