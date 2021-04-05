import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const OneEvent = ({ event }) => {
  return <h5>{event.home.name}</h5>;
};

export default OneEvent;
