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

const getStatusLabel = (matchedWagerStatus) => {
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

const applyFilters = (matched_wagers, query, filters) =>
  matched_wagers.filter((invoice) => {
    let matches = true;

    if (query) {
      const properties = ['name', 'email'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (
          invoice.customer[property].toLowerCase().includes(query.toLowerCase())
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

const MatchedWagersTable = ({ matched_wagers }) => {
  console.log(matched_wagers);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    status: null,
  });

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
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMatchedWagers.map((matched_wagers) => {
              return (
                <TableRow hover key={matched_wagers.id}>
                  <TableCell>
                    <Link
                      color="textPrimary"
                      component={RouterLink}
                      to="/dashboard"
                      underline="none"
                      variant="subtitle2"
                    ></Link>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                    ></Typography>
                  </TableCell>
                  <TableCell>{getStatusLabel(matched_wagers.status)}</TableCell>
                  <TableCell>
                    {/* {numeral(invoice.totalAmount).format(
                        `${invoice.currency}0,0.00`
                      )} */}
                  </TableCell>
                  <TableCell>{matched_wagers.id}</TableCell>
                  <TableCell>
                    {/* {format(invoice.issueDate, 'dd/MM/yyyy')} */}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton component={RouterLink} to="/dashboard">
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
