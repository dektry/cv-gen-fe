import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Spin } from 'antd';

import { useAppDispatch } from 'store';
import { employeesSelector, loadEmployee, setEmployee, saveChangesToEmployee } from 'store/reducers/employees';
import { getProjectsList } from 'store/reducers/projects/thunks';
import { setProjectsList, projectsSelector } from 'store/reducers/projects';
import { createProject, editProject } from 'store/reducers/projects/thunks';

import { projectFormatter } from './utils/helpers/projectFormatter';

import { IProject } from 'models/IProject';

import { EmployeeUI } from './EmployeeUI';

export const Employee = () => {
  const dispatch = useAppDispatch();
  const { currentEmployee, isLoading, isLoadingOneEmployee } = useSelector(employeesSelector);

  const { id } = useParams<{ id: string }>();

  const [isChanged, setIsChanged] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

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

  const handleSaveOrEditProject = useCallback(
    (project: IProject, edit: boolean) => {
      if (id) {
        const projectToSave = projectFormatter(project, id);

        edit
          ? dispatch(editProject(projectToSave)).then(() => dispatch(getProjectsList(id)))
          : dispatch(createProject(projectToSave)).then(() => dispatch(getProjectsList(id)));
      }
    },
    [projects, dispatch]
  );

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
      handleSaveOrEditProject={handleSaveOrEditProject}
    />
  );
};
