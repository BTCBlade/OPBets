import PropTypes from 'prop-types';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openSignup, openLogin } from '../../store/modal';
import LogoutButton from '../auth/LogoutButton';
import {
  AppBar,
  Box,
  Button,
  Chip,
  Divider,
  Hidden,
  IconButton,
  Link,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from './Menu';
import Logo from './Logo';
import OPBLOGO from './OPBLOGO.png';
import './MainNavbar.css';

const MainNavbar = (props) => {
  const { onSidebarMobileOpen, authenticated, setAuthenticated } = props;
  const dispatch = useDispatch();
  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.secondary',
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarMobileOpen}>
            <MenuIcon fontSize="small" />
          </IconButton>
        </Hidden>
        <Hidden lgDown>
          <RouterLink to="/">
            <Box sx={{ marginTop: '5px', height: 60, width: 60 }}>
              <img className="logo-image" src={OPBLOGO} />
            </Box>

            {/* <Logo
              sx={{
                height: 40,
                width: 40,
              }}
            /> */}
          </RouterLink>
        </Hidden>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden mdDown>
          {authenticated && (
            <>
              <Link
                color="textSecondary"
                component={RouterLink}
                to="/events/all"
                underline="none"
                variant="body1"
                mr={4}
              >
                Events
              </Link>
              <Link
                component={RouterLink}
                color="textSecondary"
                to="/dashboard"
                id="nav-login__button"
                underline="none"
                variant="body1"
              >
                Dashboard
              </Link>

              <Divider
                orientation="vertical"
                sx={{
                  height: 32,
                  mx: 2,
                  mr: 3,
                  ml: 3,
                }}
              />
              <LogoutButton setAuthenticated={setAuthenticated} />
            </>
          )}
          {!authenticated && (
            <>
              <Link
                color="textSecondary"
                component={RouterLink}
                to="/"
                underline="none"
                variant="body1"
                mr={6}
              >
                ABOUT
              </Link>
              <Link
                color="textSecondary"
                onClick={() => dispatch(openLogin())}
                id="nav-login__button"
                underline="none"
                variant="body1"
              >
                LOGIN
              </Link>
              <Divider
                orientation="vertical"
                sx={{
                  height: 32,
                  mx: 2,
                  mr: 3,
                  ml: 3,
                }}
              />
              <Button
                color="primary"
                onClick={() => dispatch(openSignup())}
                size="medium"
                target="_blank"
                variant="contained"
              >
                JOIN
              </Button>
            </>
          )}
        </Hidden>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

MainNavbar.propTypes = {
  onSidebarMobileOpen: PropTypes.func,
};

export default MainNavbar;
