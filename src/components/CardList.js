import React from 'react';
import { Grid, Button, Typography, Card, CardContent } from '@material-ui/core';
import CardListStyles from '../styles/CardListStyles.js'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const useStyles = CardListStyles

function CardList(props) {
    return (
        <div >
            <Grid container spacing={24}>
                {props.data.map(element => {
                    return (
                        <Grid item xs={12} sm={12} lg={12} xl={12}>
                            <CardItem handleSubmit={props.handleSubmit} data={element}/>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}

function CardItem(props) {
    const classes = useStyles()

    let date = new Date(props.data.departureTime)
    let arriveDate = new Date(props.data.arrivalTime)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Grid container spacing={24} className={classes.grid}>
                        <Grid item xs={3} sm={3} lg={3} xl={3}>
                            <Typography gutterBottom variant="h5" component="h2">
                                <p>{props.data.driver.name}</p>
                                <AccountCircleIcon fontSize="large" />
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} lg={3} xl={3}>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <h3>{props.data.origin} to {props.data.destination}</h3>
                                <p>{date.toLocaleDateString(undefined, options)}</p>
                                <p>Additional Comments: {props.data.comments}</p>
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} lg={3} xl={3}>
                            <Typography variant="body1" color="textSecondary" component="p">
                                <h4>Departs at: {date.toLocaleTimeString('en-US')}</h4>
                                <h4>Arrives at: {arriveDate.toLocaleTimeString('en-US')}</h4>
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} lg={3} xl={3}>
                            <Button onClick={props.handleSubmit.bind(this, props.data.tripId)} variant="contained" color="primary">
                                I'm interested
                            </Button>
                            <p>{props.data.seatsAvailable} seat/s remaining</p>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default CardList;
