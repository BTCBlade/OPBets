import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Hidden, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SideBar from '../SideBar';

const useStyles = makeStyles((theme) => ({
  eventsMainContainer: {
    marginLeft: '280px',
    backgroundColor: 'background.paper',
    width: 'calc(100%-280) !important',
    minHeight: '1500px',
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  return (
    <>
      <Hidden lgDown>
        <Paper className={classes.eventsMainContainer}>
          <SideBar />
          <h1>Dashboard</h1>
        </Paper>
      </Hidden>
    </>
  );
}
