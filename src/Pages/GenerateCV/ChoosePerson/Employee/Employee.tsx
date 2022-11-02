import React, { useEffect, useState, useCallback } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Spin } from 'antd';

import { useAppDispatch } from 'store';
import { employeesSelector, setEmployee } from 'store/reducers/employees';
import { loadEmployee, saveChangesToEmployee } from 'store/reducers/employees/thunks';
import { getProjectsList, TUpdateProjectListPayload } from 'store/reducers/projects/thunks';
import { setProjectsList, projectsSelector } from 'store/reducers/projects';

import { projectFormatter } from './utils/helpers/projectFormatter';

import { IProject, IProjectFromDB } from 'models/IProject';

import { EmployeeUI } from './EmployeeUI';

export const Employee = () => {
  const dispatch = useAppDispatch();
  const { currentEmployee, isLoading, isLoadingOneEmployee } = useSelector(employeesSelector);

  const { id } = useParams<{ id: string }>();

  const { projects } = useSelector(projectsSelector);

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

  useEffect(() => {
    if (id) {
      dispatch(getProjectsList(id));
    }
  }, []);

  const handleUpdateProject = useCallback(
    (dispatcher: AsyncThunk<void, TUpdateProjectListPayload, Record<string, never>>, project: IProject) => {
      if (currentEmployee.id) {
        const projectToSave = projectFormatter(project, currentEmployee.id);

        dispatch(dispatcher({ project: projectToSave, employeeId: currentEmployee.id }));
      }
    },
    [projects]
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
      handleUpdateProject={handleUpdateProject}
      projects={projects}
    />
  );
};
