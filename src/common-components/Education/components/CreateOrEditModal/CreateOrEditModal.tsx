import { useMemo, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { TextField, FormControl } from '@mui/material';

import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { yearOptions } from '../../utils/constants';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { CustomSelect } from 'common-components/CustomSelect';
import { ICvEducation } from 'models/ICVGeneration';

interface IProps {
  isOpen: boolean;
  modalTitle: string;
  submitText: string;
  onClose: () => void;
  onSubmit?: (education: ICvEducation) => void;
  education: ICvEducation;
}

const schema = yup.object({
  university: yup.string().required(),
  specialization: yup.string().required(),
  startYear: yup.string().required(),
  endYear: yup.string().required(),
});

export const CreateOrEditModal = ({ isOpen, modalTitle, submitText, onClose, onSubmit, education }: IProps) => {
  const classes = useStyles({ theme });

  const options = useMemo(() => yearOptions(), []);

  const {
    control,
    formState: { errors },
    reset,
  } = useForm<ICvEducation>({
    defaultValues: education,
    resolver: yupResolver(schema),
  });

  const values = useWatch<ICvEducation>({
    control,
  });

  useEffect(() => {
    const defaultValues = { ...education };
    reset({ ...defaultValues });
  }, [education]);

  const disabled = !values.university || !values.specialization || !values.startYear || !values.endYear;

  const handleSubmit = (values: Partial<ICvEducation>) => {
    if (onSubmit && values.university && values.specialization && values.startYear && values.endYear) {
      const currEducation: ICvEducation = {
        university: values.university,
        specialization: values.specialization,
        startYear: values.startYear,
        endYear: values.endYear,
      };
      onSubmit(currEducation);
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
              name="university"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label={'University'}
                  value={value || ''}
                  error={!!errors.university?.message}
                  helperText={errors.university?.message}
                  required
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="specialization"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label={'Specialization'}
                  value={value || ''}
                  error={!!errors.specialization?.message}
                  helperText={errors.specialization?.message}
                  required
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="startYear"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomSelect
                  options={options}
                  label={'Start year'}
                  value={value || ''}
                  error={!!errors.startYear?.message}
                  helperText={errors.startYear?.message}
                  required
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="endYear"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomSelect
                  options={options}
                  label={'End year'}
                  value={value || ''}
                  error={!!errors.endYear?.message}
                  helperText={errors.endYear?.message}
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
