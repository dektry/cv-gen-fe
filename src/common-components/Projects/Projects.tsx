import { Typography } from '@mui/material';

import { IProject } from 'models/IProject';

import { AddButton } from 'common-components/AddButton';
import { ProjectCard } from './components/ProjectCard';
import { ProjectForm } from './components/ProjectForm';

import { useStyles } from './styles';

interface IProps {
  projects: IProject[];
  handleClickDeleteProjectButton: (project: IProject) => void;
  handleClickDeleteProjectConfirm: (project: IProject) => void;
  handleCloseDeleteProjectModal: () => void;
  isDeleteProjectModalOpen: boolean;
}

export const Projects = ({
  projects,
  handleClickDeleteProjectButton,
  handleClickDeleteProjectConfirm,
  handleCloseDeleteProjectModal,
  isDeleteProjectModalOpen,
}: IProps) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.upperContainer}>
        <Typography variant="h2" sx={{ marginBottom: '24px' }}>
          PROJECTS
        </Typography>
        <div className={classes.button}>
          <AddButton />
        </div>
      </div>
      {projects?.map((project, idx) => (
        <>
          <ProjectCard
            id={idx}
            project={project}
            handleClickDeleteProjectButton={handleClickDeleteProjectButton}
            handleClickDeleteProjectConfirm={handleClickDeleteProjectConfirm}
            handleCloseDeleteProjectModal={handleCloseDeleteProjectModal}
            isDeleteProjectModalOpen={isDeleteProjectModalOpen}
          />
          <ProjectForm project={project} />
        </>
      ))}
    </>
  );
};
