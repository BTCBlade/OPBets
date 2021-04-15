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
import PositionedSnackbar from '../WagerSnackBar';
// import ProgressModal from '../WagerMatchingProgressModal';
// import {
//   openWagerMatchingProgress,
//   closeWagerMatchingProgress,
// } from '../../store/modal';

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
  // const dispatch = useDispatch();
  // const modalTest = () => {
  //   dispatch(openWagerMatchingProgress());
  // };
  return (
    <>
      <Hidden lgDown>
        <Paper className={classes.eventsMainContainer}>
          <SideBar />
          <h1>Upcoming Esports Events</h1>

          <EventsContainer />
          <WagerSlip />
          <PositionedSnackbar />
        </Paper>
      </Hidden>
    </>
  );
}
