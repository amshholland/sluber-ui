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
        originator: "DRIVER"
      }
    }
  }

  handleChangeData = e => {
    let temp = this.state.tripValue
    if (e.target.id == "name" || e.target.id == "phoneNumber") {
      temp.driver[e.target.id] = e.target.value
    } else {
      temp[e.target.id] = e.target.value
    }
    console.log(this.state.tripValue, 'data here')
  }

  handleChangeEmpl = e => {
    let temp = this.state.tripValue
    temp["originator"] = e
    console.log(this.state.tripValue, 'data here')
  }

  handlePostOpen() {
    this.setState({
      isPostRideOpen: true
    })
  }

  handlePostClose() {
    this.setState({
      isPostRideOpen: false
    })
  }

  handlePostRide(value) {
    
    axios.post(process.env.REACT_APP_SLUBER_SERVICE_URL + '/trips', this.state.tripValue)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
    this.handlePostClose()
    this.props.addToData(this.state.tripValue)
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
        <Button variant='contained' color='primary' onClick={this.handlePostOpen}>
          Post a Ride
        </Button>
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