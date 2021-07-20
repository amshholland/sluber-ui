import React, { useEffect, useState, useMemo } from 'react';
import '../styles/menuStyles.css';
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
import Map from './Map';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import debounce from '../util/debounce';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const PostRide = () => {
  const defaultTripValue = {
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
  };
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDriver, setIsDriver] = useState(false);
  const [tripValue, setTripValue] = useState(defaultTripValue);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departurePrediction, setdeparturePrediction] = useState([]);
  const [destinationPrediction, setDestinationPrediction] = useState([]);

  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving',
  });

  const handleChangeData = (e, id) => {
    const value = e.target.value;
    switch (id) {
      case 'name':
      case 'phoneNumber':
        if (tripValue.originator === 'DRIVER') {
          const tempDriver = {
            ...tripValue.driver,
            [id]: value
          };
          setTripValue((prevState) => ({
            ...tripValue,
            driver: tempDriver
          }));
        } else {
          const newPassengers = [...tripValue.passengers];
          newPassengers[0][id] = value;
          setTripValue((prevState) => ({
            ...prevState,
            passengers: newPassengers,
          }));
        }
        break;
      case 'departureTime':
      case 'arrivalTime':
        setTripValue((prevState) => ({
          ...prevState,
          [id]: `${value}:00Z`
        }));
        break;
      default:
        setTripValue((prevState) => ({
          ...prevState,
          [id]: value
        }));
        break;
    }
  };

  const hanldeLocationChange = (id, value) => {
    setTripValue((prevState) => ({
      ...prevState,
      [id]: value
    }));
  }

  const handleEmployeeChange = (event) => {
    setTripValue({
      ...defaultTripValue,
      originator: event.target.value,
    });
  };

  const handlePostClose = () => {
    setTripValue(defaultTripValue);
  };

  const handlePostRide = () => {
    axios
      .post(process.env.REACT_APP_SLUBER_SERVICE_URL + '/trips', tripValue)
      .then(() => {
        handlePostClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDeparturePrediction = (departureLocation) => {
    if (departureLocation) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${departureLocation}.json?access_token=${mapboxgl.accessToken}`;
      axios.get(url).then((response) => {
        const features = response.data.features;
        const placeName = features.map((feature) => feature.place_name);
        setdeparturePrediction(placeName);
      });
    } else {
      setdeparturePrediction([]);
    }
  };

  const getDestinationPrediction = (destinationLocation) => {
    if (destinationLocation) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${destinationLocation}.json?access_token=${mapboxgl.accessToken}`;
      axios.get(url).then((response) => {
        const features = response.data.features;
        const placeName = features.map((feature) => feature.place_name);
        setDestinationPrediction(placeName);
      });
    } else {
      setDestinationPrediction([]);
    }
  };

  const getAddress = async (lngLat) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat}.json?access_token=${mapboxgl.accessToken}`;
    const res = await axios.get(url);
    if (res.status === 200 && res.data) {
      return res.data.features[0].place_name;
    }
    return '';
  };

  const getUpdatedAddresses = (newDepartureLatLong, newDestinationLatLong) => {
    if (newDepartureLatLong) {
      getAddress(newDepartureLatLong).then(data => {
        setTripValue((prevState) => ({
          ...prevState,
          origin: data
        }));
      });
    }
    if (newDestinationLatLong) {
      getAddress(newDestinationLatLong).then(data => {
        setTripValue((prevState) => ({
          ...prevState,
          destination: data
        }));
      });
    }
  };

  const handleDepartureChange = useMemo(() => debounce(getDeparturePrediction, 1000), []);
  const handleDestinationChange = useMemo(() => debounce(getDestinationPrediction, 1000), []);
  const handleRouteChange = useMemo(() => debounce(getUpdatedAddresses, 3000), []);

  useEffect(() => {
    const setDriverVal = () => {
      if (tripValue.originator === 'DRIVER') {
        setIsDriver(true);
        setName(tripValue.driver.name);
        setPhoneNumber(tripValue.driver.phoneNumber);
      } else {
        const name = tripValue.passengers.length && tripValue.passengers[0].name;
        const phoneNumber = tripValue.passengers.length && tripValue.passengers[0].phoneNumber;
        setIsDriver(false);
        setName(name);
        setPhoneNumber(phoneNumber);
      }
    };
    setDriverVal();
  }, [tripValue]);

  useEffect(() => {
    handleDepartureChange(departure);
    if (departure === tripValue.origin) {
      directions.setOrigin(departure);
    }
  }, [departure, handleDepartureChange]);

  useEffect(() => {
    handleDestinationChange(destination);
    if (destination === tripValue.destination) {
      directions.setDestination(destination);
    }
  }, [destination, handleDestinationChange]);

  useEffect(() => {
    directions.on('route', () => {
      const newDeparture = directions.getOrigin();
      const newDestination = directions.getDestination();
      let newDepartureLongLat = '';
      let newDestinationLongLat = '';
      if (newDeparture) {
        newDepartureLongLat = `${newDeparture.geometry.coordinates[0]}, ${newDeparture.geometry.coordinates[1]}`;
      }
      if (newDestination) {
        newDestinationLongLat = `${newDestination.geometry.coordinates[0]}, ${newDestination.geometry.coordinates[1]}`;
      }
      handleRouteChange(newDepartureLongLat, newDestinationLongLat);
    });
  }, [directions, handleRouteChange]);

  return (
    <div className="post-menu">
      <FormControl component="fieldset">
        <FormLabel className="post-title" component="legend">Employee Type</FormLabel>
        <RadioGroup
          className="post-radiobutton"
          row
          aria-label="employee-type"
          name="employee-type"
          value={tripValue.originator}
          onChange={handleEmployeeChange}
        >
          <FormControlLabel
            value="DRIVER"
            control={<Radio color="primary" />}
            label="I&apos;m a driver"
          />
          <FormControlLabel
            value="PASSENGER"
            control={<Radio color="primary" />}
            label="I&apos;m a passenger"
          />
        </RadioGroup>
      </FormControl>

      <Grid container className="grid-container" direction={'row'} spacing={6}>
        <Grid container item xs={12} sm={6} md={6} lg={3} xl={3}>
          <TextField
            id="name"
            value={name || ''}
            onChange={(e) => handleChangeData(e, 'name')}
            placeholder="Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PermContactCalendarIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid container item xs={12} sm={6} md={6} lg={3} xl={3}>
          <TextField
            id="phoneNumber"
            value={phoneNumber || ''}
            onChange={(e) => handleChangeData(e, 'phoneNumber')}
            placeholder="Phone Number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneAndroidIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid container item xs={12} sm={6} md={6} lg={3} xl={3}>
          <Autocomplete
            freeSolo
            fullWidth
            defaultValue={''}
            options={departurePrediction}
            inputValue={departure || ''}
            onInputChange={(event, newValue) => {
              hanldeLocationChange('origin', newValue);
              setDeparture(newValue);
            }}
            value={departure|| ''}
            onChange={(event, newValue) => {
              hanldeLocationChange('origin', newValue);
              setDeparture(newValue);
            }}
            renderInput={(params) => {
              params.InputProps.startAdornment = (
                <>
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              );
              return (
                <TextField {...params} placeholder="Departure" />
              );
            }}
          />
        </Grid>
        <Grid container item xs={12} sm={6} md={6} lg={3} xl={3}>
          <Autocomplete
            freeSolo
            fullWidth
            defaultValue={''}
            options={destinationPrediction}
            inputValue={destination || ''}
            onInputChange={(event, newValue) => {
              hanldeLocationChange('destination', newValue);
              setDestination(newValue);
            }}
            value={destination || ''}
            onChange={(event, newValue) => {
              hanldeLocationChange('destination', newValue);
              setDestination(newValue);
            }}
            renderInput={(params) => {
              params.InputProps.startAdornment = (
                <>
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              );
              return (
                <TextField {...params} placeholder="Destination" />
              );
            }}
          />
        </Grid>
        <Grid container item xs={12} sm={6} md={6} lg={3} xl={3}>
          <TextField
            id="seatsAvailable"
            value={tripValue.seatsAvailable || ''}
            onChange={(e) => handleChangeData(e, 'seatsAvailable')}
            label="Seats Available"
            type="number"
            disabled={!isDriver}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventSeatIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid container item xs={12} sm={6} md={6} lg={3} xl={3}>
          <TextField
            id="departureTime"
            label="Departure Time"
            type="datetime-local"
            onChange={(e) => handleChangeData(e, 'departureTime')}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ScheduleIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid container item xs={12} sm={6} md={6} lg={3} xl={3}>
          <TextField
            id="arrivalTime"
            label="Est. Arrival Time"
            type="datetime-local"
            onChange={(e) => handleChangeData(e, 'arrivalTime')}
            disabled={!isDriver}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FlightLandIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TextField
            id="comments"
            value={tripValue.comments || ''}
            onChange={(e) => handleChangeData(e, 'comments')}
            className="post-comments"
            placeholder="Additional Details (where to meet, car make/model, pickup/dropoff radius, etc.)"
            multiline
            rows={8}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Map directions={directions} />
        </Grid>
        <div className="post-button-options">
          <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Link to="/FindRidePage">
              <Button
                className="post-cancel-btn"
                variant="contained"
                color="primary"
                onClick={handlePostClose}
              >
                Cancel{' '}
              </Button>
            </Link>
          </Grid>
        </div>
        <div className="post-button-options">
          <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Link to="/FindRidePage">
              <Button
                className="post-submit-btn"
                variant="contained"
                color="primary"
                onClick={handlePostRide}
              >
                Submit
              </Button>
            </Link>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default PostRide;