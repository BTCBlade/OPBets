import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { closeLogin, openSignup } from '../../store/modal.js';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Box, Button, Typography, TextField } from '@material-ui/core';

import './LoginModal.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // const onLogin = async (e) => {
  //   e.preventDefault();
  //   setErrors(['']);
  //   const user = await dispatch(sessionActions.loginUser({ email, password }));
  //   // const data = await user.json()

  //   if (user.errors) {
  //     setErrors(user.errors);
  //   } else {
  //     setAuthenticated(true);
  //   }

  //   dispatch(closeLogin());

  //   // const user = await login(email, password);
  //   // if (!user.errors) {
  //   // } else {
  //   //   setErrors(user.errors);
  //   // }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) {
          setErrors(res.data.errors);
        } else {
          dispatch(closeLogin());
        }
      }
    );
  };
  const demoSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(closeLogin());
    return dispatch(
      sessionActions.login({ credential: 'demo@user.io', password: 'password' })
    ).catch((res) => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });
  };

  // const onDemoLogin = async () => {
  //   setAuthenticated(true);
  //   await dispatch(sessionActions.demoLoginUser());
  //   dispatch(closeLogin());
  // };

  const updateCredential = (e) => {
    setCredential(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const closeModal = () => dispatch(closeLogin());

  const onSwitch = () => {
    dispatch(closeLogin());
    dispatch(openSignup());
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.secondary',
      }}
      borderRadius={8}
    >
      <div className="login-container">
        <Button className="close__modal" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </Button>
        <Typography variant="h3" color="textPrimary" id="login-title">
          Log in
        </Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="login-input-container">
              <TextField
                name="email"
                type="text"
                placeholder="Email"
                value={credential}
                onChange={updateCredential}
                className="login-inputs"
                required
              />
              <div>
                <TextField
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={updatePassword}
                  id="login-pw-input"
                  className="login-inputs"
                  required
                />
              </div>
            </div>
            <Button
              color="primary"
              component="a"
              target="_blank"
              variant="contained"
              type="submit"
              onClick={handleSubmit}
              className="loginFormBtns"
            >
              Log in
            </Button>
          </div>
          <div className="login-or">
            <div className="before-or"></div>
            <div>or</div>
            <div className="after-or"></div>
          </div>
        </form>
        <Button
          color="primary"
          component="a"
          target="_blank"
          variant="contained"
          className="loginFormBtns"
          id="demoBtn"
          onClick={demoSubmit}
          type="button"
        >
          Demo Log in
        </Button>
        <div className="login__switch">
          Don’t have an account?
          <Button onClick={onSwitch} className="login_switch_btn">
            Sign up
          </Button>
        </div>
        <div>
          {errors.map((error) => (
            <div key={error} className="login__errors">
              {error}
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default LoginForm;
