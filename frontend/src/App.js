import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
// import LoginFormPage from "./components/LoginFormPage";

import SignupModal from './components/SignupModal';
import LoginModal from './components/LoginModal';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import MainNavbar from './components/MainNavbar';
import SplashPage from './components/SplashPage';

import { ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import useSettings from './hooks/useSettings';
import { createTheme } from './theme';

import SettingsMenu from './components/SettingsMenu';
import GlobalStyles from './components/GlobalStyles';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { settings } = useSettings();

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, []);

  const theme = createTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme,
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Navigation isLoaded={isLoaded} /> */}
        <SignupModal />
        <LoginModal />
        <MainNavbar />
        <SnackbarProvider dense maxSnack={3}>
          <GlobalStyles />
          {isLoaded && (
            <Switch>
              {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
              <Route exact path="/signup">
                <SignupFormPage />
              </Route>
              <Route exact path="/">
                <SplashPage />
              </Route>
            </Switch>
          )}
        </SnackbarProvider>
        <SettingsMenu />
      </ThemeProvider>
    </>
  );
}

export default App;
