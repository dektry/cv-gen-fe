import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { cloneDeep } from 'lodash';

import { Spin } from 'antd';

import { useAppDispatch } from 'store';
import { employeesSelector, loadEmployee, setEmployee, saveChangesToEmployee } from 'store/reducers/employees';
import { getProjectsList } from 'store/reducers/projects/thunks';
import { setProjectsList, setProjectId, projectsSelector } from 'store/reducers/projects';
import { deleteProject } from 'store/reducers/projects/thunks';

import { IProject } from 'models/IProject';

import { EmployeeUI } from './EmployeeUI';

export const Employee = () => {
  const dispatch = useAppDispatch();
  const { currentEmployee, isLoading, isLoadingOneEmployee } = useSelector(employeesSelector);

  const { id } = useParams<{ id: string }>();

  const [isChanged, setIsChanged] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);

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
    />
  );
};
