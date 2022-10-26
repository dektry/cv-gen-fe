import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { EducationForm } from '../EducationForm';
import { IEducation } from 'models/IEducation';

interface IProps {
  isOpen: boolean;
  modalTitle: string;
  submitText: string;
  onClose: () => void;
  onSubmit?: () => void;
  education: IEducation;
  setCurrentEducation: React.Dispatch<React.SetStateAction<IEducation>>;
}

export const CreateOrEditModal = ({
  isOpen,
  modalTitle,
  submitText,
  onClose,
  onSubmit,
  education,
  setCurrentEducation,
}: IProps) => {
  const classes = useStyles({ theme });

  const disabled = !education.university || !education.specialization || !education.startYear || !education.endYear;

  const onChange = (fields: Partial<IEducation>) => {
    setCurrentEducation((prev) => ({ ...prev, ...fields }));
  };

  console.log(education);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.box}>
        <CloseIcon className={classes.closeIcon} onClick={onClose} />
        <Typography variant="h2" className={classes.title}>
          {modalTitle}
        </Typography>
        <EducationForm education={education} onChange={onChange} />
        <div className={classes.buttonContainer}>
          <Button className={classes.cancelButton} onClick={onClose}>
            Cancel
          </Button>
          <Button className={classes.saveButton} onClick={onSubmit} disabled={disabled}>
            {submitText}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
