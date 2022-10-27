import { useState, useEffect, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { positionsSelector, loadPositions } from 'store/reducers/positions';
import { levelsSelector, loadLevels } from 'store/reducers/levels';

import { TextField } from '@mui/material';
import { CustomSelect } from 'common-components/CustomSelect';
import { Typography } from '@mui/material';

import routes from 'config/routes.json';
import { timezones } from './components/constants';

import theme from 'theme/theme';
import { useStyles } from './styles';
import { ICreateEmployee } from 'models/IEmployee';
import { IProject } from 'models/IProject';
import { IEducation } from 'models/IEducation';
import { ILanguage } from 'models/ILanguage';

import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { Projects } from 'common-components/Projects';

export const CreateEmployee = () => {
  const classes = useStyles({ theme });
  const dispatch = useAppDispatch();

  const [employee, setEmployee] = useState<ICreateEmployee>({} as ICreateEmployee);
  const [educations, setEducations] = useState<IEducation[]>([] as IEducation[]);
  const [languages, setLanguages] = useState<ILanguage[]>([] as ILanguage[]);
  const [projects, setProjects] = useState<IProject[]>([] as IProject[]);

  console.log(projects);

  const { allPositions } = useSelector(positionsSelector);
  const { allLevels } = useSelector(levelsSelector);

  useEffect(() => {
    dispatch(loadPositions());
    dispatch(loadLevels());
  }, []);

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

  const handleDeleteProject = (project: IProject) => {
    setProjects((prev) => prev.filter((el) => el.id !== project.id));
  };

  const handleEditProject = (project: IProject) => {
    const mappedProjects = projects.map((el) => {
      if (el.id !== project.id) {
        return el;
      } else {
        return project;
      }
    });

    setProjects(mappedProjects);
  };

  const positionsOptions = useMemo(
    () => allPositions.map((el) => ({ value: String(el.id), label: el.name })),
    [allPositions]
  );
  const levelsOptions = useMemo(() => allLevels.map((el) => ({ value: String(el.id), label: el.name })), [allLevels]);

  return (
    <div>
      <GenerateCvHeader backPath={routes.generateCVemployeesList} />
      <div className={classes.gridContainer}>
        <TextField
          value={employee.fullName || ''}
          label={'Full name'}
          name="fullname"
          placeholder={'Add name'}
          onChange={(e) => handleChangeInput({ fullName: e.target.value })}
        />
        <CustomSelect
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
          value={employee.gender || ''}
          label={'Gender'}
          name="gender"
          onChange={(e) => handleChangeInput({ gender: e.target.value })}
        />
        <TextField
          value={employee.location || ''}
          label={'Location'}
          name="location"
          placeholder={'Add location'}
          onChange={(e) => handleChangeInput({ location: e.target.value })}
        />
        <CustomSelect
          options={timezones}
          value={employee.timezone || ''}
          label={'Time zone'}
          name="timezone"
          onChange={(e) => handleChangeInput({ timezone: e.target.value })}
        />
      </div>
      <Typography sx={{ mb: '16px' }} variant="h2">
        CONTACTS
      </Typography>
      <TextField
        value={employee.mobileNumber || ''}
        label={'Mobile number'}
        name="mobileNumber"
        placeholder={'Add number'}
        onChange={(e) => handleChangeInput({ mobileNumber: e.target.value })}
      />
      <div className={classes.gridContainer}>
        <TextField
          value={employee.email || ''}
          label={'Email'}
          name="email"
          type="email"
          placeholder={'Add email'}
          onChange={(e) => handleChangeInput({ email: e.target.value })}
        />
        <TextField
          value={employee.personalEmail || ''}
          label={'Personal email'}
          name="personalEmail"
          type="email"
          placeholder={'Add email'}
          onChange={(e) => handleChangeInput({ personalEmail: e.target.value })}
        />
      </div>
      <Typography sx={{ mb: '8px' }} variant="h2">
        WORK EXPERIENCE
      </Typography>
      <div className={classes.gridContainer}>
        <TextField
          value={employee.hiredOn || ''}
          label={'Hired on'}
          name="hiredOn"
          placeholder={'Add date'}
          type="date"
          onChange={(e) => handleChangeInput({ hiredOn: e.target.value })}
        />
        <TextField
          value={employee.yearsOfExperience || ''}
          label={'Experience in years'}
          name="yearsOfExperience"
          type="number"
          onChange={(e) => handleChangeInput({ yearsOfExperience: Number(e.target.value) })}
        />
        <CustomSelect
          options={positionsOptions}
          value={employee.position || ''}
          label={'Position'}
          name="position"
          onChange={(e) => handleChangeInput({ position: e.target.value })}
        />
        <CustomSelect
          options={levelsOptions}
          value={employee.level || ''}
          label={'Position level'}
          name="level"
          onChange={(e) => handleChangeInput({ level: e.target.value })}
        />
      </div>
      <Typography sx={{ mb: '8px' }} variant="h2">
        LANGUAGE AND EDUCATION
      </Typography>
      <Typography sx={{ mb: '8px' }} variant="h2">
        SOCIAL NETWORKS
      </Typography>
      <div className={classes.gridContainer}>
        <TextField
          value={employee.skypeUsername || ''}
          label={'Skype'}
          name="skypeUsername"
          placeholder={'Add username'}
          onChange={(e) => handleChangeInput({ skypeUsername: e.target.value })}
        />
        <TextField
          value={employee.slackUsername || ''}
          label={'Slack'}
          name="slackUsername"
          placeholder={'Add username'}
          onChange={(e) => handleChangeInput({ slackUsername: e.target.value })}
        />
        <TextField
          value={employee.twitterUsername || ''}
          label={'Twitter'}
          name="twitterUsername"
          placeholder={'Add username'}
          onChange={(e) => handleChangeInput({ twitterUsername: e.target.value })}
        />
        <TextField
          value={employee.facebookUrl || ''}
          label={'Facebook'}
          name="facebookUrl"
          placeholder={'Add link'}
          onChange={(e) => handleChangeInput({ facebookUrl: e.target.value })}
        />
      </div>
      <TextField
        value={employee.linkedinUrl || ''}
        label={'Linkedin'}
        name="linkedinUrl"
        placeholder={'Add link'}
        onChange={(e) => handleChangeInput({ linkedinUrl: e.target.value })}
      />
      <Projects
        handleAddToState={handleAddProject}
        handleEditInState={handleEditProject}
        handleDeleteFromState={handleDeleteProject}
        projects={projects}
      />
      <div className={classes.createButtonContainer}></div>
    </div>
  );
};
