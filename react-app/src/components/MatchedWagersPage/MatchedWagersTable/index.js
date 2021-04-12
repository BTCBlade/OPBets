import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';
import SearchIcon from '../../../icons/Search';
import Label from './Label';
import { american_to_str } from '../../../utils/odds_conversion';
import { convert_time } from '../../../utils/time_date';

const statusOptions = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Paid',
    value: 'paid',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Canceled',
    value: 'canceled',
  },
];

const sortOptions = [
  {
    label: 'Newest first',
    value: 'createdAt|desc',
  },
  {
    label: 'Oldest first',
    value: 'createdAt|asc',
  },
];

const getStatusLabel = (time_status) => {
  let matchedWagerStatus = '';
  if (time_status === '0') matchedWagerStatus = 'pending';
  if (time_status === '1') matchedWagerStatus = 'pending';
  if (time_status === '3') matchedWagerStatus = 'paid';
  if (['4', '5', '6', '7', '8', '9', '99'].includes(time_status))
    matchedWagerStatus = 'error';
  const map = {
    canceled: {
      color: 'error',
      text: 'Canceled',
    },
    paid: {
      color: 'success',
      text: 'Paid',
    },
    pending: {
      color: 'warning',
      text: 'Pending',
    },
  };

  const { text, color } = map[matchedWagerStatus];

  return <Label color={color}>{text}</Label>;
};

// const applyFilters = (matched_wagers, query, filters) =>
//   matched_wagers.filter((invoice) => {
//     let matches = true;

//     if (query) {
//       const properties = ['name', 'email'];
//       let containsQuery = false;

//       properties.forEach((property) => {
//         if (
//           invoice.customer[property].toLowerCase().includes(query.toLowerCase())
//         ) {
//           containsQuery = true;
//         }
//       });

//       if (!containsQuery) {
//         matches = false;
//       }
//     }

//     if (filters.status && invoice.status !== filters.status) {
//       matches = false;
//     }

//     return matches;
//   });

// const applyPagination = (matched_wagers, page, limit) =>
//   matched_wagers.slice(page * limit, page * limit + limit);

const MatchedWagersTable = ({ matched_wagers }) => {
  console.log(matched_wagers);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    status: null,
  });

  const applyFilters = (matched_wagers, query, filters) =>
    matched_wagers.filter((invoice) => {
      let matches = true;

      if (query) {
        const properties = ['name', 'email'];
        let containsQuery = false;

        properties.forEach((property) => {
          if (
            invoice.customer[property]
              .toLowerCase()
              .includes(query.toLowerCase())
          ) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
      }

      if (filters.status && invoice.status !== filters.status) {
        matches = false;
      }

      return matches;
    });

  const applyPagination = (matched_wagers, page, limit) =>
    matched_wagers.slice(page * limit, page * limit + limit);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleStatusChange = (event) => {
    let value = null;

    if (event.target.value !== 'all') {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  // const filteredMatchedWagers = applyFilters(matched_wagers, query, filters);
  const paginatedMatchedWagers = applyPagination(matched_wagers, page, limit);

  return (
    <Card sx={{ marginLeft: '2rem', marginRight: '2rem' }}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          m: -1,
          p: 2,
        }}
      >
        <Box
          sx={{
            m: 1,
            maxWidth: '100%',
            width: 500,
          }}
        >
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            onChange={handleQueryChange}
            placeholder="Search Matched Wagers"
            value={query}
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            m: 1,
            maxWidth: '100%',
            width: 240,
          }}
        >
          <TextField
            fullWidth
            label="Sort By"
            name="sort"
            onChange={handleSortChange}
            select
            SelectProps={{ native: true }}
            value={sort}
            variant="outlined"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box
          sx={{
            m: 1,
            maxWidth: '100%',
            width: 240,
          }}
        >
          <TextField
            fullWidth
            label="Status"
            name="status"
            onChange={handleStatusChange}
            select
            SelectProps={{ native: true }}
            value={filters.status || 'all'}
            variant="outlined"
          >
            {statusOptions.map((statusOption) => (
              <option key={statusOption.value} value={statusOption.value}>
                {statusOption.label}
              </option>
            ))}
          </TextField>
        </Box>
      </Box>
      <Box sx={{ minWidth: 1200 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Opponent</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Matched Odds</TableCell>
              <TableCell>WagerID</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMatchedWagers.map((matched_wager) => {
              const opponent_username = matched_wager.opponent.username;
              const opponent_email = matched_wager.opponent.email;
              const event_name = JSON.parse(matched_wager.event.league)['name'];
              const event_time = convert_time(
                parseInt(matched_wager.event.time)
              );
              const team_name = matched_wager.is_home
                ? JSON.parse(matched_wager.event.home)['name']
                : JSON.parse(matched_wager.event.away)['name'];
              const matched_odds = matched_wager.is_home
                ? american_to_str(matched_wager.matched_odds_home)
                : american_to_str(matched_wager.matched_odds_away);

              return (
                <TableRow hover key={matched_wager.id}>
                  <TableCell>
                    <Link
                      color="textPrimary"
                      component={RouterLink}
                      to="/dashboard"
                      underline="none"
                      variant="subtitle2"
                    >
                      {opponent_username}
                    </Link>
                    <Typography color="textSecondary" variant="body2">
                      {opponent_email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      {event_name}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {event_time}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      {team_name}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {matched_odds}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      # {matched_wager.id}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {matched_wager.is_liquidity_provider
                        ? 'Liquidity Provider Bonus'
                        : ''}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      {Math.round(matched_wager.amount).toFixed(3)} units
                    </Typography>
                    {getStatusLabel(matched_wager.time_status)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MessageIcon fontSize="small" />
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
        count={matched_wagers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default MatchedWagersTable;
