import React, { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

import { useSelector } from 'react-redux';
import { interviewSelector } from 'store/reducers/interview';

import { createSkillMatrix } from 'actions/skills';
import { ILevelsSchema, IMatrix, IDBLevels } from 'models/IUser';
import { SkillMatrix } from './SkillMatrix';
import { useStyles } from './styles';

export interface StateProps {
  levels: ILevelsSchema[];
  allLevels: IDBLevels[];
  positionId: string;
  skillMatrix: IMatrix;
}

interface IProps<T extends StateProps> {
  modalTitle: string;
  isOpenMatrixModal: boolean;
  onClose: () => void;
  state: T;
  onSubmit?: () => void;
}

export const PositionSkillsModal = <T extends StateProps>({
  modalTitle,
  isOpenMatrixModal,
  onClose,
  onSubmit,
  state: { skillMatrix, levels, allLevels, positionId },
}: IProps<T>) => {
  const classes = useStyles();

  const { skillId } = useSelector(interviewSelector);

  const [matrixTree, setMatrixTree] = useState<IMatrix>([
    {
      uuid: uuidv4(),
      position_id: positionId,
      value: '',
      skills: [
        {
          uuid: uuidv4(),
          value: '',
          questions: [{ uuid: uuidv4(), value: '' }],
          levels,
        },
      ],
    },
  ]);

  useEffect(() => {
    if (skillMatrix) setMatrixTree(skillMatrix);
    else {
      setMatrixTree([
        {
          uuid: uuidv4(),
          value: '',
          position_id: positionId,
          skills: [
            {
              uuid: uuidv4(),
              value: '',
              questions: [{ uuid: uuidv4(), value: '' }],
              levels: cloneDeep(levels),
            },
          ],
        },
      ]);
    }
  }, [skillMatrix, positionId, levels]);

  const handleClickAddSkillGroup = () => {
    setMatrixTree(prev => [
      ...prev,
      {
        uuid: uuidv4(),
        value: '',
        position_id: positionId,
        skills: [
          {
            uuid: uuidv4(),
            value: '',
            questions: [{ uuid: uuidv4(), value: '' }],
            levels: cloneDeep(levels),
          },
        ],
      },
    ]);
  };

  const handleSubmit = async () => {
    await createSkillMatrix({ matrixTree, position_id: positionId });
    onSubmit?.();
    onClose();
  };
  
  return (
    <Modal
      title={modalTitle}
      visible={isOpenMatrixModal}
      onOk={handleSubmit}
      onCancel={onClose}
      className={classes.modal}
      width={1400}
      destroyOnClose
    >
      <div style={{ overflow: 'scroll', height: 'auto', maxHeight: '550px' }}>
        {skillId ? (
          <SkillMatrix
            skillGroup={
              matrixTree[matrixTree.findIndex(item => item.uuid === skillId)]
            }
            skillMatrix={matrixTree}
            setMatrixTree={setMatrixTree}
            levels={levels}
            allLevels={allLevels}
            positionId={positionId}
          />
        ) : (
          matrixTree.map(skillGroup => (
            <SkillMatrix
              key={skillGroup.uuid}
              skillGroup={skillGroup}
              skillMatrix={matrixTree}
              setMatrixTree={setMatrixTree}
              levels={levels}
              allLevels={allLevels}
              positionId={positionId}
            />
          ))
        )}
        {!skillId && (
          <Button
            type="primary"
            onClick={handleClickAddSkillGroup}
            icon={<PlusOutlined />}
          />
        )}
      </div>
    </Modal>
  );
};
