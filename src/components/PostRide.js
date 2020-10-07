import React, { Component } from 'react';
import '../styles/menuStyles.css'
import TextField from '@material-ui/core/TextField';
import { DialogContent, Grid } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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
        this.isDriver = this.isDriver = this.setDriverVal.bind(this);
        this.state = {
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
                originator: null
              }
        }
    }

    setDriverVal(val) {
        if (this.state.employee === 'driver') {
            return true
        } else {
            return false
        }
    }

    handleEmployeeChange(event) {
        this.setState({
            employee: event.target.value
        })
    }

    render() {
        const isDriver = this.setDriverVal(this.state.employee)

        return (
            <DialogContent>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Employee Type</FormLabel>
              <RadioGroup row aria-label='employee-type' name='employee-type' value={this.state.employee} onChange={this.handleEmployeeChange}>
                <FormControlLabel value='driver' control={<Radio color='primary'/>} label="I'm a driver" />
                <FormControlLabel value='passenger' control={<Radio color='primary'/>} label="I'm a passenger" />
              </RadioGroup>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <TextField 
                  id='name' 
                  value={this.props.tripValue.driver.name}
                  onChange={this.props.handleChangeData}
                  placeholder='Name' 
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
                  id='phoneNumber' 
                  value={this.props.tripValue.driver.phoneNumber}
                  onChange={this.props.handleChangeData}
                  placeholder='Phone Number' 
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
                  id='origin' 
                  value={this.props.tripValue.origin}
                  onChange={this.props.handleChangeData}
                  placeholder='Origin'
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
                  id='departureTime'
                  value={this.props.tripValue.departureTime}
                  onChange={this.props.handleChangeData}
                  placeholder='Departure Time' 
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
                  id='destination' 
                  value={this.props.tripValue.destination}
                  onChange={this.props.handleChangeData}
                  placeholder='Destination' 
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
                  id='arrivalTime' 
                  value={this.props.tripValue.arrivalTime}
                  onChange={this.props.handleChangeData}
                  placeholder='Est. Arrival Time' 
                  disabled={!isDriver}
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
                  id='seatsAvailable' 
                  value={this.props.tripValue.seatsAvailable}
                  onChange={this.props.handleChangeData}
                  placeholder='Seats Available'
                  type="number"
                  disabled={!isDriver}
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
                  id='comments'
                  value={this.props.tripValue.comments}
                  onChange={this.props.handleChangeData}
                  className='post-comments'
                  placeholder='Additional Details (where to meet, car make/model, pickup/dropoff radius, etc.)'
                  multiline
                  rows={8}
                  variant='outlined'
                />
              </Grid>
            </Grid>
          </DialogContent>
          )
      }
}

export default PostRide;
