import { TextField } from '@mui/material';
import { CustomSelect } from 'common-components/CustomSelect';

import { ICreateEmployee } from 'models/IEmployee';
import { NullableField } from 'models/TNullableField';

import { timezones } from '../../utils/constants';

import theme from 'theme/theme';
import { useStyles } from '../../styles';

interface IProps {
  firstName: string;
  lastName: string;
  gender: NullableField<string>;
  location: NullableField<string>;
  timezone: NullableField<string>;
  handleChangeInput: (fields: Partial<ICreateEmployee>) => void;
}

export const PersonalInformation = ({ firstName, lastName, gender, location, timezone, handleChangeInput }: IProps) => {
  const classes = useStyles({ theme });
  return (
    <div className={classes.gridContainer}>
      <TextField
        value={firstName}
        label={'First name'}
        name="firstName"
        placeholder={'Add first name'}
        required
        onChange={(e) => handleChangeInput({ firstName: e.target.value })}
      />
      <TextField
        value={lastName}
        label={'Last name'}
        name="lastName"
        placeholder={'Add last name'}
        required
        onChange={(e) => handleChangeInput({ lastName: e.target.value })}
      />
      <CustomSelect
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
        value={gender || ''}
        label={'Gender'}
        name="gender"
        required
        onChange={(e) => handleChangeInput({ gender: e.target.value })}
      />
      <TextField
        value={location || ''}
        label={'Location'}
        name="location"
        placeholder={'Add location'}
        required
        onChange={(e) => handleChangeInput({ location: e.target.value })}
      />
      <CustomSelect
        options={timezones}
        value={timezone || ''}
        label={'Time zone'}
        name="timezone"
        onChange={(e) => handleChangeInput({ timezone: e.target.value })}
      />
    </div>
  );
};
