import React from 'react';
import { Grid, TextField, makeStyles, CardActionArea, CardMedia, CardActions, Button, AppBar, Typography, IconButton, Toolbar, Card, GridList, CardContent } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });

function CardList(props) {
    return (
        <div >
            <Grid container spacing={24} style={{padding: 24}}>
                <Grid item xs={12} sm={12} lg={12} xl={12} style={{padding: 24}}>
                    <CardItem />
                </Grid>
                <Grid item xs={12} sm={6} lg={3} xl={3} style={{padding: 24}}>
                    <CardItem />
                </Grid>
            </Grid>
        </div>
    );
}

function CardItem() {
    return (
        <div>
            <Card className={useStyles.root}>
                <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={'https://www.nationalgeographic.com/content/dam/animals/pictures/hero/reptiles-hero.adapt.1900.1.jpg'}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    anthony
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                    </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                <Button size="small" color="primary">
                    Add to Workouts
                </Button>
                </CardActions>
            </Card>
        </div>
    )
}
  
export default CardList;