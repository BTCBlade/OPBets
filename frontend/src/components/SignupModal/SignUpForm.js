import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { openLogin, closeSignup } from '../../store/modal.js';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Box, Button, Typography, TextField } from '@material-ui/core';

import './SignupModal.css';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(closeSignup());
    return dispatch(sessionActions.signup({ email, username, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
  };

  const demoSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(closeSignup());
    return dispatch(
      sessionActions.login({ credential: 'demo@user.io', password: 'password' })
    ).catch((res) => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const closeModal = () => dispatch(closeSignup());

  const onSwitch = () => {
    closeModal();
    dispatch(openLogin());
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.secondary',
      }}
      borderRadius={8}
    >
      <div className="signup-container">
        <Button
          color="primary"
          className="close__modal__signup"
          onClick={closeModal}
        >
          <i className="fas fa-times"></i>
        </Button>
        <Typography variant="h4" color="textPrimary" id="signup-title">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="signup-inputs-container">
            <div>
              <TextField
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
                placeholder="User Name"
                className="signup-inputs"
                required
              ></TextField>
            </div>
            <div>
              <TextField
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
                placeholder="Email"
                className="signup-inputs"
                required
              ></TextField>
            </div>
            <div>
              <TextField
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
                placeholder="Password"
                className="signup-inputs"
                required
              ></TextField>
            </div>
            <div>
              <TextField
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
                placeholder="Confirm Password"
                className="signup-inputs"
              ></TextField>
            </div>
          </div>
          <Button
            color="primary"
            component="a"
            target="_blank"
            variant="contained"
            onClick={handleSubmit}
            className="signupFormBtns"
            type="submit"
          >
            Sign Up
          </Button>
          <div className="signup-or">
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
          className="signupFormBtns"
          id="demoBtn"
          onClick={demoSubmit}
        >
          Demo Log in
        </Button>
        <div className="signup__switch">
          Already have an account?
          <Button
            color="primary"
            component="a"
            onClick={onSwitch}
            className="signup_switch_btn"
          >
            Log in
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default SignUpForm;
