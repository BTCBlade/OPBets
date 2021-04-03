import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LandingPageCarousel from './LandingPageCarousel';

import { testLoad } from '../../store/betsapi';
const useStyles = makeStyles((theme) => ({
  span: { marginTop: '1rem', marginBot: '1rem', color: 'primaryMain' },
}));

export default function PublicLandingPage(props) {
  const dispatch = useDispatch();
  const betsapi = useSelector((state) => state.betsapi);
  console.log(props);
  const classes = useStyles(props.theme);
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
      <Box height="600px" mt="65px" width="80%" mx="auto">
        <Typography
          sx={{
            backgroundColor: 'background.paper',
            fontSize: '0.75rem',
            color: 'primary.main',
            marginTop: '1rem',
            marginBottom: '0',
            textAlign: 'center',
            fontWeight: '600',
          }}
        >
          INTRODUCING
        </Typography>
        <Typography
          sx={{
            backgroundColor: 'background.paper',
            fontSize: '2rem',
            color: 'text.primary',
            marginTop: '0.4rem',
            marginBottom: '0.6rem',
            textAlign: 'center',
            fontWeight: '800',
          }}
        >
          The Worlds Only Esports Matchbook
        </Typography>
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