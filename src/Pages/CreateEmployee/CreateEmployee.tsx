import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { positionsSelector, loadPositions } from 'store/reducers/positions';
import { levelsSelector, loadLevels } from 'store/reducers/levels';
import { createEmployee } from 'store/reducers/employees/thunks';

import { Typography } from '@mui/material';

import routes from 'config/routes.json';

import theme from 'theme/theme';
import { useStyles } from './styles';
import { ICreateEmployee } from 'models/IEmployee';
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

export const CreateEmployee = () => {
  const classes = useStyles({ theme });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<ICreateEmployee>({} as ICreateEmployee);
  const [projects] = useState<IProject[]>([] as IProject[]);
  const [error, setError] = useState(true);

  const { allPositions } = useSelector(positionsSelector);
  const { allLevels } = useSelector(levelsSelector);

  useEffect(() => {
    dispatch(loadPositions());
    dispatch(loadLevels());
  }, []);

  useEffect(() => {
    setEmployee((prev) => ({ ...prev, ...{ projects } }));
  }, [projects]);

  useEffect(() => {
    if (
      (employee.firstName && employee.lastName && employee.gender,
      employee.location,
      employee.email,
      employee.hiredOn,
      employee.position,
      employee.level)
    ) {
      setError(false);
    }
  }, [employee]);

  const handleSaveEmployee = () => {
    dispatch(createEmployee(employee));
    navigate(routes.employeesList);
  };

  const handleChangeInput = useCallback((fields: Partial<ICreateEmployee>) => {
    setEmployee((prev) => ({ ...prev, ...fields }));
  }, []);

  const positionsOptions = useMemo(
    () => allPositions.map((el) => ({ value: el.name, label: el.name })),
    [allPositions]
  );
  const levelsOptions = useMemo(() => allLevels.map((el) => ({ value: el.name, label: el.name })), [allLevels]);

  return (
    <div>
      <GenerateCvHeader backPath={routes.employeesList} />
      <PersonalInformation
        firstName={employee.firstName}
        lastName={employee.lastName}
        gender={employee.gender}
        location={employee.location}
        timezone={employee.timezone}
        handleChangeInput={handleChangeInput}
      />
      <Contacts
        mobileNumber={employee.mobileNumber}
        email={employee.email}
        personalEmail={employee.personalEmail}
        handleChangeInput={handleChangeInput}
      />
      <WorkExperience
        hiredOn={employee.hiredOn}
        yearsOfExperience={employee.yearsOfExperience}
        position={employee.position}
        level={employee.level}
        positionsOptions={positionsOptions}
        levelsOptions={levelsOptions}
        handleChangeInput={handleChangeInput}
      />
      <Typography sx={{ mb: '8px', mt: '8px' }} variant="h2">
        LANGUAGE AND EDUCATION
      </Typography>
      <Languages />
      <Education />
      <SocialNetworks
        skypeUsername={employee.skypeUsername}
        slackUsername={employee.slackUsername}
        twitterUsername={employee.twitterUsername}
        facebookUrl={employee.facebookUrl}
        linkedinUrl={employee.linkedinUrl}
        handleChangeInput={handleChangeInput}
      />
      <Projects />
      <div className={classes.createButtonContainer}>
        <SaveButton title={'CREATE EMPLOYEE'} error={error} handleClickOkButton={handleSaveEmployee} />
      </div>
    </div>
  );
};
