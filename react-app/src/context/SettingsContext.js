import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const THEMES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};

const ODDS_FORMAT = {
  DECIMAL: 'DECIMAL',
  AMERICAN: 'AMERICAN',
  PERCENTAGE: 'PERCENTAGE',
};

const initialSettings = {
  compact: true,
  direction: 'ltr',
  responsiveFontSizes: true,
  roundedCorners: false,
  oddsFormat: ODDS_FORMAT.AMERICAN,
  theme: THEMES.LIGHT,
};

export const restoreSettings = () => {
  let settings = null;

  try {
    const storedData = window.localStorage.getItem('settings');

    if (storedData) {
      settings = JSON.parse(storedData);
    } else {
      settings = {
        compact: true,
        direction: 'ltr',
        responsiveFontSizes: true,
        roundedCorners: false,
        theme: window.matchMedia('(prefers-color-scheme: dark)').matches
          ? THEMES.DARK
          : THEMES.LIGHT,
        oddsFormat: 'AMERICAN',
      };
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return settings;
};

export const storeSettings = (settings) => {
  window.localStorage.setItem('settings', JSON.stringify(settings));
};

const SettingsContext = createContext({
  settings: initialSettings,
  saveSettings: () => {},
});

export const SettingsProvider = (props) => {
  const { children } = props;
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setSettings(restoredSettings);
    }
  }, []);

  const saveSettings = (updatedSettings) => {
    setSettings(updatedSettings);
    storeSettings(updatedSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
