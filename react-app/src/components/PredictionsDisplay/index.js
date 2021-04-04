import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CircularProgress,
  Typography,
  Box,
  Button,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  console.log('useStyles-Theme inside of predictionsdisplay');
  return {};
});

export default function PredictionsDisplay() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  return <>{loading && <CircularProgress></CircularProgress>}</>;
}
