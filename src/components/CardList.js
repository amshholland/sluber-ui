import React from 'react';
import { Grid, withStyles, Accordion, FormControl, InputLabel, OutlinedInput, InputAdornment, AccordionDetails, AccordionSummary, ListItem, DialogContent, DialogActions, DialogTitle, Dialog, makeStyles, CardActionArea, CardMedia, Button, Typography, Card, CardContent } from '@material-ui/core';
import CardListStyles from '../styles/CardListStyles.js'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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

const useStyles = makeStyles({
    grid: {
        "align-items": "center",
    },
});

function CardList(props) {
    const classes = useStyles()
    // const classes = CardListStyles
    return (
        <div >
            <Grid container spacing={24}>
                {realData.map(element => {
                    return (
                        <Grid item xs={12} sm={12} lg={12} xl={12} className={classes.grid}>
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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        console.log(open)
    console.log(date.getDate, 'working')
    console.log(props.date.getMonth(), 'working')
    };
    const handleClose = () => {
        setOpen(false);
        console.log(open)
    };

    const [values, setValues] = React.useState({
        message: '',
      });
    
    const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    };

    let date = new Date(props.data.departureTime)
    let arriveDate = new Date(props.data.arrivalTime)
    console.log('hey ', date)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div>
            <Card>
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
                                <p>{props.data.origin} to {props.data.destination}</p>
                                <p>{date.toLocaleDateString(undefined, options)}</p>
                                <p>Additional Comments: {props.data.comments}</p>
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} lg={3} xl={3}>
                            <Typography variant="body1" color="textSecondary" component="p">
                                <p>Departs at: {date.toLocaleTimeString('en-US')}</p>
                                <p>Arrives at: {arriveDate.toLocaleTimeString('en-US')}</p>
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} lg={3} xl={3}>
                            <Button variant="contained" color="primary">
                                I'm interested
                            </Button>
                            <p>Available Space: {props.data.seatsAvailable}</p>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}
  
// export default withStyles(CardListStyles)(CardList);
export default CardList;
