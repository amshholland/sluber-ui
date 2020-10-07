import React, { Component } from 'react';
import '../styles/menuStyles.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Dialog, DialogActions } from '@material-ui/core';
import PostRide from './PostRide'

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
          <PostRide></PostRide>
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