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
  setProjectInfo: React.Dispatch<React.SetStateAction<IProject>>;
  projectInfo: IProject;
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

  const handleSubmit = (project: IProject) => {
    if (project && onSubmit) {
      const projectToSave = formatProject(project, currentEmployee);
      onSubmit(projectToSave);
      setOpenChildModal(false);
      onClose();
    } else if (handleAddToState && project) {
      const projectToAdd = formatProject(project);
      handleAddToState(projectToAdd);
    }
  };

  useEffect(() => {
    return () => {
      setProjectInfo({} as IProject);
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
          <ProjectForm
            project={projectInfo}
            setCommonError={setError}
            setProjectInfo={setProjectInfo}
            openChildModal={openChildModal}
            handleChildModalClose={handleChildModalClose}
            handleSubmit={handleSubmit}
          />
          <div className={classes.buttonContainer}>
            <Button className={classes.cancelButton} onClick={onClose}>
              Cancel
            </Button>
            <SaveButton title={'Save Changes'} handleSave={handleClickSaveButton} error={error} />
          </div>
        </Box>
      </Modal>
    </>
  );
};
