import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { CustomSelect } from 'common-components/CustomSelect';

import { ICreateEmployee } from 'models/IEmployee';
import { NullableField } from 'models/TNullableField';

import theme from 'theme/theme';
import { useStyles } from '../../styles';

interface IOption {
  value: string;
  label: string;
}

interface IProps {
  hiredOn: NullableField<string>;
  yearsOfExperience: NullableField<number>;
  position: NullableField<string>;
  level: NullableField<string>;
  positionsOptions: IOption[];
  levelsOptions: IOption[];
  handleChangeInput: (fields: Partial<ICreateEmployee>) => void;
}

export const WorkExperience = ({
  hiredOn,
  yearsOfExperience,
  position,
  level,
  positionsOptions,
  levelsOptions,
  handleChangeInput,
}: IProps) => {
  const classes = useStyles({ theme });

  return (
    <div>
      <Typography sx={{ mb: '8px' }} variant="h2">
        WORK EXPERIENCE
      </Typography>
      <div className={classes.gridContainer}>
        <TextField
          value={hiredOn || ''}
          label={'Hired on'}
          name="hiredOn"
          placeholder={'Add date'}
          type="date"
          required
          onChange={(e) => handleChangeInput({ hiredOn: e.target.value })}
        />
        <TextField
          value={yearsOfExperience || ''}
          label={'Experience in years'}
          name="yearsOfExperience"
          type="number"
          onChange={(e) => handleChangeInput({ yearsOfExperience: Number(e.target.value) })}
        />
        <CustomSelect
          options={positionsOptions}
          value={position || ''}
          label={'Position'}
          name="position"
          required
          onChange={(e) => handleChangeInput({ position: e.target.value })}
        />
        <CustomSelect
          options={levelsOptions}
          value={level || ''}
          label={'Position level'}
          name="level"
          required
          onChange={(e) => handleChangeInput({ level: e.target.value })}
        />
      </div>
    </div>
  );
};
