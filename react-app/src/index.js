import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import configureStore from './store';
import { Provider } from 'react-redux';

import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import { SettingsProvider } from './context/SettingsContext.js';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  // restoreCSRF();

  // window.csrfFetch = fetch;
  window.store = store;
  // window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SettingsProvider>
            <App />
          </SettingsProvider>
        </LocalizationProvider>
      </StyledEngineProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
