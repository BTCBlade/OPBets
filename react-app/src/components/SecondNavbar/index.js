import React from 'react';
import { AppBar, Box, Link } from '@material-ui/core';
import league_icon from './logos/icons8-league-of-legends-50.png';
export default function SecondNavbar() {
  const categories = [
    {
      name: 'LoL',
      icon: league_icon,
    },
  ];

  return (
    <AppBar
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.secondary',
      }}
      style={{ 'margin-top': '65px' }}
    >
      {categories.map((ele) => {
        return (
          <div>
            <div>
              <img src={ele.icon} alt="" />
              {ele.name}
            </div>
          </div>
        );
      })}
    </AppBar>
  );
}
