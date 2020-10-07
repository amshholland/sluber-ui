import React, { Component } from 'react';
import '../styles/menuStyles.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

class TopMenu extends Component {
  constructor(props) {
    super(props);
    this.handlePostOpen = this.handlePostOpen.bind(this);
    this.handlePostClose = this.handlePostClose.bind(this);
    this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
    this.state = {
      isPostRideOpen: false,
      employee: 'driver'
    }
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
            <TextField id="date-search-input" label='Date' type='date' InputLabelProps={{shrink: true }}/>
          </form>
        </div>
      <div className='post-ride-btn-cont'>
        <Button variant='contained' color='primary' onClick={this.handlePostOpen}>
          Post a Ride
        </Button>
        <Dialog open={this.state.isPostRideOpen} onClose={this.handlePostClose}>
          <DialogContent>
            <FormControl component="fieldset">
  +           <FormLabel component="legend">Employee Type</FormLabel>
  +             <RadioGroup row aria-label="employee-type" name="employee-type" value={this.state.employee} onChange={this.handleEmployeeChange}>
  +               <FormControlLabel value="driver" control={<Radio color="primary"/>} label="I'm a driver" />
  +            <FormControlLabel value="passenger" control={<Radio color="primary"/>} label="I'm a passenger" />
  +          </RadioGroup>
  +        </FormControl>
            <TextField 
              id="post-name" 
              label="Name" 
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <PermContactCalendarIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField 
              id="post-phone-number" 
              label="Phone Number" 
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <PhoneAndroidIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField 
              id="post-origin" 
              label="Origin"
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <HomeIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }} 
            />
            <TextField 
              id="post-departure" 
              label="Departure Time" 
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <ScheduleIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }} 
            />
            <TextField 
              id="post-destination" 
              label="Destination" 
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <LocationOnIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }} 
            />
            <TextField 
              id="post-est-arrival" 
              label="Estimated Arrival Time" 
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <FlightLandIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }} 
            />
            <TextField 
              id="post-seats" 
              label="Seats Available" 
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <EventSeatIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handlePostClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handlePostClose} color="primary">
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