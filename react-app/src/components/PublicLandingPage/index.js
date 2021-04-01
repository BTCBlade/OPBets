import React from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';

import { testLoad } from '../../store/betsapi';

export default function PublicLandingPage() {
  const dispatch = useDispatch();
  const handleTest = () => {
    dispatch(testLoad());
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.secondary',
      }}
    >
      <h1>Public Landing Page</h1>
      <button onClick={handleTest}>test</button>
    </Box>
  );
}
