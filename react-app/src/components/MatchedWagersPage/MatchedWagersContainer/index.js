import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import MatchedWagersTable from '../MatchedWagersTable';

const MatchedWagersContainer = () => {
  const sessionUserId = useSelector((state) => state.session.id);
  const [loading, setLoading] = useState(true);
  const [matched_wagers, setMatchedWagers] = useState([]);

  useEffect(() => {
    fetch(`/api/users/${sessionUserId}/matched_wagers`)
      .then((res) => res.json())
      .then((data) => {
        setMatchedWagers(data[matched_wagers]);
        console.log(matched_wagers);
        setLoading(false);
      });
  }, [sessionUserId]);
  return (
    <>
      {loading && <CircularProgress />}
      {!loading && <MatchedWagersTable matched_wagers={matched_wagers} />}
    </>
  );
};

export default MatchedWagersContainer;
