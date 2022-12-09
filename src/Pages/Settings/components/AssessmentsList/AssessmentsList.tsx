import { useEffect, useMemo } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';

import { positionsSelector, loadPositions } from 'store/reducers/positions';

import { getAllHardSkillsMatrix, deleteHardSkillsMatrix } from 'store/reducers/hardSkillsMatrix/thunks';
import { hardSkillsMatrixSelector } from 'store/reducers/hardSkillsMatrix';

import { TableComponent } from '../../components/Table';

export const AssessmentsList = () => {
  const { allPositions } = useSelector(positionsSelector);
  const { matrix } = useSelector(hardSkillsMatrixSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPositions());
    dispatch(getAllHardSkillsMatrix());
  }, []);

  const handleDeleteMatrix = (id: string) => {
    dispatch(deleteHardSkillsMatrix(id));
  };

  const handleCopy = () => {
    console.log('COPY');
  };

  const datatoShow = useMemo(
    () => matrix.map((el) => ({ id: el.id, name: el.position.name, positionId: el.position.id })),
    [matrix]
  );

  return (
    <TableComponent
      data={datatoShow}
      name={'Position'}
      handleDelete={handleDeleteMatrix}
      handleCopy={handleCopy}
      positions={allPositions}
      addModalTitle={'ADD NEW POSITION TECHNICAL ASSESSMENT'}
      editModalTitle={'EDIT POSITION TECHNICAL ASSESSMENT'}
      copyModalTitle={'SELECT POSITION TECHNICAL ASSESSMENT'}
    />
  );
};
