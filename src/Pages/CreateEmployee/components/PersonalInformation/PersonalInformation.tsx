import { TextField } from '@mui/material';
import { CustomSelect } from 'common-components/CustomSelect';

import { useFormContext, Controller } from 'react-hook-form';

import { timezones } from '../../utils/constants';

import theme from 'theme/theme';
import { useStyles } from '../../styles';

export const PersonalInformation = () => {
  const classes = useStyles({ theme });

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={classes.gridContainer}>
      <Controller
        name="firstName"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextField
            value={value}
            label={'First name'}
            error={!!errors.firstName?.message}
            helperText={String(errors.firstName?.message)}
            placeholder={'Add first name'}
            required
            onChange={onChange}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextField
            value={value}
            label={'Last name'}
            error={!!errors.lastName?.message}
            helperText={String(errors.lastName?.message)}
            placeholder={'Add last name'}
            required
            onChange={onChange}
          />
        )}
      />
      <Controller
        name="gender"
        control={control}
        render={({ field: { value, onChange } }) => (
          <CustomSelect
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
            value={value || ''}
            label={'Gender'}
            error={!!errors.gender?.message}
            helperText={String(errors.gender?.message)}
            required
            onChange={onChange}
          />
        )}
      />
      <Controller
        name="location"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextField
            value={value}
            label={'Location'}
            error={!!errors.location?.message}
            helperText={String(errors.location?.message)}
            placeholder={'Add location'}
            required
            onChange={onChange}
          />
        )}
      />
      <Controller
        name="timezone"
        control={control}
        render={({ field: { value, onChange } }) => (
          <CustomSelect options={timezones} value={value || ''} label={'Time zone'} onChange={onChange} />
        )}
      />
    </div>
  );
};
