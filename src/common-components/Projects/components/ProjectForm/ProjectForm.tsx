import React, { useState, useCallback, useEffect } from 'react';

import { TextField } from '@mui/material';

import { useSelector } from 'react-redux';
import { employeesSelector } from 'store/reducers/employees';
import { useAppDispatch } from 'store';
import { setCurrentProject } from 'store/reducers/projects';

import { IProject } from 'models/IProject';
import { NullableField } from 'models/TNullableField';

import { TagsInput } from 'common-components/TagInput';

import theme from 'theme/theme';
import { useStyles } from './styles';

interface IProps {
  project?: NullableField<IProject>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectForm = ({ project, setError }: IProps) => {
  const classes = useStyles({ theme });
  const dispatch = useAppDispatch();

  const { currentEmployee } = useSelector(employeesSelector);

  const currentInfo: Partial<IProject> = project
    ? project
    : {
        name: '',
        duration: '',
        position: '',
        teamSize: '',
        description: '',
        responsibilities: [],
        tools: [],
      };

  const [projectInfo, setProjectInfo] = useState<Partial<IProject>>(currentInfo);

  const [nameError, setNameError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [teamSizeError, setTeamSizeError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [responsibilitiesError, setResponsibilitiesError] = useState(false);
  const [skillsError, setSkillsError] = useState(false);

  useEffect(() => {
    if (!projectInfo.name) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (!projectInfo.duration) {
      setDurationError(true);
    } else {
      setDurationError(false);
    }

    if (!projectInfo.position) {
      setRoleError(true);
    } else {
      setRoleError(false);
    }

    if (!projectInfo.teamSize) {
      setTeamSizeError(true);
    } else {
      setTeamSizeError(false);
    }

    if (!projectInfo.description) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }

    if (!projectInfo.responsibilities?.[0]) {
      setResponsibilitiesError(true);
    } else {
      setResponsibilitiesError(false);
    }

    if (
      nameError ||
      durationError ||
      roleError ||
      teamSizeError ||
      descriptionError ||
      responsibilitiesError ||
      skillsError
    ) {
      setError(true);
    } else {
      setError(false);
    }
  }, [
    projectInfo,
    nameError,
    durationError,
    roleError,
    teamSizeError,
    descriptionError,
    responsibilitiesError,
    skillsError,
  ]);

  useEffect(() => {
    if (
      currentEmployee &&
      currentEmployee.id &&
      projectInfo.name &&
      projectInfo.duration &&
      projectInfo.position &&
      projectInfo.teamSize &&
      projectInfo.description &&
      projectInfo.responsibilities &&
      projectInfo.tools?.length
    ) {
      dispatch(
        setCurrentProject({
          id: projectInfo.id || '',
          employeeId: currentEmployee.id,
          name: projectInfo.name,
          duration: projectInfo.duration,
          position: projectInfo.position,
          teamSize: projectInfo.teamSize,
          description: projectInfo.description,
          responsibilities: projectInfo.responsibilities,
          tools: projectInfo.tools,
        })
      );
    }
  }, [projectInfo]);

  const updateProjectInfo = useCallback((fields: Partial<IProject>) => {
    setProjectInfo((prev) => ({ ...prev, ...fields }));
  }, []);

  const handleChangeResponsibilities = useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const responsibilitiesToArr = e.target.value.split(',');
    updateProjectInfo({ responsibilities: responsibilitiesToArr });
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setCurrentProject(null));
    };
  }, []);

  return (
    <div className={classes.box}>
      <div className={classes.upperContainer}>
        <TextField
          label="Project name"
          placeholder="Enter project name"
          value={projectInfo?.name}
          error={nameError}
          helperText={'Required field'}
          onChange={(e) => updateProjectInfo({ name: e.target.value })}
        />
        <TextField
          label="Duration"
          placeholder="Enter project duration"
          value={projectInfo?.duration}
          error={durationError}
          helperText={'Required field'}
          onChange={(e) => updateProjectInfo({ duration: e.target.value })}
        />
        <TextField
          label="Project role"
          placeholder="Enter project role"
          value={projectInfo?.position}
          error={roleError}
          helperText={'Required field'}
          onChange={(e) => updateProjectInfo({ position: e.target.value })}
        />
        <TextField
          label="Project team size"
          placeholder="Enter project team size"
          value={projectInfo?.teamSize}
          error={teamSizeError}
          helperText={'Required field'}
          onChange={(e) => updateProjectInfo({ teamSize: e.target.value })}
        />
      </div>
      <div className={classes.lowerContainer}>
        <TextField
          multiline={true}
          label="Description"
          placeholder="Description"
          error={descriptionError}
          helperText={'Required field'}
          onChange={(e) => updateProjectInfo({ description: e.target.value })}
          value={projectInfo?.description}
        />
        <TextField
          multiline={true}
          label="Responsibilities"
          placeholder="Responsibilities"
          error={responsibilitiesError}
          helperText={'Required field'}
          onChange={(e) => handleChangeResponsibilities(e)}
          value={projectInfo?.responsibilities}
        />
        <TagsInput
          skills={projectInfo?.tools}
          error={skillsError}
          setError={setSkillsError}
          updateProjectInfo={updateProjectInfo}
        />
      </div>
    </div>
  );
};
