import { useState, useCallback } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';

import { Typography } from '@mui/material';

import { useAppDispatch } from 'store';
import {
  TUpdateProjectListPayload,
  createProjectAndUpdateList,
  deleteProjectAndUpdateList,
} from 'store/reducers/projects/thunks';

import { IProject } from 'models/IProject';

import { AddButton } from 'common-components/AddButton';
import { ProjectCard } from './components/ProjectCard';
import { CreateEditModal } from './components/CreateEditModal';

import { useStyles } from './styles';

interface IProps {
  projects: [] | IProject[];
  employeeId?: string;
  handleUpdateProject?: (
    dispatcher: AsyncThunk<void, TUpdateProjectListPayload, Record<string, never>>,
    project: IProject
  ) => void;
  handleAddToState?: (project: IProject) => void;
  handleDeleteFromState?: (project: IProject) => void;
  handleEditInState?: (project: IProject) => void;
}

export const Projects = ({
  projects,
  employeeId,
  handleUpdateProject,
  handleAddToState,
  handleDeleteFromState,
  handleEditInState,
}: IProps) => {
  const classes = useStyles();
  const [error, setError] = useState(false);

  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [projectInfo, setProjectInfo] = useState<IProject>({} as IProject);

  const dispatch = useAppDispatch();

  const handleClickDeleteProjectButton = () => {
    setIsDeleteProjectModalOpen(true);
  };

  const handleClickDeleteProjectConfirm = useCallback(
    (project: IProject) => {
      if (employeeId) {
        dispatch(deleteProjectAndUpdateList({ projectId: project.id, employeeId }));
      } else if (handleDeleteFromState) {
        handleDeleteFromState(project);
      }
      setIsDeleteProjectModalOpen(false);
    },
    [projects]
  );

  const handleCloseDeleteProjectModal = () => {
    setIsDeleteProjectModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleOpenEditModal = (project: IProject) => {
    setProjectInfo(project);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleAddProject = (project: IProject) => {
    if (handleUpdateProject) {
      handleUpdateProject(createProjectAndUpdateList, project);
    } else if (handleAddToState) {
      handleAddToState(project);
    }
  };

  return (
    <div className={classes.container}>
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
          projectInfo={projectInfo}
          handleClickDeleteProjectButton={handleClickDeleteProjectButton}
          handleClickDeleteProjectConfirm={handleClickDeleteProjectConfirm}
          handleCloseDeleteProjectModal={handleCloseDeleteProjectModal}
          isDeleteProjectModalOpen={isDeleteProjectModalOpen}
          handleCloseEditModal={handleCloseEditModal}
          handleOpenEditModal={handleOpenEditModal}
          editModalOpen={editModalOpen}
          handleUpdateProject={handleUpdateProject}
          error={error}
          setError={setError}
          setProjectInfo={setProjectInfo}
          handleEditInState={handleEditInState}
        />
      ))}
      <CreateEditModal
        isOpen={createModalOpen}
        modalTitle="ADD NEW PROJECT"
        onClose={handleCloseCreateModal}
        onSubmit={handleAddProject}
        handleAddToState={handleAddToState}
        error={error}
        setError={setError}
        setProjectInfo={setProjectInfo}
        projectInfo={projectInfo}
      />
    </div>
  );
};
