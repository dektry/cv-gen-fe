import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';

import { getProjectsList } from 'store/reducers/projects/thunks';
import { setProjectsList, projectsSelector } from 'store/reducers/projects';

import { AddButton } from 'common-components/AddButton';
import { ProjectCard } from './components/ProjectCard';

import { useStyles } from './styles';

export const Projects = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();

  const { projects } = useSelector(projectsSelector);
  useEffect(() => {
    if (id) {
      dispatch(getProjectsList(id));
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setProjectsList([]));
    };
  }, []);

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
        <ProjectCard project={project} />
      ))}
    </>
  );
};
