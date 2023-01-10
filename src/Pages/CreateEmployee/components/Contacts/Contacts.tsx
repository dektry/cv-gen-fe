import { TextField } from '@mui/material';
import { Typography } from '@mui/material';

import { useFormContext, Controller } from 'react-hook-form';

import theme from 'theme/theme';
import { useStyles } from '../../styles';

export const Contacts = () => {
  const classes = useStyles({ theme });

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Typography sx={{ mb: '24px', mt: '8px' }} variant="h2">
        CONTACTS
      </Typography>
      <Controller
        name="mobileNumber"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextField value={value} label={'Mobile number'} placeholder={'Add number'} onChange={onChange} />
        )}
      />
      <div className={classes.gridContainer}>
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              value={value}
              label={'Email'}
              type="email"
              error={!!errors.email?.message}
              helperText={String(errors.email?.message)}
              placeholder={'Add email'}
              required
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="personalEmail"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              value={value}
              label={'Personal email'}
              type="email"
              placeholder={'Add email'}
              onChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
};
