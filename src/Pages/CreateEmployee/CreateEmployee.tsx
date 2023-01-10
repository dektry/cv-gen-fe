import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { positionsSelector, loadPositions } from 'store/reducers/positions';
import { levelsSelector, loadLevels } from 'store/reducers/levels';
import { createEmployee } from 'store/reducers/employees/thunks';

import { Typography, FormControl } from '@mui/material';

import { useForm, FormProvider, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import routes from 'config/routes.json';

import theme from 'theme/theme';
import { useStyles } from './styles';
import { ICreateEmployee, IEmployee } from 'models/IEmployee';
import { IProject } from 'models/IProject';

import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { Projects } from 'common-components/Projects';
import { Education } from 'common-components/Education';
import { Languages } from 'common-components/Languages';
import { SaveButton } from 'common-components/SaveButton';
import { PersonalInformation } from './components/PersonalInformation';
import { Contacts } from './components/Contacts';
import { WorkExperience } from './components/WorkExperience';
import { SocialNetworks } from './components/SocialNetworks';

import { formatEmployeeBeforeSave } from './utils/helpers/formatEmployeeBeforeSave';

const schema = yup
  .object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    gender: yup.string().required('Gender is required'),
    location: yup.string().required('Location is required'),
    email: yup.string().email().required('E-mail is required'),
    hiredOn: yup.string().required('Date of hire is required'),
    position: yup.string().required('Position is required'),
    level: yup.string().required('Level is required'),
  })
  .required();

export const CreateEmployee = () => {
  const classes = useStyles({ theme });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<ICreateEmployee>({} as ICreateEmployee);
  const [projects] = useState<IProject[]>([] as IProject[]);
  const [error, setError] = useState(true);

  const { allPositions } = useSelector(positionsSelector);
  const { allLevels } = useSelector(levelsSelector);

  const methods = useForm<IEmployee>({
    defaultValues: employee,
    resolver: yupResolver(schema),
  });

  const values = useWatch({ control: methods.control });

  useEffect(() => {
    const defaultValues = employee;
    methods.reset({ ...defaultValues });
  }, [employee]);

  useEffect(() => {
    dispatch(loadPositions());
    dispatch(loadLevels());
  }, []);

  useEffect(() => {
    setEmployee((prev) => ({ ...prev, ...{ projects } }));
  }, [projects]);

  useEffect(() => {
    if (
      (values.firstName && values.lastName && values.gender,
      values.location,
      values.email,
      values.hiredOn,
      values.position,
      values.level)
    ) {
      setError(false);
    }
  }, [values]);

  const handleSaveEmployee = () => {
    const employeeToSave = formatEmployeeBeforeSave(values);
    dispatch(createEmployee(employeeToSave));
    navigate(routes.employeesList);
  };

  const positionsOptions = useMemo(
    () => allPositions.map((el) => ({ value: el.name, label: el.name })),
    [allPositions]
  );
  const levelsOptions = useMemo(() => allLevels.map((el) => ({ value: el.name, label: el.name })), [allLevels]);

  return (
    <FormProvider {...methods}>
      <FormControl className={classes.formContainer}>
        <GenerateCvHeader backPath={routes.employeesList} />
        <PersonalInformation />
        <Contacts />
        <WorkExperience positionsOptions={positionsOptions} levelsOptions={levelsOptions} />
        <Typography sx={{ mb: '8px', mt: '8px' }} variant="h2">
          LANGUAGE AND EDUCATION
        </Typography>
        <Languages />
        <Education />
        <SocialNetworks />
        <Projects />
        <div className={classes.createButtonContainer}>
          <SaveButton title={'CREATE EMPLOYEE'} error={error} handleClickOkButton={handleSaveEmployee} />
        </div>
      </FormControl>
    </FormProvider>
  );
};
