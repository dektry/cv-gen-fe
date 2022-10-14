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

  const processedProjects = projects?.map((project) => {
    const processedTools = project.technologies.map((el) => el.name);

    return {
      id: project.id,
      name: project.name,
      description: project.description,
      duration: project.duration,
      position: project.role,
      teamSize: project.teamSize,
      responsibilities: project.responsibilities,
      tools: processedTools,
    };
  });

  return (
    <>
      <div className={classes.upperContainer}>
        <h2 className={classes.projectsHeader}>PROJECTS</h2>
        <div className={classes.button}>
          <AddButton />
        </div>
      </div>
      {processedProjects?.map((project) => (
        <ProjectCard project={project} />
      ))}
    </>
  );
};
