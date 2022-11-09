import { useMemo } from 'react';
import { CustomSelect } from 'common-components/CustomSelect';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { IEducation } from 'models/IEducation';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { yearOptions } from '../../utils/constants';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  education: IEducation;

  onClose: () => void;
  onSubmit: (education: IEducation) => void;
  submitText: string;
}

const Schema = Yup.object().shape({
  university: Yup.string().required('University is required'),
  specialization: Yup.string().required('Specialization is required'),
  startYear: Yup.string().required('Start year is required'),
  endYear: Yup.string().required('End year is required'),
});

export const EducationForm = ({ education, onClose, onSubmit, submitText }: IProps) => {
  const options = useMemo(() => yearOptions(), []);
  const classes = useStyles({ theme });

  return (
    <Formik initialValues={education} onSubmit={(values) => console.log(values)} validationSchema={Schema}>
      {(props) => {
        const { values, touched, errors, handleChange, handleBlur } = props;

        const disabled = !values.university || !values.specialization || !values.startYear || !values.endYear;

        return (
          <form className={classes.container}>
            <TextField
              label={'University'}
              name="university"
              value={values.university || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.university && touched.university)}
              helperText={errors.university}
            />
            <TextField
              label={'Specialization'}
              name="specialization"
              value={values.specialization || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.specialization && touched.specialization)}
              helperText={errors.specialization}
            />
            <CustomSelect
              options={options}
              label={'Start year'}
              name="startYear"
              value={values.startYear || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.startYear && touched.startYear)}
              helperText={errors.startYear}
            />
            <CustomSelect
              options={options}
              label={'End year'}
              name="endYear"
              value={values.endYear || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.endYear && touched.endYear)}
              helperText={errors.endYear}
            />
            <div className={classes.buttonContainer}>
              <Button className={classes.cancelButton} onClick={onClose}>
                Cancel
              </Button>
              <Button className={classes.saveButton} onClick={() => onSubmit(values)} disabled={disabled}>
                {submitText}
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
