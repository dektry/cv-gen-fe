import { useState } from 'react';
import { Button, FormControlLabel, Switch, TextField } from '@mui/material';

import { CustomSelect } from 'common-components/CustomSelect';
import { useStyles } from './styles';

export const UIElements = () => {
  const classes = useStyles();

  const [error, setError] = useState(false);
  const [level, setLevel] = useState('');
  const [label, setLabel] = useState('');

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
      <div className={classes.row}>
        <p>CustomSelect: </p>
        <CustomSelect
          label={label}
          options={mockOptions}
          value={level}
          onChange={(value) => setLevel(value.target.value)}
          error={error}
          helperText={'Incorrect label'}
        />
        <FormControlLabel
          control={
            <Switch
              checked={!!label}
              onChange={(e) => setLabel(e.target.checked ? 'Label' : '')}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Label"
        />
        <Button variant="contained" onClick={() => setLevel('')}>
          Reset level
        </Button>
      </div>
    </div>
  );
};

const mockOptions = [
  { value: '', label: 'None' },
  { value: '1', label: 'Junior' },
  { value: '2', label: 'Middle' },
  { value: '3', label: 'Senior' },
];
