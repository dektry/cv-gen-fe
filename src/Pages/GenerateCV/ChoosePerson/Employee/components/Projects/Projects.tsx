import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';

import { getProjectsList } from 'store/reducers/projects/thunks';
import { setProjectsList, projectsSelector } from 'store/reducers/projects';

import { AddButton } from 'common-components/AddButton';
import { DeleteButton } from 'common-components/DeleteButton';

export const Projects = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();

  const { projects } = useSelector(projectsSelector);
  useEffect(() => {
    if (id) {
      dispatch(getProjectsList(id));
    }
  }, []);

  console.log(projects);

  useEffect(() => {
    return () => {
      dispatch(setProjectsList([]));
    };
  }, []);
  return (
    <>
      Projects <AddButton />
    </>
  );
};
