import { useState } from 'react';

import { Typography } from '@mui/material';

import { IProject } from 'models/IProject';

import { AddButton } from 'common-components/AddButton';
import { ProjectCard } from './components/ProjectCard';
import { CreateEditModal } from './components/CreateEditModal';

import { useStyles } from './styles';

interface IProps {
  projects: IProject[];
  handleClickDeleteProjectButton: (project: IProject) => void;
  handleClickDeleteProjectConfirm: (project: IProject) => void;
  handleCloseDeleteProjectModal: () => void;
  handleSaveOrEditProject: (project: IProject, edit: boolean) => void;
  handleOpenCreateModal: () => void;
  handleCloseCreateModal: () => void;
  createModalOpen: boolean;
  handleOpenEditModal: (project: IProject) => void;
  handleCloseEditModal: () => void;
  editModalOpen: boolean;
  isDeleteProjectModalOpen: boolean;
}

export const Projects = ({
  projects,
  handleClickDeleteProjectButton,
  handleClickDeleteProjectConfirm,
  handleCloseDeleteProjectModal,
  handleSaveOrEditProject,
  handleOpenCreateModal,
  handleCloseCreateModal,
  createModalOpen,
  handleCloseEditModal,
  handleOpenEditModal,
  editModalOpen,
  isDeleteProjectModalOpen,
}: IProps) => {
  const classes = useStyles();
  const [error, setError] = useState(false);

  return (
    <>
      <div className={classes.upperContainer}>
        <Typography variant="h2" sx={{ marginBottom: '24px' }}>
          PROJECTS
        </Typography>
        <div className={classes.button}>
          <AddButton onClick={handleOpenCreateModal} />
        </div>
      </div>
      {projects?.map((project, idx) => (
        <ProjectCard
          key={project.id}
          id={idx}
          project={project}
          handleClickDeleteProjectButton={handleClickDeleteProjectButton}
          handleClickDeleteProjectConfirm={handleClickDeleteProjectConfirm}
          handleCloseDeleteProjectModal={handleCloseDeleteProjectModal}
          isDeleteProjectModalOpen={isDeleteProjectModalOpen}
          handleCloseEditModal={handleCloseEditModal}
          handleOpenEditModal={handleOpenEditModal}
          editModalOpen={editModalOpen}
          handleSaveOrEditProject={handleSaveOrEditProject}
          error={error}
          setError={setError}
        />
      ))}
      <CreateEditModal
        isOpen={createModalOpen}
        modalTitle="ADD NEW PROJECT"
        onClose={handleCloseCreateModal}
        onSubmit={handleSaveOrEditProject}
        error={error}
        setError={setError}
      />
    </>
  );
};
