import React from 'react';

import { Accordion, AccordionActions, AccordionDetails, AccordionSummary } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { IProject } from 'models/IProject';

import { EditButton } from 'common-components/EditButton';
import { DeleteButton } from 'common-components/DeleteButton';
import { DeleteModal } from 'common-components/DeleteModal';

import theme from 'theme/theme';
import { useStyles } from './styles';

type TProps = {
  project: IProject;
  handleClickDelete: (project: IProject) => void;
  handleClickDeleteProject: (project: IProject) => void;
  handleClose: () => void;
  isModalOpen: boolean;
};

export const ProjectCard = React.memo(
  ({ project, handleClickDelete, handleClickDeleteProject, handleClose, isModalOpen }: TProps) => {
    const classes = useStyles({ theme });

    return (
      <>
        <Accordion
          key={project.id}
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
                      <li key={el}>{el}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={classes.lowerContainer}>
                <p className={classes.label}>Tools & technologies</p>
                <Stack direction={'row'} spacing={0} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {project.tools?.map((tool) => (
                    <Chip key={tool} className={classes.chip} label={tool} />
                  ))}
                </Stack>
              </div>
            </div>
          </AccordionDetails>
          <AccordionActions sx={{ justifyContent: 'flex-end' }}>
            <DeleteButton title="Delete project" onClick={() => handleClickDelete(project)} />
            <EditButton title="Edit project" />
          </AccordionActions>
        </Accordion>

        <DeleteModal
          onSubmit={() => handleClickDeleteProject(project)}
          onClose={handleClose}
          isOpen={isModalOpen}
          modalTitle={'Delete project'}
          modalText={'Are you sure you want to delete this project? All data will be lost'}
        />
      </>
    );
  }
);
