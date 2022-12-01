import React from 'react';

import { Accordion, AccordionActions, AccordionDetails, AccordionSummary } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

import { ICvProject } from 'Pages/CVGeneration/components/CVGenerationInfo';

import { EditButton } from 'common-components/EditButton';
import { DeleteButton } from 'common-components/DeleteButton';
import { DeleteModal } from 'common-components/DeleteModal';
import { CreateEditModal } from '../CreateEditModal';

import theme from 'theme/theme';
import { useStyles } from './styles';

type TProps = {
  id: number;
  project: ICvProject;
  projectInfo: ICvProject;
  handleClickDeleteProjectButton: (project: ICvProject) => void;
  handleClickDeleteProjectConfirm: (id: number) => void;
  handleCloseDeleteProjectModal: () => void;
  isDeleteProjectModalOpen: boolean;
  handleOpenEditModal: (project: ICvProject, id: number) => void;
  handleCloseEditModal: () => void;
  editModalOpen: boolean;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectInfo: React.Dispatch<React.SetStateAction<ICvProject>>;
  handleEditInState?: (project: ICvProject) => void;
  handleEditProjectForm: (project: ICvProject) => void;
};

export const ProjectCard = React.memo(
  ({
    id,
    project,
    handleClickDeleteProjectButton,
    handleClickDeleteProjectConfirm,
    handleCloseDeleteProjectModal,
    isDeleteProjectModalOpen,
    handleOpenEditModal,
    handleCloseEditModal,
    editModalOpen,
    error,
    setError,
    setProjectInfo,
    projectInfo,
    handleEditProjectForm,
  }: TProps) => {
    const classes = useStyles({ theme });

    const handleEditProject = (currentProject: ICvProject) => {
      handleEditProjectForm(currentProject);
    };

    return (
      <>
        <Accordion
          key={project.id}
          className={classes.accordion}
          disableGutters
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary expandIcon={<ArrowDropDownIcon color="primary" />}>
            <Typography variant="h3">{`Project ${id + 1}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.container}>
              <div className={classes.upperContainer}>
                <div className={classes.infoBlock}>
                  <Typography variant={'h6'} className={classes.label}>
                    Project name
                  </Typography>
                  <Typography variant={'h5'} className={classes.boldData}>
                    {project.name}
                  </Typography>
                </div>
                <div className={classes.infoBlock}>
                  <Typography variant={'h6'} className={classes.label}>
                    Duration
                  </Typography>
                  <Typography variant={'h5'} className={classes.boldData}>
                    {project.duration}
                  </Typography>
                </div>
                <div className={classes.infoBlock}>
                  <Typography variant={'h6'}>Project role</Typography>
                  <Typography variant={'h5'} className={classes.boldData}>
                    {project.position}
                  </Typography>
                </div>
                <div className={classes.infoBlock}>
                  <Typography variant={'h6'} className={classes.label}>
                    Project team size
                  </Typography>
                  <Typography variant={'h5'} className={classes.boldData}>{`${project.teamSize} members`}</Typography>
                </div>
              </div>
              <div className={classes.middleContainer}>
                <div className={classes.description}>
                  <Typography variant={'h6'} className={classes.label}>
                    Project description
                  </Typography>
                  <Typography variant={'h5'}>{project.description}</Typography>
                </div>
                <div className={classes.responsibilities}>
                  <Typography variant={'h6'} className={classes.label}>
                    Responsibilities
                  </Typography>
                  <ul className={classes.list}>
                    {project.responsibilities?.map((el, id) => (
                      <li key={`${el}-${id}`}>
                        <Typography variant={'h5'}>{el}</Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={classes.lowerContainer}>
                <Typography variant={'h6'} className={classes.label}>
                  Tools & technologies
                </Typography>
                <Stack direction={'row'} spacing={0} sx={{ flexWrap: 'wrap', gap: 1, mt: '4px' }}>
                  {project.tools?.map((tool, id) => (
                    <Chip key={`${tool}-${id}`} className={classes.chip} label={tool} />
                  ))}
                </Stack>
              </div>
            </div>
          </AccordionDetails>
          <AccordionActions sx={{ justifyContent: 'flex-end' }}>
            <DeleteButton title="Delete project" onClick={() => handleClickDeleteProjectButton(project)} />
            <EditButton title="Edit project" onClick={() => handleOpenEditModal(project, id)} />
          </AccordionActions>
        </Accordion>

        <DeleteModal
          onSubmit={() => handleClickDeleteProjectConfirm(id)}
          onClose={handleCloseDeleteProjectModal}
          isOpen={isDeleteProjectModalOpen}
          modalTitle={'DELETE PROJECT'}
          modalText={'Are you sure you want to delete this project? All data will be lost'}
        />
        <CreateEditModal
          projectInfo={projectInfo}
          isOpen={editModalOpen}
          modalTitle="EDIT PROJECT"
          onClose={handleCloseEditModal}
          onSubmit={handleEditProject}
          error={error}
          setError={setError}
          setProjectInfo={setProjectInfo}
        />
      </>
    );
  }
);
