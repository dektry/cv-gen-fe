import { useState, useCallback } from 'react';

import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';

import { useAppDispatch } from 'store';
import { deleteProject } from 'store/reducers/projects/thunks';

import { Typography, FormControl } from '@mui/material';

import { AddButton } from 'common-components/AddButton';
import { ProjectCard } from './components/ProjectCard';
import { CreateEditModal } from './components/CreateEditModal';

import { useStyles } from './styles';
import { ICvProject } from 'Pages/CVGeneration/components/CVGenerationInfo';

export const Projects = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);

  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [projectInfo, setProjectInfo] = useState<ICvProject>({} as ICvProject);
  const [id, setId] = useState(0);

  const { control } = useFormContext();
  const { append, remove, update } = useFieldArray({
    name: 'projects',
    control,
  });

  const { projects } = useWatch({ control });

  const handleClickDeleteProjectButton = (project: ICvProject) => {
    setProjectInfo(project);
    setIsDeleteProjectModalOpen(true);
  };

  const handleClickDeleteProjectConfirm = useCallback(
    (id: number) => {
      remove(id);
      if (projectInfo.id) {
        dispatch(deleteProject(projectInfo.id));
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

  const handleOpenEditModal = (project: ICvProject, id: number) => {
    setProjectInfo(project);
    setId(id);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleAddProject = (project: ICvProject) => {
    append(project);
  };

  const handleEditProject = (project: ICvProject) => {
    update(id, project);
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
      <FormControl className={classes.projectsContainer}>
        {projects?.map((project: ICvProject, idx: number) => (
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
            error={error}
            setError={setError}
            setProjectInfo={setProjectInfo}
            handleEditProjectForm={handleEditProject}
          />
        ))}
      </FormControl>
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
