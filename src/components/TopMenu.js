import React, { Component, setState } from 'react';
import '../styles/menuStyles.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class TopMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      departure: '',
      destination: '',
    }
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
        <div className='post-ride-tog'>
          <RadioGroup row aria-label="usertype" name="user1" value={this.props.value} onChange={this.props.handleChange}>
            <div className='post-ride-cont'><FormControlLabel value="driver" control={<Radio />} label="I'm a driver" /></div>
            <div className='post-ride-cont'><FormControlLabel value="passenger" control={<Radio />} label="I'm a passenger" /></div>
          </RadioGroup>
        </div>
        <div className='post-ride-btn'>
        <Button variant='contained' color='primary' defaultValue={this.state.date} onChange={this.handleDateChange}>
          Post a Ride
        </Button>
        </div>
      </div>
    </div>
    );
  }
}

export default TopMenu;