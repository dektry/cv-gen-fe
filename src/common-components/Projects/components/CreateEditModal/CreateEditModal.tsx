import { useEffect, useState, useCallback } from 'react';

import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppDispatch } from 'store';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { useSelector } from 'react-redux';
import { employeesSelector } from 'store/reducers/employees';
import { technologiesSelector } from 'store/reducers/technologies';
import { getTechnologiesList } from 'store/reducers/technologies/thunks';

import { ICvProject } from 'Pages/CVGeneration/components/CVGenerationInfo';

import { TagsInput } from 'common-components/TagsInput';

import { useStyles } from './styles';
import theme from 'theme/theme';

import { SaveButton } from '../../../SaveButton';
import { formatProject } from './utils/helpers/formatProject';

interface IProps {
  isOpen: boolean;
  modalTitle: string;
  onClose: () => void;
  onSubmit?: (project: ICvProject) => void;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectInfo: React.Dispatch<React.SetStateAction<ICvProject>>;
  projectInfo: ICvProject;
  handleAddToState?: (project: ICvProject) => void;
}

const schema = yup.object({
  name: yup.string().required(),
  duration: yup.string().required(),
  position: yup.string().required(),
  teamSize: yup.number().required(),
  description: yup.string().required(),
  formResponsibilities: yup.string().required(),
  tools: yup.array().required(),
});

interface FormValues extends ICvProject {
  formResponsibilities: string;
}

export const CreateEditModal = ({
  isOpen,
  modalTitle,
  onClose,
  onSubmit,
  setProjectInfo,
  projectInfo,
  handleAddToState,
}: IProps) => {
  const classes = useStyles({ theme });

  const [openChildModal, setOpenChildModal] = useState(false);

  const { currentEmployee } = useSelector(employeesSelector);
  const dispatch = useAppDispatch();
  const { technologiesNames } = useSelector(technologiesSelector);

  const {
    control,
    formState: { errors },
    setValue,
    register,
    reset,
  } = useForm<FormValues>({
    defaultValues: projectInfo,
    resolver: yupResolver(schema),
  });

  const values = useWatch<FormValues>({ control });

  const currentInfo: ICvProject = projectInfo
    ? projectInfo
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

  useEffect(() => {
    const defaultValues = { ...projectInfo, formResponsibilities: projectInfo.responsibilities?.toString() };
    reset({ ...defaultValues });
  }, [projectInfo]);

  const updateProjectTags = useCallback((tags: string[]) => {
    setProjectInfo((prev) => ({ ...prev, ...{ tools: tags } }));
    setValue('tools', tags, { shouldValidate: true });
  }, []);

  const tagsSearch = (value: string) => {
    dispatch(getTechnologiesList(value));
  };

  const handleClickSaveButton = () => {
    setOpenChildModal(true);
  };

  const handleChildModalClose = () => {
    setOpenChildModal(false);
  };

  const handleSubmit = () => {
    if (projectInfo && projectInfo && onSubmit) {
      const projectToSave = formatProject(values, values.formResponsibilities, currentEmployee);
      onSubmit(projectToSave);
      setOpenChildModal(false);
      onClose();
    } else if (handleAddToState && projectInfo) {
      const projectToAdd = formatProject(projectInfo);
      handleAddToState(projectToAdd);
    }
  };

  useEffect(() => {
    return () => {
      setProjectInfo({} as ICvProject);
      const emptyProject = {
        id: '',
        employeeId: '',
        teamSize: 0,
        name: '',
        duration: '',
        position: '',
        description: '',
        formResponsibilities: '',
      };
      reset({ ...emptyProject });
      setValue('tools', []);
    };
  }, []);

  const error =
    !values.name ||
    !values.description ||
    !values.duration ||
    !values.position ||
    !values.formResponsibilities ||
    !values.teamSize ||
    !values.tools;

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box className={classes.box}>
          <CloseIcon className={classes.closeIcon} onClick={onClose} />
          <Typography variant="h2" className={classes.title}>
            {modalTitle}
          </Typography>
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
                  name="formResponsibilities"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      multiline={false}
                      label="Responsibilities"
                      placeholder="Add project responsibilities"
                      error={!!errors.formResponsibilities?.message}
                      helperText={errors.formResponsibilities?.message}
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
          <div className={classes.buttonContainer}>
            <Button className={classes.cancelButton} onClick={onClose}>
              Cancel
            </Button>
            <SaveButton title={'Save Changes'} handleClickOkButton={handleClickSaveButton} error={error} />
          </div>
        </Box>
      </Modal>
      <Modal open={openChildModal} onClose={handleChildModalClose}>
        <Box className={classes.innerBox}>
          <CloseIcon className={classes.closeChildModalIcon} onClick={handleChildModalClose} />
          <Typography variant="h2" className={classes.title}>
            SAVE CHANGES
          </Typography>
          <Typography variant="h3" className={classes.text}>
            Do you want to save changes before moving on to another action?
          </Typography>
          <div className={classes.buttonContainer}>
            <Button className={classes.cancelButton} onClick={handleChildModalClose}>
              No
            </Button>
            <SaveButton title={'Yes'} handleClickOkButton={handleSubmit} error={false} />
          </div>
        </Box>
      </Modal>
    </>
  );
};
