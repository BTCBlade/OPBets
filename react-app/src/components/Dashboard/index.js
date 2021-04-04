import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SideBar from '../SideBar';

export default function Dashboard() {
  return (
    <>
      <SideBar />
      <h1>Dashboard</h1>
    </>
  );
}
