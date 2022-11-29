import { useState, useCallback, useEffect } from 'react';

import { useForm, useFieldArray } from 'react-hook-form';

import { AsyncThunk } from '@reduxjs/toolkit';

import { Typography, FormControl } from '@mui/material';

import { TUpdateProjectListPayload } from 'store/reducers/projects/thunks';

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

interface FormValues {
  projects: IProject[];
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
  const [id, setId] = useState(0);

  const { control, reset } = useForm<FormValues>({ defaultValues: { projects } });

  const { fields, append, remove, update } = useFieldArray({
    name: 'projects',
    keyName: 'fieldKey',
    control,
  });

  useEffect(() => {
    const defaultValues = { projects };
    reset({ ...defaultValues });
  }, [projects]);

  const handleClickDeleteProjectButton = () => {
    setIsDeleteProjectModalOpen(true);
  };

  const handleClickDeleteProjectConfirm = useCallback(
    (project: IProject, id: number) => {
      if (employeeId) {
        remove(id);
      } else if (handleDeleteFromState) {
        remove(id);
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

  const handleOpenEditModal = (project: IProject, id: number) => {
    setProjectInfo(project);
    setId(id);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleAddProject = (project: IProject) => {
    if (handleUpdateProject) {
      append(project);
    } else if (handleAddToState) {
      append(project);
      handleAddToState(project);
    }
  };

  const handleEditProject = (project: IProject) => {
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
        {fields?.map((project, idx) => (
          <ProjectCard
            key={project.fieldKey}
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
            handleEditProjectForm={handleEditProject}
          />
        ))}
      </FormControl>
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
