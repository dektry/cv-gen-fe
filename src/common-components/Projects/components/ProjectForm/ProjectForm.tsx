import React, { useCallback, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { technologiesSelector } from 'store/reducers/technologies';
import { getTechnologiesList } from 'store/reducers/technologies/thunks';

import { IProject } from 'models/IProject';

import { TagsInput } from 'common-components/TagsInput';
import { ProjectFieldInput } from './components/ProjectFieldInput';
import { SaveButton } from 'common-components/SaveButton';

import theme from 'theme/theme';
import { useStyles } from './styles';

interface IProps {
  project: IProject;
  setCommonError: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectInfo: React.Dispatch<React.SetStateAction<IProject>>;
  openChildModal: boolean;
  handleChildModalClose: () => void;
  handleSubmit: (project: IProject) => void;
}

const Schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  duration: Yup.string().required('Duration is required'),
  position: Yup.string().required('Position is required'),
  description: Yup.string().required('Description is required'),
  teamSize: Yup.number().required('Team size is required'),
  responsibilities: Yup.string().required('Responsibilities are required'),
  tools: Yup.array()
    .max(15, 'There are should be less or equal to 15 technologies')
    .required('Technologies are required'),
});

export const ProjectForm = ({
  project,
  setCommonError,
  setProjectInfo,
  openChildModal,
  handleChildModalClose,
  handleSubmit,
}: IProps) => {
  const classes = useStyles({ theme });
  const dispatch = useAppDispatch();
  const { technologiesNames } = useSelector(technologiesSelector);

  const updateProjectTags = useCallback((tags: string[]) => {
    setProjectInfo((prev) => ({ ...prev, ...{ tools: tags } }));
  }, []);

  useEffect(() => {
    return () => {
      setProjectInfo({} as IProject);
    };
  }, []);

  const tagsSearch = (value: string) => {
    dispatch(getTechnologiesList(value));
  };

  return (
    <Formik initialValues={project} onSubmit={handleSubmit} validationSchema={Schema}>
      {(props) => {
        const { values, touched, errors, handleChange, handleBlur, setFieldValue } = props;

        useEffect(() => {
          if (
            values.name &&
            values.duration &&
            values.position &&
            values.teamSize &&
            values.description &&
            values.responsibilities &&
            values.tools?.length
          ) {
            setCommonError(false);
          } else {
            setCommonError(true);
          }
        }, [values]);

        const handleSave = () => {
          handleSubmit(values);
        };

        return (
          <Form className={classes.box}>
            <div className={classes.upperContainer}>
              <ProjectFieldInput
                onChange={handleChange}
                onBlur={handleBlur}
                id="name"
                fieldName={'name'}
                placeholder="Add project name"
                label="Project name"
                value={values?.name}
                multiline={false}
                touched={touched.name}
                error={errors.name}
              />
              <ProjectFieldInput
                onChange={handleChange}
                onBlur={handleBlur}
                fieldName={'duration'}
                placeholder="Add project duration"
                label="Duration"
                value={project?.duration}
                multiline={false}
                touched={touched.duration}
                error={errors.duration}
              />
              <ProjectFieldInput
                onChange={handleChange}
                onBlur={handleBlur}
                fieldName={'position'}
                placeholder="Add project role"
                label="Project role"
                value={project?.position}
                multiline={false}
                touched={touched.position}
                error={errors.position}
              />
              <ProjectFieldInput
                onChange={handleChange}
                onBlur={handleBlur}
                fieldName={'teamSize'}
                placeholder="Add project team size"
                label="Project team size"
                value={project?.teamSize}
                multiline={false}
                type="number"
                touched={touched.teamSize}
                error={errors.teamSize}
              />
            </div>
            <div className={classes.lowerContainer}>
              <ProjectFieldInput
                onChange={handleChange}
                onBlur={handleBlur}
                fieldName={'description'}
                placeholder="Add project description"
                label="Description"
                value={project?.description}
                multiline={true}
                touched={touched.description}
                error={errors.description}
              />
              <ProjectFieldInput
                onChange={handleChange}
                onBlur={handleBlur}
                fieldName={'responsibilities'}
                placeholder="Add project responsibilities"
                label="Responsibilities"
                value={project?.responsibilities}
                multiline={true}
                touched={touched.responsibilities}
                error={errors.responsibilities}
              />
              <TagsInput
                skills={values.tools}
                updateTags={updateProjectTags}
                label="Search technologies"
                placeholder="Search technologies"
                multiline={true}
                value={technologiesNames}
                onSearch={tagsSearch}
                setFieldValue={setFieldValue}
                onBlur={handleBlur}
                touched={touched.tools}
                error={errors.tools}
              />
            </div>

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
                  <SaveButton title={'Yes'} handleSave={handleSave} error={false} />
                </div>
              </Box>
            </Modal>
          </Form>
        );
      }}
    </Formik>
  );
};
