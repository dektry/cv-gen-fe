import React, { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { employeesSelector } from 'store/reducers/employees';
import { technologiesSelector } from 'store/reducers/technologies';
import { getTechnologiesList } from 'store/reducers/technologies/thunks';

import { IProject } from 'models/IProject';

import { TagsInput } from 'common-components/TagsInput';
import { ProjectFieldInput } from './components/ProjectFieldInput';

import theme from 'theme/theme';
import { useStyles } from './styles';

interface IProps {
  project: Partial<IProject> | null;
  setCommonError: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectInfo: React.Dispatch<React.SetStateAction<Partial<IProject> | null>>;
}

export const ProjectForm = ({ project, setCommonError, setProjectInfo }: IProps) => {
  const classes = useStyles({ theme });
  const dispatch = useAppDispatch();
  const { currentEmployee } = useSelector(employeesSelector);
  const { technologiesNames } = useSelector(technologiesSelector);

  const currentInfo: Partial<IProject> = project
    ? project
    : {
        name: '',
        duration: '',
        position: '',
        description: '',
        responsibilities: [],
        tools: [],
      };

  useEffect(() => {
    setProjectInfo(currentInfo);
  }, []);

  useEffect(() => {
    if (
      project &&
      currentEmployee &&
      currentEmployee.id &&
      project.name &&
      project.duration &&
      project.position &&
      project.teamSize &&
      project.description &&
      project.responsibilities &&
      project.tools?.length
    ) {
      setCommonError(false);
    } else {
      setCommonError(true);
    }
  }, [project]);

  const updateProjectInfo = useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const fieldName = e.target.name;

    if (fieldName === 'responsibilities') {
      const responsibilitiesToArr = e.target.value.split(',');
      setProjectInfo((prev) => ({ ...prev, ...{ [`${fieldName}`]: responsibilitiesToArr } }));
    } else if (fieldName === 'teamSize') {
      setProjectInfo((prev) => ({ ...prev, ...{ [`${fieldName}`]: Number(e.target.value) } }));
    } else {
      setProjectInfo((prev) => ({ ...prev, ...{ [`${fieldName}`]: e.target.value } }));
    }
  }, []);

  const updateProjectTags = useCallback((tags: string[]) => {
    setProjectInfo((prev) => ({ ...prev, ...{ tools: tags } }));
  }, []);

  useEffect(() => {
    return () => {
      setProjectInfo(null);
    };
  }, []);

  const tagsSearch = (value: string) => {
    dispatch(getTechnologiesList(value));
  };

  return (
    <div className={classes.box}>
      <div className={classes.upperContainer}>
        <ProjectFieldInput
          updateProjectInfo={updateProjectInfo}
          fieldName={'name'}
          placeholder="Add project name"
          label="Project name"
          value={project?.name}
          multiline={false}
        />
        <ProjectFieldInput
          updateProjectInfo={updateProjectInfo}
          fieldName={'duration'}
          placeholder="Add project duration"
          label="Duration"
          value={project?.duration}
          multiline={false}
        />
        <ProjectFieldInput
          updateProjectInfo={updateProjectInfo}
          fieldName={'position'}
          placeholder="Add project role"
          label="Project role"
          value={project?.position}
          multiline={false}
        />
        <ProjectFieldInput
          updateProjectInfo={updateProjectInfo}
          fieldName={'teamSize'}
          placeholder="Add project team size"
          label="Project team size"
          value={project?.teamSize}
          multiline={false}
          type="number"
        />
      </div>
      <div className={classes.lowerContainer}>
        <ProjectFieldInput
          updateProjectInfo={updateProjectInfo}
          fieldName={'description'}
          placeholder="Add project description"
          label="Description"
          value={project?.description}
          multiline={true}
        />
        <ProjectFieldInput
          updateProjectInfo={updateProjectInfo}
          fieldName={'responsibilities'}
          placeholder="Add project responsibilities"
          label="Responsibilities"
          value={project?.responsibilities}
          multiline={true}
        />
        <TagsInput
          skills={project?.tools || []}
          updateTags={updateProjectTags}
          label="Search technologies"
          placeholder="Search technologies"
          multiline={true}
          value={technologiesNames}
          onSearch={tagsSearch}
        />
      </div>
    </div>
  );
};
