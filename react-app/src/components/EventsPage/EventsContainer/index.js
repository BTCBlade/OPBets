import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';

import { loadEventsAll } from '../../../store/events';
//import OneEvent from '../OneEvent';
import EventsTable from '../EventsTable';

const EventsContainer = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEventsAll()).then(() => setLoading(false));
  }, []);
  return (
    <>
      {loading && <CircularProgress />}
      {!loading && <EventsTable />}
    </>
  );
};

export default EventsContainer;
