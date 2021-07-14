import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Paper, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import SideBar from '../SideBar';
import EventsContainer from './EventsContainer';
import WagerSlip from './WagerSlip';
import PositionedSnackbar from '../WagerSnackBar';

const useStyles = makeStyles((theme) => ({
  eventsMainContainer: {
    marginLeft: '280px',
    backgroundColor: theme.palette.background.paper,
    width: 'calc(100%-280) !important',
    minHeight: '1500px',
  },
  eventsHeader: {
    marginLeft: '2rem',
    paddingTop: '1rem',
  },
}));

export default function EventsPage() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { query_str } = useParams();
  let setDisplayStr = '';
  if (query_str === 'all') {
    setDisplayStr = 'Esports';
  } else if (query_str === 'app_academy') {
    setDisplayStr = 'App Academy';
  } else if (query_str === 'small_cap_crypto') {
    setDisplayStr = 'Small Cap Crypto';
  } else if (query_str === 'politics') {
    setDisplayStr = 'Politics';
  } else {
    setDisplayStr = query_str;
  }

  return (
    <>
      <Hidden lgDown>
        <Paper className={classes.eventsMainContainer}>
          <SideBar />
          <h1 className={classes.eventsHeader}>
            Upcoming {setDisplayStr} Events
          </h1>

          <EventsContainer query_str={query_str} />
          <WagerSlip />
          <PositionedSnackbar />
        </Paper>
      </Hidden>
    </>
  );
}
