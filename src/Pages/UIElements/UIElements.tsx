import { useState } from 'react';
import { Button, FormControlLabel, Switch, TextField } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { CustomSelect } from 'common-components/CustomSelect';
import { useStyles } from './styles';
import { AddButton } from 'common-components/AddButton';
import { DeleteButton } from 'common-components/DeleteButton';
import { SkillGroupField } from 'common-components/SkillGroupField';

export const UIElements = () => {
  const classes = useStyles();

  const [error, setError] = useState(false);
  const [level, setLevel] = useState('');
  const [label, setLabel] = useState('');
  const [sectionName, setSectionName] = useState('');
  const [hint, setHint] = useState('');

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
      <div className={classes.row}>
        <p>Add button: </p>
        <AddButton title="Add new section" />
        <AddButton />
      </div>
      <div className={classes.row}>
        <p>Delete button: </p>
        <DeleteButton title="Delete section" />
      </div>
      <div className={classes.row}>
        <p style={{ minWidth: 'fit-content' }}>Section name: </p>
        <SkillGroupField
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          helperText="Field with this name already exists"
          error={error}
          hint={hint}
        />
        <FormControlLabel
          control={
            <Switch
              checked={!!hint}
              onChange={(e) => setHint(e.target.checked ? 'Some reasonable info' : '')}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Hint"
        />
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
