import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { cloneDeep } from 'lodash';

import { Spin } from 'antd';

import { useAppDispatch } from 'store';
import { employeesSelector, loadEmployee, setEmployee, saveChangesToEmployee } from 'store/reducers/employees';
import { getProjectsList } from 'store/reducers/projects/thunks';
import { setProjectsList, setProjectId, projectsSelector, setCurrentProject } from 'store/reducers/projects';
import { deleteProject, createProject, editProject } from 'store/reducers/projects/thunks';

import { IProject, IProjectFromDB } from 'models/IProject';

import { EmployeeUI } from './EmployeeUI';

export const Employee = () => {
  const dispatch = useAppDispatch();
  const { currentEmployee, isLoading, isLoadingOneEmployee } = useSelector(employeesSelector);

  const { id } = useParams<{ id: string }>();

  const [isChanged, setIsChanged] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const modifiedEmployee = {
        ...currentEmployee,
        [e.target.name]: e.target.value,
      };
      dispatch(setEmployee(modifiedEmployee));
      setIsChanged(true);
    },
    [currentEmployee, dispatch]
  );

  const handleEmployeeSave = () => {
    dispatch(saveChangesToEmployee(currentEmployee));

    setIsChanged(false);
    setIsEdited(false);
  };

  const handleClickEdit = () => {
    setIsEdited(!isEdited);
  };

  useEffect(() => {
    if (id) {
      dispatch(loadEmployee(id));
    }
  }, [id, dispatch]);

  const { projects } = useSelector(projectsSelector);
  useEffect(() => {
    if (id) {
      dispatch(getProjectsList(id));
    }
  }, []);

  const handleClickDeleteProjectButton = useCallback(
    (project: IProject) => {
      dispatch(setProjectId(project.id));
      setIsDeleteProjectModalOpen(true);
    },
    [projects]
  );

  const handleClickDeleteProjectConfirm = useCallback(
    (project: IProject) => {
      dispatch(deleteProject(project.id));
      const projectsListCopy = cloneDeep(projects);

      const newProjectsList = projectsListCopy.filter((el) => el.id !== project.id);

      dispatch(setProjectsList(newProjectsList));
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
    dispatch(setCurrentProject(project));
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    dispatch(setCurrentProject(null));
    setEditModalOpen(false);
  };

  const handleSaveOrEditProject = (project: IProject, edit: boolean) => {
    if (currentEmployee) {
      const processedTools = project.tools.map((el) => {
        return { name: el };
      });

      const projectToSave: IProjectFromDB = {
        id: project.id,
        employeeId: project.employeeId,
        team_size: String(project.teamSize),
        name: project.name,
        duration: project.duration,
        role: project.position,
        description: project.description,
        responsibilities: project.responsibilities,
        technologies: processedTools,
      };

      edit ? dispatch(editProject(projectToSave)) : dispatch(createProject(projectToSave));

      setCreateModalOpen(false);
      setEditModalOpen(false);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setProjectsList([]));
    };
  }, []);

  if (isLoadingOneEmployee) return <Spin size="large" tip={'Loading employee...'} />;

  return (
    <EmployeeUI
      handleClickEdit={handleClickEdit}
      handleEmployeeSave={handleEmployeeSave}
      handleChange={handleChange}
      isChanged={isChanged}
      isEdited={isEdited}
      isLoading={isLoading}
      currentEmployee={currentEmployee}
      employeeId={id}
      projects={projects}
      handleClickDeleteProjectButton={handleClickDeleteProjectButton}
      handleClickDeleteProjectConfirm={handleClickDeleteProjectConfirm}
      handleCloseDeleteProjectModal={handleCloseDeleteProjectModal}
      isDeleteProjectModalOpen={isDeleteProjectModalOpen}
      handleSaveOrEditProject={handleSaveOrEditProject}
      handleCloseCreateModal={handleCloseCreateModal}
      handleOpenCreateModal={handleOpenCreateModal}
      createModalOpen={createModalOpen}
      handleCloseEditModal={handleCloseEditModal}
      handleOpenEditModal={handleOpenEditModal}
      editModalOpen={editModalOpen}
    />
  );
};
