import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  Fab,
  FormControlLabel,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import useSettings from '../../hooks/useSettings';
import AdjustmentsIcon from './AdjustmentsIcon';

const THEMES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};
const ODDS_FORMAT = {
  DECIMAL: 'DECIMAL',
  AMERICAN: 'AMERICAN',
  PERCENTAGE: 'PERCENTAGE',
};

const getValues = (settings) => ({
  compact: settings.compact,
  direction: settings.direction,
  responsiveFontSizes: settings.responsiveFontSizes,
  roundedCorners: settings.roundedCorners,
  theme: settings.theme,
});

const SettingsDrawer = () => {
  const { settings, saveSettings } = useSettings();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(getValues(settings));

  useEffect(() => {
    setValues(getValues(settings));
  }, [settings]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  const handleSave = () => {
    saveSettings(values);
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Settings">
        <Fab
          color="primary"
          onClick={handleOpen}
          size="medium"
          sx={{
            bottom: 0,
            margin: (theme) => theme.spacing(4),
            position: 'fixed',
            right: 0,
            zIndex: (theme) => theme.zIndex.speedDial,
          }}
        >
          <AdjustmentsIcon fontSize="small" />
        </Fab>
      </Tooltip>
      <Drawer
        anchor="right"
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            p: 2,
            width: 320,
          },
        }}
      >
        <Typography color="textPrimary" variant="h6">
          Settings
        </Typography>

        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Odds Format"
            name="oddsFormat"
            onChange={(event) => handleChange('oddsFormat', event.target.value)}
            select
            SelectProps={{ native: true }}
            value={values.oddsFormat}
            variant="outlined"
          >
            {Object.keys(ODDS_FORMAT).map((format) => (
              <option key={format} value={format}>
                {format
                  .split('_')
                  .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
                  .join(' ')}
              </option>
            ))}
          </TextField>
        </Box>

        <Box
          sx={{
            mt: 2,
            px: 1.5,
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={values.theme === 'DARK'}
                color="primary"
                edge="start"
                name="theme"
                onChange={(event) =>
                  handleChange('theme', event.target.checked ? 'DARK' : 'LIGHT')
                }
              />
            }
            label={
              <div>
                Theme
                <Typography
                  color="textSecondary"
                  component="p"
                  variant="caption"
                >
                  Activate DarkMode
                </Typography>
              </div>
            }
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <Button
            color="primary"
            fullWidth
            onClick={handleSave}
            variant="contained"
          >
            Save Settings
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default SettingsDrawer;
