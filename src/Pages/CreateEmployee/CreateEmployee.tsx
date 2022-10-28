import { useState, useEffect, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
import { IEducation } from 'models/IEducation';
import { ILanguage } from 'models/ILanguage';

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
  const [educations, setEducations] = useState<IEducation[]>([] as IEducation[]);
  const [languages, setLanguages] = useState<ILanguage[]>([] as ILanguage[]);
  const [projects, setProjects] = useState<IProject[]>([] as IProject[]);
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
    setEmployee((prev) => ({ ...prev, ...{ languages } }));
  }, [languages]);

  useEffect(() => {
    setEmployee((prev) => ({ ...prev, ...{ educations } }));
  }, [educations]);

  useEffect(() => {
    if (
      (employee.fullName && employee.gender,
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

  const handleAddProject = (project: IProject) => {
    const projectToAdd: IProject = {
      ...project,
      id: uuidv4(),
    };
    setProjects((prev) => [...prev, projectToAdd]);
  };

  const handleDeleteProject = useCallback((project: IProject) => {
    setProjects((prev) => prev.filter((el) => el.id !== project.id));
  }, []);

  const handleEditProject = useCallback((project: IProject) => {
    const mappedProjects = projects.map((el) => {
      if (el.id !== project.id) {
        return el;
      } else {
        return project;
      }
    });
    setProjects(mappedProjects);
  }, []);

  const handleAddEducation = useCallback((education: IEducation) => {
    const educationToAdd: IEducation = {
      ...education,
      id: uuidv4(),
    };
    setEducations((prev) => [...prev, educationToAdd]);
  }, []);

  const handleDeleteEducation = useCallback((education: IEducation) => {
    setEducations((prev) => prev.filter((el) => el.id !== education.id));
  }, []);

  const handleEditEducation = useCallback((education: IEducation) => {
    const mappedEducations = educations.map((el) => {
      if (el.id !== education.id) {
        return el;
      } else {
        return education;
      }
    });
    setEducations(mappedEducations);
  }, []);

  const handleAddLanguage = useCallback((language: ILanguage) => {
    const languageToAdd: ILanguage = {
      ...language,
      id: uuidv4(),
    };
    setLanguages((prev) => [...prev, languageToAdd]);
  }, []);

  const handleDeleteLanguage = useCallback((language: ILanguage) => {
    setLanguages((prev) => prev.filter((el) => el.id !== language.id));
  }, []);

  const handleEditLanguage = useCallback((language: ILanguage) => {
    const mappedLanguages = languages.map((el) => {
      if (el.id !== language.id) {
        return el;
      } else {
        return language;
      }
    });
    setLanguages(mappedLanguages);
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
        fullName={employee.fullName}
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
      <Typography sx={{ mb: '8px' }} variant="h2">
        LANGUAGE AND EDUCATION
      </Typography>
      <Languages
        languages={languages}
        handleAddToState={handleAddLanguage}
        handleDeleteFromState={handleDeleteLanguage}
        handleEditInState={handleEditLanguage}
      />
      <Education
        education={educations}
        handleAddToState={handleAddEducation}
        handleDeleteFromState={handleDeleteEducation}
        handleEditInState={handleEditEducation}
      />
      <SocialNetworks
        skypeUsername={employee.skypeUsername}
        slackUsername={employee.slackUsername}
        twitterUsername={employee.twitterUsername}
        facebookUrl={employee.facebookUrl}
        linkedinUrl={employee.linkedinUrl}
        handleChangeInput={handleChangeInput}
      />
      <Projects
        handleAddToState={handleAddProject}
        handleEditInState={handleEditProject}
        handleDeleteFromState={handleDeleteProject}
        projects={projects}
      />
      <div className={classes.createButtonContainer}>
        <SaveButton title={'CREATE EMPLOYEE'} error={error} handleClickOkButton={handleSaveEmployee} />
      </div>
    </div>
  );
};
