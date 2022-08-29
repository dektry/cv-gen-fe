import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Spin } from 'antd';

import { useAppDispatch } from 'store';
import { employeesSelector, loadEmployee, setEmployee, saveChangesToEmployee } from 'store/reducers/employees';

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
    />
  );
};
