import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Hidden,
  Typography,
  Box,
  Button,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SideBar from '../SideBar';
import EventsContainer from './EventsContainer';

const useStyles = makeStyles((theme) => ({
  eventsMainContainer: {
    marginLeft: '280px',
    backgroundColor: 'background.paper',
    width: '100%',
    height: '1500px',
  },
}));

export default function EventsPage() {
  const classes = useStyles();
  return (
    <>
      <Hidden lgDown>
        <Paper className={classes.eventsMainContainer}>
          <SideBar />
          <h1>Events Page Paper Top Left</h1>
          <EventsContainer />
        </Paper>
      </Hidden>
    </>
  );
}
