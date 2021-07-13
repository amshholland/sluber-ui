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
            <Typography variant='h6' >
                <EmojiTransportationIcon className={classes.icon} />
                <p>There are no posts available to show.</p>
            </Typography>
        </div>
    );
}

export default EmptyState;