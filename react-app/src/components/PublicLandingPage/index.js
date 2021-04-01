import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container } from '@material-ui/core';

import LandingPageCarousel from './LandingPageCarousel';

import { testLoad } from '../../store/betsapi';

export default function PublicLandingPage() {
  const dispatch = useDispatch();
  const betsapi = useSelector((state) => state.betsapi);

  const handleTest = () => {
    dispatch(testLoad());
  };
  return (
    <Box
      component="div"
      overflow="visiable"
      display="flex"
      flexDirection="column"
      height="100%"
      width="100%"
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.secondary',
      }}
    >
      <Box mt="5%" width="90%" mx="auto">
        <LandingPageCarousel />
      </Box>

      <h1>Public Landing Page</h1>

      <Button onClick={handleTest}>test</Button>
      {betsapi &&
        betsapi.upcoming_events &&
        betsapi.upcoming_events.map((event) => {
          return <p>EventID {event.id}</p>;
        })}
    </Box>
  );
}
