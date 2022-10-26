import { useState, useCallback } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';

import { Typography } from '@mui/material';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { projectsSelector } from 'store/reducers/projects';
import { deleteProject, getProjectsList, createProject } from 'store/reducers/projects/thunks';

import { IProject, IProjectFromDB } from 'models/IProject';

import { AddButton } from 'common-components/AddButton';
import { ProjectCard } from './components/ProjectCard';
import { CreateEditModal } from './components/CreateEditModal';

import { useStyles } from './styles';

interface IProps {
  employeeId: string;
  handleUpdateProject: (dispatcher: AsyncThunk<void, IProjectFromDB, Record<string, never>>, project: IProject) => void;
}

export const Projects = ({ employeeId, handleUpdateProject }: IProps) => {
  const classes = useStyles();
  const [error, setError] = useState(false);

  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [projectInfo, setProjectInfo] = useState<Partial<IProject> | null>(null);

  const { projects } = useSelector(projectsSelector);

  const dispatch = useAppDispatch();

  const handleClickDeleteProjectButton = () => {
    setIsDeleteProjectModalOpen(true);
  };

  const handleClickDeleteProjectConfirm = useCallback(
    (project: IProject) => {
      dispatch(deleteProject(project.id));
      dispatch(getProjectsList(employeeId));
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
    handleUpdateProject(createProject, project);
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
        />
      ))}
      <CreateEditModal
        isOpen={createModalOpen}
        modalTitle="ADD NEW PROJECT"
        onClose={handleCloseCreateModal}
        onSubmit={handleAddProject}
        error={error}
        setError={setError}
        setProjectInfo={setProjectInfo}
        projectInfo={projectInfo}
      />
    </div>
  );
};
