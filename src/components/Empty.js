import React from 'react';
import { Typography } from '@material-ui/core';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: "lightgray",
        fontSize: 100,
        paddingTop: 70
    },
}));

function EmptyState() {
    const classes = useStyles();

    return (
        <div>
            <EmojiTransportationIcon className={classes.icon} />
            <Typography variant='body1' >
                There are no posts available to show.
            </Typography>
            <Typography variant='body1' >
                Please check back with us later.
            </Typography>
        </div>
    );
}

export default EmptyState;