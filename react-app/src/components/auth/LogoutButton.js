import React from 'react';
import { logout } from '../../services/auth';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const LogoutButton = ({ setAuthenticated }) => {
  const history = useHistory();
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    history.push('/');
    window.location.reload();
  };

  return (
    <Button
      color="primary"
      size="medium"
      target="_blank"
      variant="contained"
      onClick={onLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
