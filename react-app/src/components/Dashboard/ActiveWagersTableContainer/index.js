import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import { loadAllActiveWagers } from '../../../store/active_wagers';
import ActiveWagersTable from '../ActiveWagersTable';

const ActiveWagersTableContainer = () => {
  const sessionUserId = useSelector((state) => state.session.id);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllActiveWagers(sessionUserId)).then(() => setLoading(false));
  }, []);
  return (
    <>
      {loading && <CircularProgress />}
      {!loading && <ActiveWagersTable />}
    </>
  );
};

export default ActiveWagersTableContainer;