import React from 'react';
import { Grid, Accordion, FormControl, InputLabel, OutlinedInput, InputAdornment, AccordionDetails, AccordionSummary, ListItem, DialogContent, DialogActions, DialogTitle, Dialog, makeStyles, CardActionArea, CardMedia, Button, Typography, Card, CardContent } from '@material-ui/core';

let model = {
    Trips: [{
        Origin: String,
        Destination: String,
        DepartureTime: Date,
        Comments: String,
        ArrivalTime: String,
        Drivers: [{
            Name: String,
            PhoneNumber: String,
            Comments: String,
            Passengers: [{
                Name: String,
                PhoneNumber: String,
                Comments: String,
            }]
        }],
    }]
}

let realData = [{
    "tripId":"abc-123",
    "origin":"Slalom HQ, Seattle",
    "destination":"Quarterly, Westin Bellevue",
    "departureTime":"2021-010-21T17:32:28Z",
    "arrivalTime":"2021-010-21T18:32:28Z",
    "comments":"Willing to pick people up anywhere in downtown Seattle.",
    "driver": {
    "name":"Todd S",
    "phoneNumber":"555-555-1234"
    },
    "seatsAvailable":3,
    "orginator":"DRIVER",
    "passengers": []
}]

let data = {
    Trips: [{
        Origin: "Slalom",
        URL: "https://www.t-mobile.com/news/_admin/uploads/2010/03/NTC-article-t-mobile.png",
        Destination: "T-Mobile",
        DepartureTime: "2:30pm",
        ArrivalTime: "4:30pm",
        Comments: "Please meet at Starbucks",
        Driver: {
            Name: "Anthony",
            PhoneNumber: "2069142033",
            AvailableSpace: 4,
            Comments: "Picking up at Slalom",
            Passengers: [{
                Name: "John",
                PhoneNumber: "2060942939",
                Comments: "Will meet anywhere"
            }, {
                Name: "Sarah",
                PhoneNumber: "2232220101",
                Comments: "Anywhere works"
            }]
        }
    },
    {
        Origin: "UW Medical Center",
        URL: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2r0Th?ver=5b7d",
        Destination: "Microsoft",
        DepartureTime: "1:00pm",
        ArrivalTime: "2:00pm",
        Comments: "Please meet at Quad",
        Driver: {
            Name: "Jane",
            PhoneNumber: "2069141234",
            AvailableSpace: 3,
            Comments: "Picking up at UW Quad",
            Passengers: [{
                Name: "Joe",
                PhoneNumber: "2060943999",
                Comments: "Will meet you"
            }, {
                Name: "Joan",
                PhoneNumber: "1234567890",
                Comments: "Meet at Slalom"
            }]
        }
    }]
}

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
});

const useStylesList = makeStyles({
    root: {
        width: '100%',
        maxWidth: 360,
    },
})

function CardList(props) {
    return (
        <div >
            <Grid container spacing={24} style={{padding: 24}}>
                {data.Trips.map(element => {
                    let origin = element.Origin
                    let destination = element.Destination
                    let departureTime = element.DepartureTime
                    let arrivalTime = element.ArrivalTime
                    let comments = element.Comments
                    let driver = element.Driver
                    let url = element.URL
                    return (
                        <Grid item xs={12} sm={12} lg={6} xl={6} style={{padding: 24}}>
                            <CardItem origin={origin} destination={destination} departureTime={departureTime} arrivalTime={arrivalTime} comments={comments} driver={driver} url={url} />
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function CardItem(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        console.log(open)
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

    return (
        <div>
            <Card className={useStyles.root}>
                <CardActionArea onClick={handleClickOpen}>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={props.url}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.origin} to {props.destination}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <p>Departs at: {props.departureTime}</p>
                            <p>Arrives at: {props.arrivalTime}</p>
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <p>Driver Details: {props.driver.Name} {props.driver.PhoneNumber}</p>
                            <p>Available Space: {props.driver.AvailableSpace}</p>
                            <p>Additional Comments: {props.comments}</p>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Book a Trip
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.origin} to {props.destination}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <p>Driver Comments: {props.driver.Comments}</p>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <p>Departs at: {props.departureTime}</p>
                            <p>Arrives at: {props.arrivalTime}</p>
                            <p>Available Space: {props.driver.AvailableSpace}</p>
                        </Typography>
                        <Typography gutterBottom>
                            <p>Passengers:</p>
                        </Typography>
                        {props.driver.Passengers.map(element => {
                            return (
                                <Accordion>
                                    <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                        <Typography variant="body1" color="textSecondary" component="p">
                                            Name: {element.Name} Number: {element.PhoneNumber}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Passenger Comments: {element.Comments}
                                    </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </DialogContent>
                    <DialogActions>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Additional Information</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={values.message}
                                onChange={handleChange('message')}
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                labelWidth={160}
                            />
                        </FormControl>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Join this Ride!
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </div>
    )
}
  
export default CardList;