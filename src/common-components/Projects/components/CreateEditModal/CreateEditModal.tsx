import { useEffect, useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import { employeesSelector } from 'store/reducers/employees';

import { IProject } from 'models/IProject';

import { useStyles } from './styles';
import theme from 'theme/theme';

import { ProjectForm } from '../ProjectForm';
import { SaveButton } from '../../../SaveButton';
import { formatProject } from './utils/helpers/formatProject';

interface IProps {
  isOpen: boolean;
  modalTitle: string;
  onClose: () => void;
  onSubmit?: (project: IProject) => void;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectInfo: React.Dispatch<React.SetStateAction<Partial<IProject> | null>>;
  projectInfo: Partial<IProject> | null;
  handleAddToState?: (project: IProject) => void;
}

export const CreateEditModal = ({
  isOpen,
  modalTitle,
  onClose,
  onSubmit,
  error,
  setError,
  setProjectInfo,
  projectInfo,
  handleAddToState,
}: IProps) => {
  const classes = useStyles({ theme });

  const [openChildModal, setOpenChildModal] = useState(false);

  const { currentEmployee } = useSelector(employeesSelector);

  const handleClickSaveButton = () => {
    setOpenChildModal(true);
  };

  const handleChildModalClose = () => {
    setOpenChildModal(false);
  };

  const handleSubmit = () => {
    if (projectInfo && projectInfo && onSubmit) {
      const projectToSave = formatProject(projectInfo, currentEmployee);
      onSubmit(projectToSave);
      setOpenChildModal(false);
      onClose();
    } else if (handleAddToState && projectInfo) {
      const projectToAdd = formatProject(projectInfo);
      handleAddToState(projectToAdd);
    }
  };

  useEffect(() => {
    return () => {
      setProjectInfo(null);
    };
  }, []);

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box className={classes.box}>
          <CloseIcon className={classes.closeIcon} onClick={onClose} />
          <Typography variant="h2" className={classes.title}>
            {modalTitle}
          </Typography>
          <ProjectForm project={projectInfo} setCommonError={setError} setProjectInfo={setProjectInfo} />
          <div className={classes.buttonContainer}>
            <Button className={classes.cancelButton} onClick={onClose}>
              Cancel
            </Button>
            <SaveButton title={'Save Changes'} handleSave={handleClickSaveButton} error={error} />
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
            <Button className={classes.cancelButton} onClick={handleChildModalClose}>
              No
            </Button>
            <SaveButton title={'Yes'} handleSave={handleSubmit} error={false} />
          </div>
        </Box>
      </Modal>
    </>
  );
};
