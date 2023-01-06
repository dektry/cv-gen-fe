import { useEffect, useMemo } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';

import { positionsSelector, loadPositions } from 'store/reducers/positions';

import {
  getAllHardSkillsMatrix,
  deleteHardSkillsMatrix,
  copyHardSkillsMatrix,
} from 'store/reducers/hardSkillsMatrix/thunks';
import { hardSkillsMatrixSelector, setCurrentPosition } from 'store/reducers/hardSkillsMatrix';

import { TableComponent } from '../Table';
import { SettingsTabs } from '../SettingsTabs';

import { Spinner } from 'common-components/Spinner';

import routes from 'config/routes.json';
import { IDBPosition } from 'models/IUser';
import { ICopyHardSkillsMatrixProps } from 'models/IHardSkillsMatrix';

export const HardSkillsMatrixList = () => {
  const { allPositions } = useSelector(positionsSelector);
  const { matrix, hardSkillMatrixLoading } = useSelector(hardSkillsMatrixSelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!allPositions.length) {
      dispatch(loadPositions());
    }
    dispatch(getAllHardSkillsMatrix());
  }, []);

  const handleDeleteMatrix = (id: string) => {
    dispatch(deleteHardSkillsMatrix(id));
  };

  const handleCreateHardSkillsMatrix = (name?: string, position?: IDBPosition) => {
    if (position) {
      dispatch(setCurrentPosition(position));
    }
    navigate(routes.hardSkillsMatrixSetUp);
  };

  const handleOpenHardSkillsMatrixDetails = (id: string) => {
    navigate(generatePath(routes.hardSkillsMatrixDetails, { id }));
  };

  const handleCopyHardSkillsMatrix = ({ skillMatrixId, positionId }: ICopyHardSkillsMatrixProps) => {
    dispatch(copyHardSkillsMatrix({ positionId, skillMatrixId }));
  };

  const datatoShow = useMemo(
    () => matrix.map((el) => ({ id: el.id, name: el.position.name, positionId: el.position.id })),
    [matrix]
  );

  if (hardSkillMatrixLoading) return <Spinner text="Hard skills matrix list is loading" />;

  return (
    <>
      <SettingsTabs />
      <TableComponent
        data={datatoShow}
        name={'Position'}
        handleDelete={handleDeleteMatrix}
        handleCopy={handleCopyHardSkillsMatrix}
        handleCreate={handleCreateHardSkillsMatrix}
        handleOpenDetailsPage={handleOpenHardSkillsMatrixDetails}
        positions={allPositions}
        addModalTitle={'ADD NEW POSITION TECHNICAL ASSESSMENT'}
        editModalTitle={'EDIT POSITION TECHNICAL ASSESSMENT'}
        copyModalTitle={'SELECT POSITION TECHNICAL ASSESSMENT'}
        matrixLoading={hardSkillMatrixLoading}
        editPath={routes.hardSkillsMatrixDetails}
      />
    </>
  );
};
