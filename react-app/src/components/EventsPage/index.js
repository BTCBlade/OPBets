import React from 'react';
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
}));

export default function EventsPage() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { query_str } = useParams();

  return (
    <>
      <Hidden lgDown>
        <Paper className={classes.eventsMainContainer}>
          <SideBar />
          <h1>Upcoming {query_str ? query_str : 'Esports'} Events</h1>

          <EventsContainer query_str={query_str} />
          <WagerSlip />
          <PositionedSnackbar />
        </Paper>
      </Hidden>
    </>
  );
}
