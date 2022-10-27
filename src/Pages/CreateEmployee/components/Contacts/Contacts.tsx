import { TextField } from '@mui/material';
import { Typography } from '@mui/material';

import { ICreateEmployee } from 'models/IEmployee';
import { NullableField } from 'models/TNullableField';

import theme from 'theme/theme';
import { useStyles } from '../../styles';

interface IProps {
  mobileNumber: NullableField<string>;
  email: NullableField<string>;
  personalEmail: NullableField<string>;
  handleChangeInput: (fields: Partial<ICreateEmployee>) => void;
}

export const Contacts = ({ mobileNumber, email, personalEmail, handleChangeInput }: IProps) => {
  const classes = useStyles({ theme });

  return (
    <div>
      <Typography sx={{ mb: '16px' }} variant="h2">
        CONTACTS
      </Typography>
      <TextField
        value={mobileNumber || ''}
        label={'Mobile number'}
        name="mobileNumber"
        placeholder={'Add number'}
        onChange={(e) => handleChangeInput({ mobileNumber: e.target.value })}
      />
      <div className={classes.gridContainer}>
        <TextField
          value={email || ''}
          label={'Email'}
          name="email"
          type="email"
          placeholder={'Add email'}
          required
          onChange={(e) => handleChangeInput({ email: e.target.value })}
        />
        <TextField
          value={personalEmail || ''}
          label={'Personal email'}
          name="personalEmail"
          type="email"
          placeholder={'Add email'}
          onChange={(e) => handleChangeInput({ personalEmail: e.target.value })}
        />
      </div>
    </div>
  );
};
