import React, { useCallback, useEffect } from 'react';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { technologiesSelector } from 'store/reducers/technologies';
import { getTechnologiesList } from 'store/reducers/technologies/thunks';

import { IProject } from 'models/IProject';

import { TagsInput } from 'common-components/TagsInput';

import theme from 'theme/theme';
import { useStyles } from './styles';

interface IProps {
  project: IProject;
  setCommonError: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectInfo: React.Dispatch<React.SetStateAction<IProject>>;
}

const schema = yup.object({
  name: yup.string().required(),
  duration: yup.string().required(),
  position: yup.string().required(),
  teamSize: yup.number().required(),
  description: yup.string().required(),
  responsibilities: yup.string().required(),
  tools: yup.array().required(),
});

export const ProjectForm = ({ project, setProjectInfo }: IProps) => {
  const classes = useStyles({ theme });
  const dispatch = useAppDispatch();
  const { technologiesNames } = useSelector(technologiesSelector);

  const {
    control,
    formState: { errors },
    setValue,
    register,
  } = useForm<IProject>({
    defaultValues: project,
    resolver: yupResolver(schema),
  });

  const values = useWatch<IProject>({ control });

  const currentInfo: IProject = project
    ? project
    : {
        id: '',
        employeeId: '',
        teamSize: 0,
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

  const updateProjectTags = useCallback((tags: string[]) => {
    setProjectInfo((prev) => ({ ...prev, ...{ tools: tags } }));
    setValue('tools', tags, { shouldValidate: true });
  }, []);

  const tagsSearch = (value: string) => {
    dispatch(getTechnologiesList(value));
  };

  return (
    <div className={classes.formBox}>
      <FormControl className={classes.projectForm}>
        <div className={classes.upperContainer}>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                multiline={false}
                label="Project name"
                placeholder="Add project name"
                error={!!errors.name?.message}
                helperText={errors.name?.message}
                onChange={onChange}
                value={value}
                InputProps={{ inputProps: { min: 1 } }}
              />
            )}
          />
          <Controller
            name="duration"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                multiline={false}
                label="Duration"
                placeholder="Add project duration"
                error={!!errors.duration?.message}
                helperText={errors.duration?.message}
                onChange={onChange}
                value={value}
                InputProps={{ inputProps: { min: 1 } }}
              />
            )}
          />
          <Controller
            name="position"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                multiline={false}
                label="Project role"
                placeholder="Add project role"
                error={!!errors.position?.message}
                helperText={errors.position?.message}
                onChange={onChange}
                value={value}
                InputProps={{ inputProps: { min: 1 } }}
              />
            )}
          />
          <Controller
            name="teamSize"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                multiline={false}
                label="Project team size"
                placeholder="Add project team size"
                error={!!errors.teamSize?.message}
                helperText={errors.teamSize?.message}
                onChange={onChange}
                value={value}
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
              />
            )}
          />
        </div>
        <div className={classes.lowerContainer}>
          <Controller
            name="description"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                multiline={false}
                label="Description"
                placeholder="Add project description"
                error={!!errors.description?.message}
                helperText={errors.description?.message}
                onChange={onChange}
                value={value}
                InputProps={{ inputProps: { min: 1 } }}
              />
            )}
          />
          <Controller
            name="responsibilities"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                multiline={false}
                label="Responsibilities"
                placeholder="Add project responsibilities"
                error={!!errors.responsibilities?.message}
                helperText={errors.responsibilities?.message}
                onChange={onChange}
                value={value}
                InputProps={{ inputProps: { min: 1 } }}
              />
            )}
          />
          <TagsInput
            skills={values?.tools || []}
            updateTags={updateProjectTags}
            label="Search technologies"
            placeholder="Search technologies"
            multiline={false}
            value={technologiesNames}
            onSearch={tagsSearch}
            {...register('tools')}
          />
        </div>
      </FormControl>
    </div>
  );
};
