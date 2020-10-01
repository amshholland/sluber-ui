import React from 'react';
import '../styles/menuStyles.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function TopMenu() {

    return (
        <div className='top-menu-cont'>
            <div className='search-cont'>
                <form className='departure-search-cont' noValidate autoComplete='off'>
                    <TextField id='departure-search-input' label='Departure' />
                </form>
            
                <form className='destination-search-cont' noValidate autoComplete='off'> 
                    <TextField id="destination-search-input" label='Destination' />
                </form>
                <form className='date-search-cont' noValidate autoComplete='off'>
                    <TextField id="date-search-input" label='Date' type='date' InputLabelProps={{shrink: true }}/>
                </form>
            </div>
            <div className='post-ride-btn-cont'>
                <Button variant='contained' color='primary'>
                    Post a Ride
                </Button>
            </div>
        </div>
    );
  }

export default TopMenu;