import React from 'react';
import { Grid, Button, Typography, Card, CardContent } from '@material-ui/core';
import CardListStyles from '../styles/CardListStyles.js'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const useStyles = CardListStyles

let realData = [{
    "tripId":"abc-123",
    "origin":"Slalom HQ, Seattle",
    "destination":"Quarterly, Westin Bellevue",
    "departureTime":"2021-10-21T17:32:28Z",
    "arrivalTime":"2021-10-21T18:32:28Z",
    "comments":"Willing to pick people up anywhere in downtown Seattle.",
    "driver": {
    "name":"Todd S",
    "phoneNumber":"555-555-1234"
    },
    "seatsAvailable":3,
    "orginator":"DRIVER",
    "passengers": [{
        "name":"John A",
        "phoneNumber":"543-234-1223"
    }]
}]

function CardList(props) {
    return (
        <div >
            <Grid container spacing={24}>
                {realData.map(element => {
                    return (
                        <Grid item xs={12} sm={12} lg={12} xl={12}>
                            <CardItem data={element}/>
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
                            <Button variant="contained" color="primary">
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
