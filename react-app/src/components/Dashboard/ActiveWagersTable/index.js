import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { convert_time } from '../../../utils/time_date';
import { american_to_str } from '../../../utils/odds_conversion';
import CircularProgress from './CircularProgress';
import { cancelOneWager } from '../../../store/active_wagers';

const applyPagination = (wagers, page, limit) =>
  wagers.slice(page * limit, page * limit + limit);

const ActiveWagersTable = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const wagers = useSelector((state) => state.active_wagers);
  const dispatch = useDispatch();

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };
  const cancelWager = (wagerId) => {
    dispatch(cancelOneWager(wagerId));
  };

  const paginatedWagers = applyPagination(wagers, page, limit);

  return (
    <>
      <Card
        sx={{ marginLeft: '2rem', marginRight: '2rem', borderRadius: '1.5rem' }}
      >
        <CardHeader title="Active Wagers" />
        <Divider />
        <Box sx={{ minWidth: 1150 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event</TableCell>
                <TableCell>WagerId</TableCell>
                <TableCell>Team</TableCell>
                <TableCell>Initial Odds</TableCell>
                <TableCell>WiseWager™</TableCell>
                <TableCell>Current Amount</TableCell>
                <TableCell>Percentage Filled</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedWagers.map((wager) => {
                const eventName = JSON.parse(wager.prediction.event.league)[
                  'name'
                ];
                const eventTimeStr = convert_time(
                  parseInt(wager.prediction.event.time)
                );
                const teamName = wager.prediction.is_home
                  ? JSON.parse(wager.prediction.event.home)['name']
                  : JSON.parse(wager.prediction.event.away)['name'];
                const timePlaced = new Date(wager.time_created)
                  .toLocaleString()
                  .split(',')
                  .join(' ');
                const initialOddsStr = american_to_str(wager.initial_odds);
                const currentOddsStr = american_to_str(wager.prediction.odds);
                const cancelOddsStr =
                  (wager.lower_cancel_odds
                    ? american_to_str(wager.lower_cancel_odds)
                    : '') +
                  ' | ' +
                  (wager.higher_cancel_odds
                    ? american_to_str(wager.higher_cancel_odds)
                    : '');
                const current_amount = wager.current_amount;
                const initial_amount = wager.initial_amount;
                const percentageFilled = Math.round(
                  ((initial_amount - current_amount) / initial_amount) * 100
                );
                return (
                  <TableRow hover key={wager.id}>
                    <TableCell>
                      <Typography color="textPrimary" variant="subtitle2">
                        {eventName}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        {eventTimeStr}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="subtitle2">
                        #{wager.id}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        {timePlaced}
                      </Typography>
                    </TableCell>
                    <TableCell>{teamName}</TableCell>
                    <TableCell>{initialOddsStr}</TableCell>
                    <TableCell align="center">{cancelOddsStr}</TableCell>
                    <TableCell>
                      {current_amount.toFixed(2)}/
                      <Typography color="textSecondary" variant="body2">
                        {initial_amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <Box sx={{ mr: 2 }}>
                          <Typography
                            align="right"
                            color="textPrimary"
                            variant="subtitle2"
                          >
                            {percentageFilled}%
                          </Typography>
                          <Typography color="textSecondary" variant="body2">
                            Amount Filled
                          </Typography>
                        </Box>
                        <CircularProgress value={percentageFilled} />
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => cancelWager(wager.id)}>
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>

        <TablePagination
          component="div"
          count={wagers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

export default ActiveWagersTable;
