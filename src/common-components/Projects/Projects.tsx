import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
        <h2 className={classes.projectsHeader}>PROJECTS</h2>
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
