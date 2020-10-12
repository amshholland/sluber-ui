import React, { Component } from 'react';
import '../styles/menuStyles.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { Dialog, DialogActions } from '@material-ui/core';
import PostRide from './PostRide'
import axios from 'axios'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class TopMenu extends Component {
  constructor(props) {
    super(props);
    this.handlePostOpen = this.handlePostOpen.bind(this);
    this.handlePostClose = this.handlePostClose.bind(this);
    this.handlePostRide = this.handlePostRide.bind(this)
    this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
    this.state = {
      isPostRideOpen: false,
      employee: 'driver',
      tripValue: {
        tripId: null,
        origin: null,
        destination: null,
        departureTime: null,
        arrivalTime: null,
        seatsAvailable: null,
        comments: null,
        passengers: [{
          name: null,
          phoneNumber: null,
        }],
        driver: {
          name: null,
          phoneNumber: null,
        },
        originator: 'DRIVER'
      }
    }
  }

  handleChangeData = e => {
    console.log(this.state.tripValue, e.target.name)
    let temp = this.state.tripValue
    if (e.target.id === 'name' || e.target.id === 'phoneNumber') {
      if (this.state.tripValue.originator === 'DRIVER') {
        temp.driver[e.target.id] = e.target.value
      } else {
        temp.passengers[0][e.target.id] = e.target.value
      }
    } else if (e.target.id === 'departureTime' || e.target.id === 'arrivalTime') {
      temp[e.target.id] = e.target.value + ':00Z'
    } else {
      temp[e.target.id] = e.target.value
    }
    console.log(this.state.tripValue)
  }

  handleChangeEmpl = e => {
    let temp = this.state.tripValue
    temp['originator'] = e
  }

  handlePostOpen() {
    this.setState({
      isPostRideOpen: true
    })
  }

  handlePostClose = e => {
    this.setState({
      isPostRideOpen: false,
      tripValue: {
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
        originator: 'DRIVER'
      }
    })
  }

  handlePostRide(value) {
    axios.post(process.env.REACT_APP_SLUBER_SERVICE_URL + '/trips', this.state.tripValue)
    .then(res => {
        this.props.addToData(this.state.tripValue)
        this.handlePostClose()
    })
    .catch(err => {
        console.log(err)
    })
}

  handleEmployeeChange(event) {
    this.setState({
      employee: event.target.value
    })
  }

  render() {
    return (
      <div className='top-menu-cont'>
        <div className='search-cont'>
          <form className='departure-search-cont' noValidate autoComplete='off'>
            <TextField 
              id='departure-search-input' 
              label='Departure'
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </form>
          <form className='destination-search-cont' noValidate autoComplete='off'> 
            <TextField 
              id='destination-search-input' 
              label='Destination'
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </form>
          <form className='date-search-cont' noValidate autoComplete='off'>
            <TextField id='date-search-input' label='Date' type='date' InputLabelProps={{shrink: true }}/>
          </form>
        </div>
      <div className='post-ride-btn-cont'>
          <div className='post-ride-tog'>
            <RadioGroup row aria-label='usertype' name='user1' value={this.props.value} onChange={this.props.handleChange}>
              <div className='post-ride-cont'><FormControlLabel value='driver' control={<Radio />} label='Driver Posts' /></div>
              <div className='post-ride-cont'><FormControlLabel value='passenger' control={<Radio />} label='Passenger Posts' /></div>
            </RadioGroup>
          </div>
          <div className='post-ride-btn'>
            <Button variant='contained' color='primary' defaultValue={this.state.date} onChange={this.handleDateChange} onClick={this.handlePostOpen}>
              Post a Ride
            </Button>
          </div>
          <Dialog 
            className='post-ride-form-cont' 
            open={this.state.isPostRideOpen} 
            onClose={this.handlePostClose}
            fullWidth={true}
            maxWidth = {'md'}
          >
            <PostRide handleChangeEmpl={this.handleChangeEmpl} handleChangeData={this.handleChangeData} tripValue={this.state.tripValue} />
            <DialogActions>
              <Button onClick={this.handlePostClose} color='primary'>
                Cancel
              </Button>
              <Button onClick={this.handlePostRide} color='primary'>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    </div>
    );
  }
}

export default TopMenu;