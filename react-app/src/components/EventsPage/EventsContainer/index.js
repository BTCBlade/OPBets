import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';

import { loadEventsAll, loadSpecificEvents } from '../../../store/events';
//import OneEvent from '../OneEvent';
import EventsTable from '../EventsTable';

const EventsContainer = ({ query_str }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!query_str) {
      dispatch(loadEventsAll()).then(() => setLoading(false));
    } else {
      dispatch(loadSpecificEvents(query_str)).then(() => setLoading(false));
    }
  }, [dispatch, query_str]);
  return (
    <>
      {loading && <CircularProgress />}
      {!loading && <EventsTable />}
    </>
  );
};

export default EventsContainer;
