import { useState, useCallback } from 'react';
import { range } from 'lodash';

import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';

import { useAppDispatch } from 'store';
import { deleteProject } from 'store/reducers/projects/thunks';

import { Typography, FormControl } from '@mui/material';

import { AddButton } from 'common-components/AddButton';
import { ProjectCard } from './components/ProjectCard';
import { CreateEditModal } from './components/CreateEditModal';

import { useStyles } from './styles';
import { ICvProject } from 'models/ICVGeneration';

export const Projects = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [projectInfo, setProjectInfo] = useState<ICvProject>({} as ICvProject);
  const [id, setId] = useState(0);

  const { control, reset } = useFormContext();
  const { append, remove, update } = useFieldArray({
    name: 'projects',
    control,
  });

  const values = useWatch({ control });
  const { projects } = values;

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
    setProjectInfo({} as ICvProject);
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setProjectInfo({} as ICvProject);
    setCreateModalOpen(false);
  };

  const handleOpenEditModal = (project: ICvProject, id: number) => {
    setProjectInfo(project);

    setId(id);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setProjectInfo({} as ICvProject);
    setEditModalOpen(false);
  };

  const handleAddProject = (project: ICvProject) => {
    append({ ...project, order: projects.length || 0 });
  };

  const handleEditProject = (project: ICvProject) => {
    update(id, project);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const directionOfDrag = destination.index > source.index ? 'GREATER' : 'LESS';
    let affectedRange: number[];

    if (directionOfDrag === 'GREATER') {
      affectedRange = range(source.index, destination.index + 1);
    } else if (directionOfDrag === 'LESS') {
      affectedRange = range(destination.index, source.index);
    }
    const reOrderedProjectsList = projects?.map((project: ICvProject) => {
      if (project.name === result.draggableId) {
        project.order = result.destination?.index;
        console.log('ORDER', project.order);

        return project;
      } else if (affectedRange.includes(Number(project.order))) {
        if (directionOfDrag === 'GREATER') {
          project.order = (project.order as number) - 1;

          return project;
        } else if (directionOfDrag === 'LESS') {
          project.order = (project.order as number) + 1;
          return project;
        }
      } else {
        return project;
      }
    });

    reOrderedProjectsList.sort((a: ICvProject, b: ICvProject) => Number(a.order) - Number(b.order));

    const defaultValues = { ...values, projects: [...reOrderedProjectsList] };

    reset({ ...defaultValues });
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="ProjectCard">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
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
                    handleEditProjectForm={handleEditProject}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </FormControl>
      <CreateEditModal
        isOpen={createModalOpen}
        modalTitle="ADD NEW PROJECT"
        onClose={handleCloseCreateModal}
        onSubmit={handleAddProject}
        projectInfo={projectInfo}
      />
    </div>
  );
};
