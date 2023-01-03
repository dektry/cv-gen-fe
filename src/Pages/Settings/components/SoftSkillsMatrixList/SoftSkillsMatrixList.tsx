import { useEffect, useMemo } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';

import { positionsSelector, loadPositions } from 'store/reducers/positions';

import { getAllSoftSkillsMatrix, deleteSoftSkillsMatrix } from 'store/reducers/softSkillsMatrix/thunks';
import { softSkillsMatrixSelector, setCurrentPosition } from 'store/reducers/softSkillsMatrix';

import { TableComponent } from '../Table';
import { SettingsTabs } from '../SettingsTabs';

import routes from 'config/routes.json';
import { IDBPosition } from 'models/IUser';

export const SoftSkillsMatrixList = () => {
  const { allPositions } = useSelector(positionsSelector);
  const { matrix } = useSelector(softSkillsMatrixSelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadPositions());
    dispatch(getAllSoftSkillsMatrix());
  }, []);

  const handleDeleteMatrix = (id: string) => {
    dispatch(deleteSoftSkillsMatrix(id));
  };

  const handleCreateSoftSkillsMatrix = (name?: string, position?: IDBPosition) => {
    if (position) {
      dispatch(setCurrentPosition(position));
    }
    navigate(routes.softSkillsMatrixSetUp);
  };

  const handleOpenSoftSkillsMatrixDetails = (id: string) => {
    navigate(generatePath(routes.softSkillsMatrixDetails, { id }));
  };

  const datatoShow = useMemo(
    () => matrix.map((el) => ({ id: el.id, name: el.position.name, positionId: el.position.id })),
    [matrix]
  );
  return (
    <>
      <SettingsTabs />
      <TableComponent
        data={datatoShow}
        name={'Position'}
        handleDelete={handleDeleteMatrix}
        handleCreate={handleCreateSoftSkillsMatrix}
        handleOpenDetailsPage={handleOpenSoftSkillsMatrixDetails}
        positions={allPositions}
        addModalTitle={'ADD NEW POSITION SOFT SKILLS ASSESSMENT'}
        editModalTitle={'EDIT POSITION SOFT SKILLS ASSESSMENT'}
        copyModalTitle={'SELECT POSITION SOFT SKILLS ASSESSMENT'}
      />
    </>
  );
};
