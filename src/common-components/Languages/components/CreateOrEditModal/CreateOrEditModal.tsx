import { useEffect, useMemo } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { CustomSelect } from 'common-components/CustomSelect';
import { ILanguage } from 'models/ILanguage';

import { languageLevels, languages } from '../../utils/constants';
import { formattedLanguageLevels } from './utils/helpers';

interface IProps {
  isOpen: boolean;
  modalTitle: string;
  submitText: string;
  onClose: () => void;
  onSubmit?: (language: ILanguage) => void;
  language: ILanguage;
}

const schema = yup.object({
  value: yup.string().required(),
  level: yup.string().required(),
});

export const CreateOrEditModal = ({ isOpen, modalTitle, submitText, onClose, onSubmit, language }: IProps) => {
  const classes = useStyles({ theme });
  const levelsOptions = useMemo(() => formattedLanguageLevels(languageLevels), []);

  const {
    control,
    formState: { errors },
    reset,
  } = useForm<ILanguage>({
    defaultValues: language,
    resolver: yupResolver(schema),
  });

  const values = useWatch<ILanguage>({
    control,
  });

  useEffect(() => {
    const defaultValues = { ...language };
    reset({ ...defaultValues });
  }, [language]);

  const disabled = !values.value || !values.level;

  const handleSubmit = (values: Partial<ILanguage>) => {
    if (onSubmit && values.value && values.level) {
      const currLanguage: ILanguage = {
        value: values.value,
        level: values.level,
      };
      onSubmit(currLanguage);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.box}>
        <CloseIcon className={classes.closeIcon} onClick={onClose} />
        <Typography variant="h2" className={classes.title}>
          {modalTitle}
        </Typography>
        <FormControl>
          <div className={classes.container}>
            <Controller
              name="value"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  options={languages}
                  inputValue={value || ''}
                  disableClearable
                  freeSolo
                  autoSelect
                  onChange={(_, value) => onChange(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={'Language'}
                      name="value"
                      value={value || ''}
                      error={!!errors.value?.message}
                      helperText={errors.value?.message}
                      required
                      onChange={onChange}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="level"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomSelect
                  options={levelsOptions}
                  label={'Language level'}
                  name="level"
                  value={value || ''}
                  error={!!errors.level?.message}
                  helperText={errors.level?.message}
                  required
                  onChange={onChange}
                />
              )}
            />
          </div>
        </FormControl>
        <div className={classes.buttonContainer}>
          <Button className={classes.cancelButton} onClick={onClose}>
            Cancel
          </Button>
          <Button className={classes.saveButton} onClick={() => handleSubmit(values)} disabled={disabled}>
            {submitText}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
