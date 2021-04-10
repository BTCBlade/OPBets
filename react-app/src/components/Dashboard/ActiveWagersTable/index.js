import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Checkbox,
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

const applyPagination = (orders, page, limit) =>
  orders.slice(page * limit, page * limit + limit);

const ActiveWagersTable = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const paginatedOrders = applyPagination(orders, page, limit);

  return (
    <>
      <Card>
        <CardHeader action={<MoreMenu />} title="Active Wagers" />
        <Divider />
        <Box sx={{ minWidth: 1150 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.map((order) => {
                const isOrderSelected = selectedOrders.includes(order.id);

                return (
                  <TableRow
                    hover
                    key={order.id}
                    selected={selectedOrders.indexOf(order.id) !== -1}
                  >
                    <TableCell>
                      <Typography color="textPrimary" variant="subtitle2">
                        {order.number}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        {format(order.createdAt, 'dd MMM yyyy | HH:mm')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="subtitle2">
                        {order.customer.name}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        {order.customer.email}
                      </Typography>
                    </TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>
                      {numeral(order.totalAmount).format(
                        `${order.currency}0,0.00`
                      )}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>

        <TablePagination
          component="div"
          count={orders.length}
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
