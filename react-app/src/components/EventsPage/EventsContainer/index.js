import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import { loadEventsAll } from '../../../store/events';
import OneEvent from '../OneEvent';

const EventsContainer = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let events = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(loadEventsAll()).then(() => setLoading(false));
  }, []);
  return (
    <>
      {loading && <CircularProgress />}
      {!loading &&
        Object.values(events).map((event) => {
          return <OneEvent event={event} />;
        })}
    </>
  );
};

export default EventsContainer;
