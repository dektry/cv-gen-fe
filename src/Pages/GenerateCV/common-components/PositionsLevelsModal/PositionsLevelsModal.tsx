import { useMemo } from 'react';

import { Spin } from 'antd';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import { IPersonalData } from 'models/ICommon';
import { IDBLevels, IDBPosition } from 'models/IUser';

import { PersonalInfoCard } from 'common-components/PersonalInfoCard';
import { CustomSelect } from 'common-components/CustomSelect';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IState {
  levels: IDBLevels[];
  positions: IDBPosition[];
  currentLevel?: IDBLevels;
  currentPosition?: IDBPosition;
}

interface IProps {
  isOpen: boolean;
  modalTitle: string;
  onClose: () => void;
  state: IState;
  onSubmit?: () => void;
  personalData: IPersonalData;
  setCurrentPosition: (position: IDBPosition) => void;
  setCurrentLevel: (level: IDBLevels) => void;
  isLoading: boolean;
}

export const PositionsLevelsModal = ({
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

  const classes = useStyles({ theme });

  const positionOptions = useMemo(() => positions.map((el) => ({ label: el.name, value: el.name })), [positions]);
  const levelOptions = useMemo(() => levels.map((el) => ({ label: el.name, value: el.name })), [levels]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.box}>
        <CloseIcon className={classes.closeIcon} onClick={onClose} />
        <Typography variant="h2" className={classes.title}>
          {modalTitle}
        </Typography>
        <Typography variant="h3" className={classes.text}>
          Choose the level and position for which the interviewee is applying
        </Typography>
        <PersonalInfoCard personalData={personalData} />
        {isLoading ? (
          <Spin size="large" tip={'Loading positions and levels data...'} />
        ) : (
          <div className={classes.selectsWrapper}>
            <CustomSelect
              value={currentPosition?.name}
              label={'Desired position'}
              options={positionOptions}
              onChange={(e) => setCurrentPosition(positions.find((el) => el.name === e.target.value) as IDBPosition)}
            />
            <CustomSelect
              value={currentLevel?.name}
              label={'Desired level'}
              options={levelOptions}
              onChange={(e) => setCurrentLevel(levels.find((el) => el.name === e.target.value) as IDBLevels)}
            />
          </div>
        )}
        <div className={classes.buttonContainer}>
          <Button className={classes.noButton} onClick={onClose}>
            Cancel
          </Button>
          <Button className={classes.yesButton} onClick={onSubmit}>
            Start assessment
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
