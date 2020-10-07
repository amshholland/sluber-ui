import React, { Component } from 'react';
import '../styles/menuStyles.css'
import TextField from '@material-ui/core/TextField';
import { DialogContent} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

class PostRide extends Component {
    constructor(props) {
        super(props);
        this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
        this.state = {
          employee: 'driver'
        }
      }

      handleEmployeeChange(event) {
        this.setState({
          employee: event.target.value
        })
      }

      render() {
          return (
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
          )
      }
}

export default PostRide;
