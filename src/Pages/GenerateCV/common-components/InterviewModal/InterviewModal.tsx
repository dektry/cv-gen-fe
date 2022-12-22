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
              value={currentPosition}
              label={'Desired position'}
              options={positionOptions}
              onChange={(e) => setCurrentPosition(e.target.value)}
            />
            <CustomSelect
              value={currentLevel}
              label={'Desired level'}
              options={levelOptions}
              onChange={(e) => setCurrentLevel(e.target.value)}
            />
          </div>
        )}
        <div className={classes.buttonContainer}>
          <Button className={classes.noButton} onClick={onClose}>
            Cancel
          </Button>
          <Button className={classes.yesButton} onClick={onSubmit}>
            Save changes
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
