import React, { Component } from 'react';
import '../styles/menuStyles.css'
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
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
import axios from 'axios';
import { Link } from 'react-router-dom';

class PostRide extends Component {
    constructor(props) {
        super(props);
        this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
        this.isDriver = this.isDriver = this.setDriverVal.bind(this);
        this.handlePostClose = this.handlePostClose.bind(this);
        this.handlePostRide = this.handlePostRide.bind(this);

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
        this.setState({ tripValue: temp });
      }

     addToData = e => {
        axios.get(process.env.REACT_APP_SLUBER_SERVICE_URL + '/trips')
        .then(res => {
            let driverData = res.data.filter(o => o.originator === 'DRIVER')
            let passengerData = res.data.filter(o => o.originator === 'PASSENGER')
            this.setState({ driverData: driverData, passengerData: passengerData })
            if (this.state.value == 'driver') {
                this.setState({ data: driverData })
            } else {
                this.setState({ data: passengerData })
            }
        })
        .catch(err => {
            console.log(err)
        })
     }


    setDriverVal(val) {
        if (this.state.employee === 'DRIVER') {
            return true
        } else {
            return false
        }
    }

    handleEmployeeChange(event) {
        let temp = this.state.tripValue
        temp.originator = event.target.value
        this.setState({
            employee: event.target.value,
            tripValue: temp
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
            passengers: [{
              name: null,
              phoneNumber: null,
            }],
            originator: 'DRIVER'
          }
        })
      }

    handlePostRide(value) {
        axios.post(process.env.REACT_APP_SLUBER_SERVICE_URL + '/trips', this.state.tripValue)
        .then(res => {
            this.props.addToData(this.tripValue)
            this.handlePostClose()
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const isDriver = this.setDriverVal(this.state.employee);
        return (
            <div className='post-menu'>
                <FormControl component='fieldset'>
                    <FormLabel className='post-title' component='legend'>Employee Type</FormLabel>
                    <RadioGroup className='post-radiobutton' row aria-label='employee-type' name='employee-type' value={this.state.employee} onChange={this.handleEmployeeChange} >
                    <FormControlLabel value='DRIVER' control={<Radio color='primary'/>} label='I&apos;m a driver' />
                    <FormControlLabel value='PASSENGER' control={<Radio color='primary'/>} label='I&apos;m a passenger' />
              </RadioGroup>
            </FormControl>

            <Grid container className='grid-container' direction={'row'} spacing={6}>
              <Grid container item xs={12} sm={6} md={6} lg={3} xl={3}>
                <TextField 
                  id='name'
                  value={this.state.tripValue.driver.name}
                  onChange={this.handleChangeData}
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
              <Grid container item xs={12} sm={6} md={6} lg={3} xl={3}>
                <TextField 
                  id='phoneNumber'
                  value={this.state.tripValue.driver.phoneNumber}
                  onChange={this.handleChangeData}
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
              <Grid container item xs={12} sm={6} md={6} lg={3} xl={3}>
                <TextField 
                  id='origin'
                  value={this.state.tripValue.origin}
                  onChange={this.handleChangeData}
                  placeholder='Departure'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <HomeIcon />
                      </InputAdornment>
                    )
                  }} 
                />
              </Grid>
              <Grid container item xs={12} sm={6} md={6} lg={3} xl={3}>
                <TextField 
                  id='destination' 
                  value={this.state.tripValue.destination}
                  onChange={this.handleChangeData}
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
              <Grid container item xs={12} sm={6} md={6} lg={3} xl={3}>
                <TextField 
                  id='seatsAvailable' 
                  value={this.state.tripValue.seatsAvailable}
                  onChange={this.handleChangeData}
                  label='Seats Available'
                  type='number'
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
              <Grid container item xs={12} sm={6} md={6} lg={3} xl={3}>
                <TextField
                  id='departureTime'
                  label='Departure Time'
                  type='datetime-local'
                  onChange={this.handleChangeData}
                  InputLabelProps={{shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <ScheduleIcon />
                      </InputAdornment>
                    )
                  }}
                  style={{width: 220}}
                />
              </Grid>
              <Grid container item xs={12} sm={6} md={6} lg={3} xl={3}>
                <TextField 
                  id='arrivalTime'
                  label='Est. Arrival Time'
                  type='datetime-local'
                  onChange={this.handleChangeData}
                  disabled={!isDriver}
                  InputLabelProps={{shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <FlightLandIcon />
                      </InputAdornment>
                    )
                  }}
                  style={{width: 220}}
                />
              </Grid>
              <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  id='comments'
                  value={this.state.tripValue.comments}
                  onChange={this.handleChangeData}
                  className='post-comments'
                  placeholder='Additional Details (where to meet, car make/model, pickup/dropoff radius, etc.)'
                  multiline
                  rows={8}
                  variant='outlined'
                />
              </Grid>
                <div className='post-button-options'>
                  <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} >
                        <Link to to="/TopMenu">
                            <Button className='post-cancel-btn' variant='contained' color='primary' onClick={this.handlePostClose}>Cancel </Button>
                        </Link>
                  </Grid>
                </div>
                <div className='post-button-options'>
                   <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} >
                         <Link to to="/TopMenu">
                              <Button ClassName='post-submit-btn' variant='contained' color='primary' onClick={this.handlePostRide}>Submit</Button>
                         </Link>
                   </Grid>
                </div>
              </Grid>
            </div>
          )
      }
}

export default PostRide;
