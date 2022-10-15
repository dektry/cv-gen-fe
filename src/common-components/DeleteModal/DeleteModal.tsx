import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { Typography } from '@mui/material';

interface IProps {
  isOpen: boolean;
  modalTitle: string;
  modalText?: string;
  onClose: () => void;
  onSubmit?: () => void;
}

export const DeleteModal = ({
  isOpen,
  modalTitle,
  modalText = 'Are you sure you want to delete this section? All data will be lost',
  onClose,
  onSubmit,
}: IProps) => {
  const classes = useStyles({ theme });

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.box}>
        <CloseIcon className={classes.closeIcon} onClick={onClose} />
        <Typography variant="h2" className={classes.title}>
          {modalTitle}
        </Typography>
        <Typography variant="h3" className={classes.text}>
          {modalText}
        </Typography>
        <div className={classes.buttonContainer}>
          <Button className={classes.noButton} onClick={onClose}>
            No
          </Button>
          <Button className={classes.yesButton} onClick={onSubmit}>
            Yes
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
