import React, { useState, useCallback } from 'react';

import { TextField } from '@mui/material';

import { IProject } from 'models/IProject';

import { TagsInput } from 'common-components/TagInput';

import theme from 'theme/theme';
import { useStyles } from './styles';

interface IProps {
  project: IProject;
}

export const ProjectForm = ({ project }: IProps) => {
  const classes = useStyles({ theme });

  const [projectInfo, setProjectInfo] = useState<IProject>(project);
  const [error, setError] = useState(false);

  console.log(projectInfo);

  const updateProjectInfo = useCallback((fields: Partial<IProject>) => {
    setProjectInfo((prev) => ({ ...prev, ...fields }));
    setError(false);
  }, []);

  const handleChangeResponsibilities = useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const responsibilitiesToArr = e.target.value.split(',');
    updateProjectInfo({ responsibilities: responsibilitiesToArr });
  }, []);

  return (
    <div>
      <div className={classes.upperContainer}>
        <TextField
          label="Project name"
          placeholder="Enter project name"
          value={projectInfo.name}
          error={error}
          helperText={'Project name is required'}
          onChange={(e) => updateProjectInfo({ name: e.target.value })}
        />
        <TextField
          label="Duration"
          placeholder="Enter project duration"
          value={projectInfo.duration}
          error={error}
          helperText={'Project duration is required'}
          onChange={(e) => updateProjectInfo({ duration: e.target.value })}
        />
        <TextField
          label="Project role"
          placeholder="Enter project role"
          value={projectInfo.position}
          error={error}
          helperText={'Project role is required'}
          onChange={(e) => updateProjectInfo({ position: e.target.value })}
        />
        <TextField
          label="Project team size"
          placeholder="Enter project team size"
          value={projectInfo.teamSize}
          error={error}
          helperText={'Project team size is required'}
          onChange={(e) => updateProjectInfo({ teamSize: e.target.value })}
        />
      </div>
      <div className={classes.lowerContainer}>
        <TextField
          multiline={true}
          label="Responsibilities"
          placeholder="Description"
          onChange={(e) => handleChangeResponsibilities(e)}
          value={projectInfo.responsibilities}
        />
        <TagsInput skills={project.tools} />
      </div>
    </div>
  );
};
