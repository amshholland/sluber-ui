import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Map from './Map';
import '../styles/menuStyles.css';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import debounce from '../util/debounce';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const useStyles = makeStyles({
  root: {
    '& .search-date': {
      marginTop: '12px',
    },
    '& .MuiInputBase-root': {
      color: 'rgba(0, 0, 0, 0.54)',
    },
  },
});

const TopMenu = ({ value, handleChange }) => {
  const classes = useStyles();
  const [departurePrediction, setdeparturePrediction] = useState([]);
  const [destinationPrediction, setDestinationPrediction] = useState([]);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');

  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving',
  });

  const getAddress = async (lngLat) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat}.json?access_token=${mapboxgl.accessToken}`;
    const res = await axios.get(url);
    if (res.status === 200 && res.data) {
      return res.data.features[0].place_name;
    }
    return '';
  };

  const getdeparturePrediction = (departureLocation) => {
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

  const getdestinationPrediction = (destinationLocation) => {
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

  const getUpdatedAddresses = (newDepLngLat, newDesLngLat) => {
    if (newDepLngLat) {
      getAddress(newDepLngLat).then(data => setDeparture(data));
    }
    if (newDesLngLat) {
      getAddress(newDesLngLat).then(data => setDestination(data));
    }
  };

  const handleDepartureChange = useMemo(() => debounce(getdeparturePrediction, 1000), []);
  const handleDestinationChange = useMemo(() => debounce(getdestinationPrediction, 1000), []);
  const handleRouteChange = useMemo(() => debounce(getUpdatedAddresses, 1000), []);

  const handleSearch = () => {
    directions.setOrigin(departure);
    directions.setDestination(destination);
  };

  useEffect(() => {
    handleDepartureChange(departure);
  }, [departure, handleDepartureChange]);

  useEffect(() => {
    handleDestinationChange(destination);
  }, [destination, handleDestinationChange]);

  useEffect(() => {
    directions.on('route', () => {
      const newDeparture = directions.getOrigin();
      const newDestination = directions.getDestination();
      let newDepLngLat = '';
      let newDesLngLat = '';
      if (newDeparture) {
        newDepLngLat = `${newDeparture.geometry.coordinates[0]}, ${newDeparture.geometry.coordinates[1]}`;
      }
      if (newDestination) {
        newDesLngLat = `${newDestination.geometry.coordinates[0]}, ${newDestination.geometry.coordinates[1]}`;
      }
      handleRouteChange(newDepLngLat, newDesLngLat);
    });
  }, [directions, handleRouteChange]);

  return (
    <div className='top-menu-cont'>
      <div className='search-cont' role='form'>
        <Grid
          container
          spacing={3}
          alignItems='flex-end'
          classes={{ root: classes.root }}
        >
          <Grid item xs={12} md={6} lg={5}>
            <Autocomplete
              freeSolo
              defaultValue={''}
              options={departurePrediction}
              inputValue={departure || ''}
              onInputChange={(event, newInputValue) => {
                setDeparture(newInputValue);
              }}
              value={departure || ''}
              onChange={(event, newValue) => {
                const tempValue = newValue === null ? '' : newValue;
                setDeparture(tempValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label='Departure' />
              )}
              getOptionSelected={(option, value) => option === value}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <Autocomplete
              freeSolo
              defaultValue={''}
              options={destinationPrediction}
              inputValue={destination || ''}
              onInputChange={(event, newInputValue) => {
                setDestination(newInputValue);
              }}
              value={destination || ''}
              onChange={(event, newValue) => {
                const tempValue = newValue === null ? '' : newValue;
                setDestination(tempValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label='Destination' />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <TextField type='date' fullWidth className='search-date' />
          </Grid>
        </Grid>
      </div>

      <div className='post-ride-btn-cont'>
        <div className='post-ride-btn'>
          <Button variant='contained' color='primary' onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      <Map directions={directions} />

      <div className='post-ride-btn-cont'>
        <div className='post-ride-tog'>
          <RadioGroup
            row
            aria-label='Post Type'
            name='user1'
            value={value}
            onChange={handleChange}
          >
            <div className='post-ride-cont'>
              <FormControlLabel
                value='driver'
                control={<Radio />}
                label='Driver Posts'
              />
            </div>
            <div className='post-ride-cont'>
              <FormControlLabel
                value='passenger'
                control={<Radio />}
                label='Passenger Posts'
              />
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
