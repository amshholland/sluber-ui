import React, { Component } from 'react';
import '../styles/menuStyles.css'
import TextField from '@material-ui/core/TextField';
import { DialogContent, Grid } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
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
            employee: 'driver',
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
              <FormLabel component="legend">Employee Type</FormLabel>
              <RadioGroup row aria-label="employee-type" name="employee-type" value={this.state.employee} onChange={this.handleEmployeeChange}>
                <FormControlLabel value="driver" control={<Radio color="primary"/>} label="I'm a driver" />
                <FormControlLabel value="passenger" control={<Radio color="primary"/>} label="I'm a passenger" />
              </RadioGroup>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <TextField 
                  id="post-name" 
                  label="Name" 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <PermContactCalendarIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <TextField 
                  id="post-phone-number" 
                  label="Phone Number" 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <PhoneAndroidIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <TextField 
                  id="post-origin" 
                  label="Origin"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <HomeIcon />
                      </InputAdornment>
                    )
                  }} 
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <TextField 
                  id="post-departure" 
                  label="Departure Time" 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <ScheduleIcon />
                      </InputAdornment>
                    )
                  }} 
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <TextField 
                  id="post-destination" 
                  label="Destination" 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <LocationOnIcon />
                      </InputAdornment>
                    )
                  }} 
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <TextField 
                  id="post-est-arrival" 
                  label="Est. Arrival Time" 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <FlightLandIcon />
                      </InputAdornment>
                    )
                  }} 
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <TextField 
                  id="post-seats" 
                  label="Seats Available" 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <EventSeatIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Multiline"
                  multiline
                  rows={10}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          )
      }
}

export default PostRide;
