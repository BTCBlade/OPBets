import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import { loadAllActiveWagers } from '../../../store/active_wagers';
import ActiveWagersTable from '../ActiveWagersTable';

const ActiveWagersTableContainer = () => {
  const sessionUser = useSelector((state) => state.session);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(loadAllActiveWagers(sessionUser.id)).then(() =>
      setLoading(false)
    );
  }, []);
  return (
    <>
      {loading && <CircularProgress />}
      {!loading && <ActiveWagersTable />}
    </>
  );
};

export default ActiveWagersTableContainer;
