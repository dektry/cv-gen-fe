import { Typography } from '@mui/material';

import { IProject } from 'models/IProject';

import { AddButton } from 'common-components/AddButton';
import { ProjectCard } from './components/ProjectCard';

import { useStyles } from './styles';

interface IProps {
  projects: IProject[];
  handleClickDelete: (project: IProject) => void;
  handleClickDeleteProject: (project: IProject) => void;
  handleClose: () => void;
  isModalOpen: boolean;
}

export const Projects = ({
  projects,
  handleClickDelete,
  handleClickDeleteProject,
  handleClose,
  isModalOpen,
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
      {projects?.map((project) => (
        <ProjectCard
          project={project}
          handleClickDelete={handleClickDelete}
          handleClickDeleteProject={handleClickDeleteProject}
          handleClose={handleClose}
          isModalOpen={isModalOpen}
        />
      ))}
    </>
  );
};
