import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { positionsSelector, loadPositions } from 'store/reducers/positions';
import { levelsSelector, loadLevels } from 'store/reducers/levels';

import { TableComponent } from './components/Table';

export const PositionsLevels = () => {
  const { allPositions } = useSelector(positionsSelector);
  const { allLevels } = useSelector(levelsSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPositions());
    dispatch(loadLevels());
  }, []);

  return (
    <>
      <TableComponent data={allPositions} name={'Position name'} />
      <TableComponent data={allLevels} name={'Level name'} />
    </>
  );
};
