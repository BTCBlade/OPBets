import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { decimal_to_probability } from '../../../utils/odds_conversion';
import { addOne } from '../../../store/wagerslip';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    // '&:nth-of-type(odd)': {
    //   backgroundColor: 'lightgrey',
    // },
  },
});
const useStyles = makeStyles({
  TableContainer: {
    width: '600px',
    marginRight: 0,
  },
});

function Row(props) {
  const dispatch = useDispatch();
  const handlePredictionIdClick = (row) => {
    alert(`db_prediction_id ${row}`);
    dispatch(addOne(row));
  };
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        {row.wagers[0] && (
          <TableCell className="IconButton">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        {!row.wagers[0] && <TableCell className="IconButton"></TableCell>}
        <TableCell
          onClick={() => handlePredictionIdClick(row)}
          component="th"
          scope="row"
        >
          {row.is_home ? row.league_name : row.time}
        </TableCell>
        <TableCell onClick={() => handlePredictionIdClick(row)} align="right">
          {row.team_name}
        </TableCell>
        <TableCell onClick={() => handlePredictionIdClick(row)} align="right">
          {row.odds}
        </TableCell>
        <TableCell onClick={() => handlePredictionIdClick(row)} align="right">
          {decimal_to_probability(parseFloat(row.odds))}%
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Wagers
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.wagers &&
                    row.wagers.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.user.username}
                        </TableCell>
                        <TableCell>{historyRow.current_amount}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function EventsTable() {
  const events = useSelector((state) => state.events);
  const classes = useStyles();

  let rows = [];
  Object.values(events).forEach((event, index) => {
    const event_date = new Date(event.time * 1000);

    const date_1 = event_date.toLocaleString().split(',');
    const date_display =
      date_1[0] + '  ' + date_1[1].slice(0, 5) + date_1[1].slice(9);
    const home_obj = {
      db_predictions_id: event.predictions[0].id,
      is_home: event.predictions[0].is_home,
      league_name: event.league.name,
      time: date_display,
      team_name: event.home.name,
      team_img: event.home.image_id,
      odds: parseFloat(event.predictions[0].odds),
      wagers: event.predictions[0].wagers,
    };
    const away_obj = {
      db_predictions_id: event.predictions[1].id,
      is_home: event.predictions[1].is_home,
      league_name: event.league.name,
      time: date_display,
      team_name: event.away.name,
      team_img: event.away.image_id,
      odds: parseFloat(event.predictions[1].odds),
      wagers: event.predictions[1].wagers,
    };
    rows.push(home_obj);
    rows.push(away_obj);
  });

  return (
    <TableContainer className={classes.TableContainer} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Event/Time</TableCell>
            <TableCell align="right">Team</TableCell>
            <TableCell align="right">ML Odds</TableCell>
            <TableCell align="right">Implied Probability</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={row.db_predictions_id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
