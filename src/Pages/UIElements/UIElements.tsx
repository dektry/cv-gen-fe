import { useState } from 'react';
import { FormControlLabel, Switch, TextField } from '@mui/material';

import { useStyles } from './styles';

export const UIElements = () => {
  const classes = useStyles();

  const [error, setError] = useState(false);

  return (
    <div style={{ background: '#fff' }}>
      <h1>UI Elements</h1>
      <div className={classes.row}>
        <p>CustomInput: </p>
        <TextField
          label="Email"
          placeholder="Enter email"
          error={error}
          helperText={'Incorrect email'}
          onChange={() => setError(false)}
        />
        <FormControlLabel
          control={
            <Switch checked={error} onChange={() => setError(!error)} inputProps={{ 'aria-label': 'controlled' }} />
          }
          label="Error"
        />
      </div>
    </div>
  );
};
