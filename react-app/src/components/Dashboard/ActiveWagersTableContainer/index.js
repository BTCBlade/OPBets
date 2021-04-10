import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import { loadAllActiveWagers } from '../../../store/active_wagers';
//import OneEvent from '../OneEvent';
// import ActiveWagersTable from '../ActiveWagersTable';

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
      {/* {!loading && <ActiveWagersTAble />} */}
    </>
  );
};

export default ActiveWagersTableContainer;
