import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  Link,
  Typography,
} from '@material-ui/core';

import ClipboardListIcon from '../../icons/ClipboardList';
import UserIcon from '../../icons/User';
import CashierIcon from '../../icons/ShoppingCart';

import MemoryIcon from '@material-ui/icons/Memory';
import ProfilePic from '../../icons/Blitzcrank-Icon.png';
import LoLIcon from '../../icons/icons8-league-of-legends.js';
import CSGOIcon from '../../icons/icons8-counter-strike.js';
import OverwatchIcon from '../../icons/icons8-overwatch.js';
import Dota2Icon from '../../icons/icons8-dota-2.js';
import ApexLegendsIcon from '../../icons/icons8-apex-legends.js';
import AAIcon from '../../icons/aA_favicon';
import FlagIcon from '../../icons/flag_icon.js';
import NavSection from './NavSection';
import Scrollbar from './Scrollbar';

const sections = [
  {
    title: 'Account',
    items: [
      {
        title: 'Profile',
        path: '/dashboard',
        icon: <UserIcon fontSize="small" />,
      },
      {
        title: 'Cashier',
        path: '/dashboard',
        icon: <CashierIcon fontSize="small" />,
      },
      {
        title: 'Wagers',
        path: '/dashboard',
        icon: <ClipboardListIcon fontSize="small" />,
        children: [
          {
            title: 'Open Wagers',
            path: '/dashboard',
          },
          {
            title: 'Matched Wagers',
            path: '/dashboard/matched_wagers',
          },
          {
            title: 'History',
            path: '/dashboard/matched_wagers',
          },
        ],
      },
    ],
  },
  {
    title: 'Esports',
    items: [
      {
        title: 'League of Legends',
        path: '/events/LOL',
        icon: <LoLIcon fontSize="small" />,
      },
      {
        title: 'CS:GO',
        path: '/events/CS:GO',
        icon: <CSGOIcon fontSize="small" />,
      },
      {
        title: 'Overwatch',
        path: '/events/Overwatch',
        icon: <OverwatchIcon fontSize="small" />,
      },
      {
        title: 'Dota2',
        path: '/events/DOTA2',
        icon: <Dota2Icon fontSize="small" />,
      },
      {
        title: 'All Upcoming',
        path: '/events/all',
        icon: <ApexLegendsIcon fontSize="small" />,
      },
    ],
  },
  {
    title: 'Misc',
    items: [
      {
        title: 'App Academy',
        path: '/events/app_academy',
        icon: <AAIcon fontSize="small" />,
      },
      {
        title: 'Small Cap Crypto',
        path: '/events/small_cap_crypto',
        icon: <MemoryIcon fontSize="small" />,
      },
      {
        title: 'Politics',
        path: '/events/politics',
        icon: <FlagIcon fontSize="small" />,
      },
    ],
  },
];

const DashboardSidebar = (props) => {
  const { onMobileClose, openMobile } = props;
  const location = useLocation();
  const sessionUser = useSelector((state) => state.session);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Scrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 2,
            }}
          >
            <RouterLink to="/">
              {/* <Logo
                sx={{
                  height: 40,
                  width: 40,
                }}
              /> */}
            </RouterLink>
          </Box>
        </Hidden>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'background.default',
              borderRadius: 3,
              display: 'flex',
              overflow: 'hidden',
              p: 2,
            }}
          >
            <RouterLink to="/dashboard/dashboard">
              <Avatar
                src={ProfilePic}
                sx={{
                  cursor: 'pointer',
                  height: 48,
                  width: 48,
                }}
              />
            </RouterLink>
            <Box sx={{ ml: 2 }}>
              <Typography color="textPrimary" variant="subtitle2">
                {sessionUser.username}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                Balance:{' '}
                <Link color="primary" component={RouterLink} to="/dashboard">
                  {Math.round(sessionUser.balance)}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {sections.map((section) => (
            <NavSection
              key={section.title}
              pathname={location.pathname}
              sx={{
                '& + &': {
                  mt: 3,
                },
              }}
              {...section}
            />
          ))}
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography color="textPrimary" variant="subtitle2">
            Need Help?
          </Typography>
          <Typography color="textSecondary" variant="body2">
            Contact Us
          </Typography>
          <Button
            color="primary"
            component={RouterLink}
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => fetch('/api/betsapi/update_events')}
            variant="contained"
          >
            Email
          </Button>
        </Box>
      </Scrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          PaperProps={{
            sx: {
              backgroundColor: 'background.paper',
              width: 280,
            },
          }}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          PaperProps={{
            sx: {
              backgroundColor: 'background.paper',
              height: 'calc(100% - 67x) !important',
              top: '67px !important',
              width: 280,
            },
          }}
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default DashboardSidebar;
