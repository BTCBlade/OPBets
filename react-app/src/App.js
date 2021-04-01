import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SignupModal from './components/SignupModal';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './services/auth';
import * as sessionActions from './store/session';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core';
import { createTheme } from './theme';
import GlobalStyles from './components/GlobalStyles';
import useSettings from './hooks/useSettings';
import SettingsMenu from './components/SettingsMenu';

import MainNavbar from './components/MainNavbar';

import PublicLandingPage from './components/PublicLandingPage';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { settings } = useSettings();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  const theme = createTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme,
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <MainNavbar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
        <LoginModal
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
        <SignupModal
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
        <Switch>
          <Route exact path="/">
            <PublicLandingPage />
          </Route>
          {/* <ProtectedRoute
            path="/"
            exact={true}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          >
            <h1>My Home Page</h1>
          </ProtectedRoute> */}
          {/* <Route path="/login" exact={true}>
            <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            />
            </Route>
            <Route path="/sign-up" exact={true}>
            <SignUpForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
            </Route>
            <ProtectedRoute
            path="/users"
            exact={true}
            authenticated={authenticated}
            >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute
            path="/users/:userId"
            exact={true}
            authenticated={authenticated}
          >
            <User />
          </ProtectedRoute> */}
        </Switch>
        <SettingsMenu />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
