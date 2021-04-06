import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Typography, Divider, Paper, Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { decimal_to_american } from '../../../utils/odds_conversion';

import './WagerSlip.css';

const useStyles = makeStyles({
  WagerSlipPaper: {
    position: 'fixed',
    width: '300px',
    height: '400px',
    top: '100px',
    right: '600px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    borderColor: 'text.secondary',
  },
  wagers_container: {
    display: 'flex',
    flexDirection: 'column',
  },
});

function OneWager({ wager }) {
  const [risk, setRisk] = useState();
  const [win, setWin] = useState();

  return (
    <Box sx={{ marginBottom: '15px' }}>
      <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'row' }}>
        <h5 id="onewager_team_name">{wager.team_name}</h5>
        <h5 id="onewager_header_odds">
          {wager.odds.toFixed(2)} {decimal_to_american(wager.odds)}
        </h5>
      </Box>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <TextField
          size="small"
          variant="outlined"
          label="Risk"
          onChange={(e) => setRisk(e.target.value)}
          value={risk}
          sx={{ width: '46%' }}
        ></TextField>
        <TextField
          size="small"
          variant="outlined"
          label="Win"
          value={win}
          sx={{ width: '46%' }}
        ></TextField>
      </Box>
    </Box>
  );
}

export default function WagerSlip() {
  const incoming_wagers = useSelector((state) => state.wagerslip.wagers);
  const incoming_wagers_arr = Object.values(incoming_wagers);
  const classes = useStyles();
  return (
    <Paper
      sx={{
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        height: '400px',
        top: '125px',
        right: '200px',
      }}
    >
      <Box className={classes.header}>
        <h5>WAGER SLIP</h5>
      </Box>
      <Divider orientation="horizontal" sx={{ width: '100%' }} />
      <Box className={classes.wagers_container}>
        {incoming_wagers_arr[0] &&
          incoming_wagers_arr.map((wager) => {
            return <OneWager wager={wager} />;
          })}
      </Box>
    </Paper>
  );
}
