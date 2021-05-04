import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Hidden, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SideBar from '../SideBar';
import ActiveWagersTableContainer from './ActiveWagersTableContainer';

const useStyles = makeStyles((theme) => ({
  eventsMainContainer: {
    marginLeft: '280px',
    backgroundColor: 'background.paper',
    width: 'calc(100%-280) !important',
    minHeight: '1500px',
  },
  header: {
    marginLeft: '2rem',
    paddingTop: '1rem',
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  return (
    <>
      <Hidden lgDown>
        <Paper className={classes.eventsMainContainer}>
          <SideBar />
          <h1 className={classes.header}>Dashboard</h1>
          <ActiveWagersTableContainer />
        </Paper>
      </Hidden>
    </>
  );
}
