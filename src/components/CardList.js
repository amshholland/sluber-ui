import React from 'react';
import { Grid, Button, Typography, Card, CardContent } from '@material-ui/core';
import CardListStyles from '../styles/CardListStyles.js';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = CardListStyles

function CardList(props) {
    return (
        <div>
            <Grid container spacing={1}>
                {props.data.map(element => {
                    return (
                        <Grid item xs={12} sm={12} lg={12} xl={12}>
                            <CardItem value={props.value} handleSubmit={props.handleSubmit} data={element}/>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}

function CardItem(props) {
    const classes = useStyles()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let departAll = new Date(props.data.departureTime)
    let arriveAll = new Date(props.data.arrivalTime)

    let departDate = (props.data.departureTime) ? departAll.toLocaleDateString(undefined, options) : ''
    let departTime = (props.data.departureTime) ? departAll.toLocaleTimeString('en-US') : ''
    let arriveTime = (props.data.arrivalTime) ? arriveAll.toLocaleTimeString('en-US') : ''

    let name = props.value === 'driver' ? props.data.driver.name : props.data.passengers[0].name

    return (
        <div>
            <Card square elevation={2} className={classes.card} >
                <CardContent>
                    <Grid container spacing={1} className={classes.grid} >
                        <Grid item xs={12} sm={3} lg={3} xl={3}>
                            <Typography gutterBottom variant='h5' component='h2'>
                                <p>{name}</p>
                                <AccountCircleIcon fontSize='large' />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <Typography variant='body2' color='textSecondary' component='p'>
                                <h3>{props.data.origin} to {props.data.destination}</h3>
                                <p>{departDate}</p>
                                <p>Additional Comments: {props.data.comments}</p>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                            <Typography variant='body2' color='textSecondary' component='p'>
                                <h4>Departs at: {departTime}</h4>
                                <h4>Arrives at: {arriveTime}</h4>
                            </Typography>
                        </Grid>
                        {props.value === 'driver' ?
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} >
                                <Button onClick={props.handleSubmit.bind(this, props.data.tripId)} variant="contained"
                                        color="primary">
                                    I'm interested
                                </Button>
                                <p>{props.data.seatsAvailable} seat/s remaining</p>
                            </Grid> :
                            null
                        }
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default CardList;
