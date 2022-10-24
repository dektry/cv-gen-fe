import { useMemo } from 'react';
import { CustomSelect } from 'common-components/CustomSelect';
import { TextField } from '@mui/material';
import { IEducation } from 'models/IEducation';

import { yearOptions } from '../../utils/constants';

import { useStyles } from './styles';

interface IProps {
  education: IEducation;
  onChange: (fields: Partial<IEducation>) => void;
}

export const EducationForm = ({ education, onChange }: IProps) => {
  const options = useMemo(() => yearOptions(), []);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TextField
        label={'University'}
        name="university"
        value={education?.university || ''}
        required
        onChange={(e) => onChange({ university: e.target.value })}
      />
      <TextField
        label={'Specialization'}
        name="specialization"
        value={education?.specialization || ''}
        required
        onChange={(e) => onChange({ specialization: e.target.value })}
      />
      <CustomSelect
        options={options}
        label={'Start year'}
        name="startYear"
        value={education?.startYear || ''}
        required
        onChange={(e) => onChange({ startYear: Number(e.target.value) })}
      />
      <CustomSelect
        options={options}
        label={'End year'}
        name="endYear"
        value={education?.endYear || ''}
        required
        onChange={(e) => onChange({ endYear: Number(e.target.value) })}
      />
    </div>
  );
};
