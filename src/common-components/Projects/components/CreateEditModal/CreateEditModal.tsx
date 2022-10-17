import { useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import { projectsSelector } from 'store/reducers/projects';

import { IProject } from 'models/IProject';

import { useStyles } from './styles';
import theme from 'theme/theme';

import { ProjectForm } from '../ProjectForm';
import { SaveButton } from '../../../SaveButton';

interface IProps {
  isOpen: boolean;
  modalTitle: string;
  onClose: () => void;
  onSubmit?: (project: IProject, edit: boolean) => void;
  error: boolean;
  edit?: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateEditModal = ({ isOpen, modalTitle, onClose, onSubmit, error, setError, edit = false }: IProps) => {
  const classes = useStyles({ theme });

  const [openChildModal, setOpenChildModal] = useState(false);

  const { currentProject } = useSelector(projectsSelector);

  const handleClickSaveButton = () => {
    setOpenChildModal(true);
  };

  const handleChildModalClose = () => {
    setOpenChildModal(false);
  };

  const handleSubmit = () => {
    if (currentProject && onSubmit) {
      console.log(currentProject);

      onSubmit(currentProject, edit);
    }
    setOpenChildModal(false);
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box className={classes.box}>
          <CloseIcon className={classes.closeIcon} onClick={onClose} />
          <Typography variant="h2" className={classes.title}>
            {modalTitle}
          </Typography>
          <ProjectForm project={currentProject} setError={setError} />
          <div className={classes.buttonContainer}>
            <Button className={classes.cancelButton} onClick={onClose}>
              Cancel
            </Button>
            <SaveButton
              width="185px"
              title={'Save Changes'}
              handleClickOkButton={handleClickSaveButton}
              error={error}
            />
          </div>
        </Box>
      </Modal>
      <Modal open={openChildModal} onClose={handleChildModalClose}>
        <Box className={classes.innerBox}>
          <CloseIcon className={classes.closeChildModalIcon} onClick={handleChildModalClose} />
          <Typography variant="h2" className={classes.title}>
            SAVE CHANGES
          </Typography>
          <Typography variant="h3" className={classes.text}>
            Do you want to save changes before moving on to another action?
          </Typography>
          <div className={classes.buttonContainer}>
            <Button className={classes.cancelButton} onClick={onClose}>
              No
            </Button>
            <SaveButton width="94px" title={'Yes'} handleClickOkButton={handleSubmit} error={false} />
          </div>
        </Box>
      </Modal>
    </>
  );
};
