import { useEffect, useMemo } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';

import { positionsSelector, loadPositions } from 'store/reducers/positions';

import { getAllHardSkillsMatrix, deleteHardSkillsMatrix } from 'store/reducers/hardSkillsMatrix/thunks';
import { hardSkillsMatrixSelector } from 'store/reducers/hardSkillsMatrix';

import { TableComponent } from '../../components/Table';

import routes from 'config/routes.json';

export const AssessmentsList = () => {
  const { allPositions } = useSelector(positionsSelector);
  const { matrix } = useSelector(hardSkillsMatrixSelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadPositions());
    dispatch(getAllHardSkillsMatrix());
  }, []);

  const handleDeleteMatrix = (id: string) => {
    dispatch(deleteHardSkillsMatrix(id));
  };

  const handleCreateHardSkillsMatrix = () => {
    navigate(routes.techAssessmentSetUp);
  };

  const handleOpenHardSkillsMatrixDetails = (id: string) => {
    navigate(generatePath(routes.techAssessmentDetails, { id }));
  };

  const handleCopyHrdSkillsMatrix = () => {
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
      handleCopy={handleCopyHrdSkillsMatrix}
      handleCreate={handleCreateHardSkillsMatrix}
      handleOpenDetailsPage={handleOpenHardSkillsMatrixDetails}
      positions={allPositions}
      addModalTitle={'ADD NEW POSITION TECHNICAL ASSESSMENT'}
      editModalTitle={'EDIT POSITION TECHNICAL ASSESSMENT'}
      copyModalTitle={'SELECT POSITION TECHNICAL ASSESSMENT'}
    />
  );
};
