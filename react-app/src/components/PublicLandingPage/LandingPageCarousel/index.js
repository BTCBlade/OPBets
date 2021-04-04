import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Grid, Box, Paper, Button, Typography } from '@material-ui/core';
import Image from 'material-ui-image';
import esports_stadium_img from './esports_stadium.jpeg';
import sportsbook_img from './sportsbook.jpeg';
import forex_img from './forex_pic.jpeg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  h3: { fontSize: '1.2rem', marginBottom: '0.15rem', marginTop: '0.5rem' },
  carouselPaper: {
    height: '100%',
    width: '100%',
    mx: 'auto',
  },
  p: {
    marginTop: '0.15rem',
    marginBottom: '0.15rem',
    fontSize: '0.9rem',
  },
  button: {
    width: '200px',
    marginTop: '0.4rem',
    marginBottom: '0.6rem',
    borderRadius: '.75rem',
  },
}));

export default function LandingPageCarousel(props) {
  const items = [
    {
      image: esports_stadium_img,
      name:
        'Esports viewership is blowing up! Sporting events numbers are proof',
      description:
        'LoL WorldsChampionship: 23 million' +
        '   ·  ' +
        'NHL StanleyCup: 1 million' +
        '   ·  ' +
        'MLB Finals: 9.78 million ',
      button_text: 'Wager on Esports!',
    },
    {
      image: sportsbook_img,
      name: 'The truth behind traditional sportsbooks',
      description:
        'Most sportsbooks remove at least 5% of the probability spectrum. No one can beat that much implied probability removal long term',
      button_text: 'Find the truth!',
    },
    {
      image: forex_img,
      name: 'The forex/stock exchanges approach',
      description:
        'All modern markets incentives users to add liquidity, and charges more for removing liquidity. ie. The Bid/Ask systems that HFTs operate on',
      button_text: 'OPBets Approach',
    },
  ];

  return (
    <Carousel alignItems="center" alignContent="center" justify="center">
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  const classes = useStyles(props);
  return (
    <Paper className={classes.carouselPaper}>
      <Box
        className="carousel-main-box"
        id="carousel-main-box"
        display="flex"
        flexDirection="column"
        height="100%"
        width="100%"
      >
        <Box
          height="400px"
          width="900px"
          display="flex"
          flexDirection="column"
          alignSelf="center"
          className="carousel-img-container"
          borderRadius="1rem"
          overflow="hidden"
        >
          <img
            alignSelf="center"
            className="carousel-img"
            src={props.item.image}
          />
        </Box>
        <Box className="carousel-header-box" alignSelf="center">
          <h3 className={classes.h3} mt="0" mb="0" alignSelf="center">
            {props.item.name}
          </h3>
        </Box>
        <Box alignSelf="center">
          <p className={classes.p} alignSelf="center">
            {props.item.description}
          </p>
        </Box>
        <Box alignSelf="center">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {props.item.button_text}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
