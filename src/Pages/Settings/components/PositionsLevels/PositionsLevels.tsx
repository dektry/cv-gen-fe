import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  positionsSelector,
  loadPositions,
  createPosition,
  updatePosition,
  deletePosition,
} from 'store/reducers/positions';
import { levelsSelector, loadLevels, createLevel, updateLevel, deleteLevel } from 'store/reducers/levels';

import { IListElement, TableComponent } from './components/Table';

export const PositionsLevels = () => {
  const { allPositions } = useSelector(positionsSelector);
  const { allLevels } = useSelector(levelsSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPositions());
    dispatch(loadLevels());
  }, []);

  const handleCreatePosition = (name: string) => {
    dispatch(createPosition({ name }));
  };

  const handleUpdatePosition = (data: IListElement) => {
    console.log(data);
    dispatch(updatePosition(data));
  };

  const handleDeletePosition = (id: string) => {
    dispatch(deletePosition(id));
  };

  const handleCreateLevel = (name: string) => {
    dispatch(createLevel({ name }));
  };

  const handleUpdateLevel = (data: IListElement) => {
    dispatch(updateLevel(data));
  };

  const handleDeleteLevel = (id: string) => {
    dispatch(deleteLevel(id));
  };

  return (
    <>
      <TableComponent
        data={allPositions}
        name={'Position name'}
        handleCreate={handleCreatePosition}
        handleUpdate={handleUpdatePosition}
        handleDelete={handleDeletePosition}
      />
      <TableComponent
        data={allLevels}
        name={'Level name'}
        handleCreate={handleCreateLevel}
        handleUpdate={handleUpdateLevel}
        handleDelete={handleDeleteLevel}
      />
    </>
  );
};
