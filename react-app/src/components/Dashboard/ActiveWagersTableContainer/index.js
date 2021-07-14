import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { loadAllActiveWagers } from '../../../store/active_wagers';
import ActiveWagersTable from '../ActiveWagersTable';

const useStyles = makeStyles({
  CircularProgress: {
    marginLeft: 50,
  },
});

const ActiveWagersTableContainer = () => {
  const sessionUser = useSelector((state) => state.session);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(async () => {
    await dispatch(loadAllActiveWagers(sessionUser.id)).then(() =>
      setLoading(false)
    );
  }, []);
  return (
    <>
      {loading && <CircularProgress className={classes.CircularProgress} />}
      {!loading && <ActiveWagersTable />}
    </>
  );
};

export default ActiveWagersTableContainer;
