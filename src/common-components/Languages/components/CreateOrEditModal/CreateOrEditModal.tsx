import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { LanguageForm } from '../LanguageForm';
import { ILanguage } from 'models/ILanguage';

interface IProps {
  isOpen: boolean;
  modalTitle: string;
  submitText: string;
  onClose: () => void;
  onSubmit?: () => void;
  language: ILanguage;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<ILanguage>>;
}

export const CreateOrEditModal = ({
  isOpen,
  modalTitle,
  submitText,
  onClose,
  onSubmit,
  language,
  setCurrentLanguage,
}: IProps) => {
  const classes = useStyles({ theme });

  const disabled = !language.value || !language.level;

  const onChange = (fields: Partial<ILanguage>) => {
    setCurrentLanguage((prev) => ({ ...prev, ...fields }));
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.box}>
        <CloseIcon className={classes.closeIcon} onClick={onClose} />
        <Typography variant="h2" className={classes.title}>
          {modalTitle}
        </Typography>
        <LanguageForm language={language} onChange={onChange} />
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
