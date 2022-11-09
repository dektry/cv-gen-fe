import { useMemo } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { CustomSelect } from 'common-components/CustomSelect';
import { ILanguage } from 'models/ILanguage';

import { languageLevels, languages } from '../../utils/constants';
import { formattedLanguageLevels } from './utils/helpers';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  language: ILanguage;
  submitText: string;
  onClose: () => void;
  onSubmit: (language: ILanguage) => void;
}

const Schema = Yup.object().shape({
  value: Yup.string().required('Value is required'),
  level: Yup.string().required('Level is required'),
});

export const LanguageForm = ({ language, submitText, onClose, onSubmit }: IProps) => {
  const classes = useStyles({ theme });
  const levelsOptions = useMemo(() => formattedLanguageLevels(languageLevels), []);

  return (
    <Formik initialValues={language} onSubmit={(values) => console.log(values)} validationSchema={Schema}>
      {(props) => {
        const { values, touched, errors, handleChange, handleBlur, setFieldValue } = props;

        const disabled = !values.value || !values.level;

        return (
          <form className={classes.container}>
            <Autocomplete
              options={languages}
              inputValue={values.value || ''}
              disableClearable
              freeSolo
              autoSelect
              onChange={(_, value) => setFieldValue('value', value)}
              onBlur={handleBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={'Language'}
                  name="value"
                  value={values.value || ''}
                  required
                  onChange={(e) => setFieldValue('value', e.target.value)}
                  error={!!(errors.value && touched.value)}
                  helperText={errors.value}
                />
              )}
            />
            <CustomSelect
              options={levelsOptions}
              label={'Language level'}
              name="level"
              value={values.level || ''}
              required
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.level && touched.level)}
              helperText={errors.level}
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
