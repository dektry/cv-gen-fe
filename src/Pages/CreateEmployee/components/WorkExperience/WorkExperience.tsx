import { TextField } from '@mui/material';
import { Typography } from '@mui/material';

import { useFormContext, Controller } from 'react-hook-form';

import { CustomSelect } from 'common-components/CustomSelect';

import theme from 'theme/theme';
import { useStyles } from '../../styles';

interface IOption {
  value: string;
  label: string;
}

interface IProps {
  positionsOptions: IOption[];
  levelsOptions: IOption[];
}

export const WorkExperience = ({ positionsOptions, levelsOptions }: IProps) => {
  const classes = useStyles({ theme });

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Typography sx={{ mb: '8px' }} variant="h2">
        WORK EXPERIENCE
      </Typography>
      <div className={classes.gridContainer}>
        <Controller
          name="hiredOn"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              value={value}
              label={'Hired on'}
              error={!!errors.hiredOn?.message}
              helperText={String(errors.hiredOn?.message)}
              placeholder={'Add date'}
              type="date"
              required
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="yearsOfExperience"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              value={value}
              label={'Experience in years'}
              name="yearsOfExperience"
              type="number"
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="position"
          control={control}
          render={({ field: { value, onChange } }) => (
            <CustomSelect
              options={positionsOptions}
              value={value || ''}
              label={'Position'}
              error={!!errors.position?.message}
              helperText={String(errors.position?.message)}
              name="position"
              required
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="level"
          control={control}
          render={({ field: { value, onChange } }) => (
            <CustomSelect
              options={levelsOptions}
              value={value || ''}
              label={'Position level'}
              error={!!errors.level?.message}
              helperText={String(errors.level?.message)}
              name="level"
              required
              onChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
};
