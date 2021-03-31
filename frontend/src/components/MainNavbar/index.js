import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openSignup, openLogin } from '../../store/modal';
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
import MenuIcon from './Menu.js';
import Logo from './Logo';

const MainNavbar = (props) => {
  const { onSidebarMobileOpen } = props;
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
            <Logo
              sx={{
                height: 40,
                width: 40,
              }}
            />
          </RouterLink>
        </Hidden>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden mdDown>
          <Link
            color="textSecondary"
            component={RouterLink}
            to="/about"
            underline="none"
            variant="body1"
            mr={6}
          >
            ABOUT
          </Link>
          <Link
            color="textSecondary"
            onClick={() => dispatch(openLogin())}
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
