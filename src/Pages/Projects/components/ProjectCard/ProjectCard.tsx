import React, { useState } from 'react';

import { Accordion, AccordionActions, AccordionDetails, AccordionSummary } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { cloneDeep } from 'lodash';

import { message } from 'antd';

import { IProject } from 'models/IProject';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { setProjectId, setProjectsList, projectsSelector } from 'store/reducers/projects';
import { deleteProject } from 'store/reducers/projects/thunks';

import { EditButton } from 'common-components/EditButton';
import { DeleteButton } from 'common-components/DeleteButton';
import { DeleteModal } from 'Pages/GenerateCV/common-components/DeleteModal';

import theme from 'theme/theme';
import { useStyles } from './styles';

type Project = Omit<IProject, 'technologies' | 'employeeId' | 'role'> & { tools: string[]; position: string };

type Props = { project: Project };

export const ProjectCard = React.memo(({ project }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const classes = useStyles({ theme });
  const dispatch = useAppDispatch();

  const { projects } = useSelector(projectsSelector);

  const handleClickDelete = () => {
    if (project.id) {
      dispatch(setProjectId(project.id));
      setIsModalOpen(true);
    } else {
      message.error("This project doesn't have ID and couldn't be deleted");
    }
  };

  const handleClickDeleteProject = () => {
    if (project.id) {
      dispatch(deleteProject(project.id));
      const projectsListCopy = cloneDeep(projects);

      const newProjectsList = projectsListCopy.filter((el) => el.id !== project.id);

      dispatch(setProjectsList(newProjectsList));
      setIsModalOpen(false);
    } else {
      message.error("This project doesn't have ID and couldn't be deleted");
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Accordion
        key={'group' + project.id}
        className={classes.accordion}
        disableGutters
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon className={classes.icon} />}>
          <p className={classes.projectSummary}>{`Project ${project.name}`}</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.container}>
            <div className={classes.upperContainer}>
              <div>
                <p className={classes.label}>Project name</p>
                <p className={classes.boldData}>{project.name}</p>
              </div>
              <div>
                <p className={classes.label}>Duration</p>
                <p className={classes.boldData}>{project.duration}</p>
              </div>
              <div>
                <p className={classes.label}>Project role</p>
                <p className={classes.boldData}>{project.position}</p>
              </div>
              <div>
                <p className={classes.label}>Project team size</p>
                <p className={classes.boldData}>{`${project.teamSize} members`}</p>
              </div>
            </div>
            <div className={classes.middleContainer}>
              <div className={classes.description}>
                <p className={classes.label}>Project description</p>
                <p>{project.description}</p>
              </div>
              <div className={classes.responsibilities}>
                <p className={classes.label}>Responsibilities</p>
                <ul className={classes.list}>
                  {project.responsibilities?.map((el) => (
                    <li>{el}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={classes.lowerContainer}>
              <p className={classes.label}>Tools & technologies</p>
              <Stack direction={'row'} spacing={0} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {project.tools?.map((tool) => (
                  <Chip className={classes.chip} label={tool} />
                ))}
              </Stack>
            </div>
          </div>
        </AccordionDetails>
        <AccordionActions sx={{ justifyContent: 'flex-end' }}>
          <DeleteButton title="Delete project" onClick={handleClickDelete} />
          <EditButton title="Edit project" />
        </AccordionActions>
      </Accordion>

      <DeleteModal
        onSubmit={handleClickDeleteProject}
        onClose={handleClose}
        isOpen={isModalOpen}
        modalTitle={'Delete project'}
        modalText={'Are you sure you want to delete this project? All data will be lost'}
      />
    </>
  );
});
