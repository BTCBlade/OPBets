import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SignupModal from './components/SignupModal';
import LoginModal from './components/LoginModal';

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
import Dashboard from './components/Dashboard';
import EventsPage from './components/EventsPage';
import MatchedWagersPage from './components/MatchedWagersPage';

import EventsPageAA from './components/EventsPageAA';

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
          {/* <Route exact path="/events">
            <EventsPage
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route> */}
          <Route exact path="/events/app_academy">
            <EventsPageAA
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <Route exact path="/events/:query_str">
            <EventsPage
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <ProtectedRoute
            exact
            path="/dashboard"
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          >
            <Dashboard />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/dashboard/matched_wagers"
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          >
            <MatchedWagersPage />
          </ProtectedRoute>
        </Switch>
        <SettingsMenu />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
