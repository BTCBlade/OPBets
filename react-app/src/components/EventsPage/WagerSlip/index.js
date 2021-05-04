import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  TextField,
  Typography,
  IconButton,
  Divider,
  Paper,
  Box,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import {
  decimal_to_american,
  american_to_decimal,
} from '../../../utils/odds_conversion';
import { removeOne, submitWager } from '../../../store/wagerslip';
import { loadSpecificEvents } from '../../../store/events';
import { openWagerMatchingProgress } from '../../../store/modal';
import { useParams } from 'react-router-dom';

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

const OneWager = ({ wager }) => {
  const [riskAmount, setRiskAmount] = useState();
  const [win, setWin] = useState();
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const params = useParams();
  const createWager = async () => {
    dispatch(openWagerMatchingProgress());
    let message = await dispatch(
      submitWager(session.id, wager.db_predictions_id, riskAmount)
    );
    await dispatch(loadSpecificEvents(params.query_str));
  };

  return (
    <Box key={wager.id} sx={{ marginBottom: '15px' }}>
      <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'row' }}>
        <h5 id="onewager_team_name">{wager.team_name}</h5>
        <h5 id="onewager_header_odds">{wager.odds}</h5>
        {/* <IconButton
          hover="pointer"
          onClick={() => dispatch(removeOne(wager.db_predictions_id))}
          id="onewager_remove"
        >
          <ClearIcon fontSize="small" />
        </IconButton> */}
        <h5
          hover="pointer"
          onClick={() => dispatch(removeOne(wager.db_predictions_id))}
          id="onewager_remove"
        >
          x
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
          onChange={(e) => {
            setRiskAmount(e.target.value);
            setWin(
              e.target.value
                ? e.target.value * american_to_decimal(parseInt(wager.odds)) -
                    e.target.value
                : ''
            );
          }}
          inputRef={(input) => input && input.focus()}
          value={riskAmount}
          sx={{ width: '46%' }}
        ></TextField>
        <TextField
          size="small"
          variant="outlined"
          value={win}
          sx={{ width: '46%' }}
        ></TextField>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '5px',
        }}
      >
        <Button onClick={createWager} align="center" mx="auto" size="small">
          Attempt Matching
        </Button>
      </Box>
    </Box>
  );
};

export default function WagerSlip() {
  const incoming_wagers = useSelector((state) => state.wagerslip);
  const incoming_wagers_arr = incoming_wagers.order.map((ele) => {
    return incoming_wagers.wagers[ele];
  });
  const classes = useStyles();
  return (
    <Paper
      sx={{
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        height: '400px',
        padding: '0',
        top: '125px',
        right: '100px',
        overflow: 'auto',
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
