import { Modal, Select, Spin } from 'antd';

import { IPersonalData } from 'models/ICommon';
import { IDBLevels, IDBPosition } from 'models/IUser';

import { PersonalInfoCard } from 'common-components/PersonalInfoCard';

import { useStyles } from './styles';

interface IState {
  levels: IDBLevels[];
  positions: IDBPosition[];
  currentLevel?: string;
  currentPosition?: string;
}

interface IProps {
  isOpen: boolean;
  modalTitle: string;
  onClose: () => void;
  state: IState;
  onSubmit?: () => void;
  personalData: IPersonalData;
  setCurrentPosition: (position: string) => void;
  setCurrentLevel: (level: string) => void;
  isLoading: boolean;
}

export const InterviewModal = ({ 
  isOpen, 
  modalTitle, 
  onClose, 
  state, 
  onSubmit, 
  personalData, 
  setCurrentLevel, 
  setCurrentPosition, 
  isLoading,
}: IProps) => {

  const { positions, levels, currentLevel, currentPosition } = state;

  const classes = useStyles();

  return (
    <Modal
      centered
      title={modalTitle}
      visible={isOpen}
      onOk={onSubmit}
      onCancel={onClose}
      width={800}
      destroyOnClose
    >
      <h4>Choose the level and position for which the interviewee is applying</h4>
      <PersonalInfoCard personalData={personalData} />
      {isLoading ? 
        <Spin size="large" tip={'Loading positions and levels data...'} /> :
        <div className={classes.selectsWrapper}>
          <Select
            onChange={setCurrentPosition}
            placeholder={'Desired position'}
            className={classes.selects}
            value={currentPosition}
          >
            {positions.map((position) => (
              <Select.Option value={position.id} key={position.id}>
                {position.name}
              </Select.Option>
            ))}
          </Select>
          <Select
            onChange={setCurrentLevel}
            placeholder={'Desired level'}
            className={classes.selects}
            value={currentLevel}
          >
            {levels.map((level) => (
              <Select.Option value={level.id} key={level.id}>
                {level.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      }
    </Modal>
  );
}