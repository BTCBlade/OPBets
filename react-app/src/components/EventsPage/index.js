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
import WagerSlip from './WagerSlip';

const useStyles = makeStyles((theme) => ({
  eventsMainContainer: {
    marginLeft: '280px',
    backgroundColor: 'background.paper',
    width: 'calc(100%-280) !important',
    minHeight: '1500px',
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
          <WagerSlip />
        </Paper>
      </Hidden>
    </>
  );
}
