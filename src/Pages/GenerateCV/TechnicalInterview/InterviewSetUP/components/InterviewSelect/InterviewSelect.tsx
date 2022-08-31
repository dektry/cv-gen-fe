import { Button, Select } from 'antd';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';

import { chooseInterviewLevel, chooseInterviewPosition, interviewSelector } from 'store/reducers/interview';
import { positionsSelector } from 'store/reducers/positions';
import { levelsSelector } from 'store/reducers/levels';
import { softSkillInterviewSelector } from 'store/reducers/softskillsInterview';

import { INTERVIEW } from '../InterviewForm/utils/constants';

import { useStyles } from './styles';

interface IProps {
  isSelectDisabled: boolean;
  isEditActive: boolean;
  setIsEditActive: React.Dispatch<React.SetStateAction<boolean>>;
  disableStartInterview: boolean;
  setCurrentPosition: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCurrentLevel: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleStartInterview: () => void;
  currentLevel?: string;
  currentPosition?: string;
}

export const InterviewSelect = (props: IProps) => {
  const {
    isSelectDisabled,
    isEditActive,
    disableStartInterview,
    setCurrentLevel,
    setCurrentPosition,
    handleStartInterview,
    setIsEditActive,
    currentLevel,
    currentPosition,
  } = props;

  const { interviewResult } = useSelector(interviewSelector);
  const { allPositions } = useSelector(positionsSelector);
  const { allLevels } = useSelector(levelsSelector);
  const { softskillsInterview } = useSelector(softSkillInterviewSelector);

  const dispatch = useAppDispatch();

  const classes = useStyles();

  // select handlers
  const handleChangePosition = (value: string) => {
    dispatch(chooseInterviewPosition(value));
    setCurrentPosition(value);
  };
  const handleChangeInterviewLevel = (value: string) => {
    dispatch(chooseInterviewLevel(value));
    setCurrentLevel(value);
  };

  return (
    <div className={classes.selectsWrapper}>
      <Select
        onChange={handleChangePosition}
        placeholder={INTERVIEW.POSITION_PLACEHOLDER}
        className={classes.selects}
        value={currentPosition || softskillsInterview.position?.id}
        disabled={isSelectDisabled}
      >
        {allPositions.map((position) => (
          <Select.Option value={position.id} key={position.id}>
            {position.name}
          </Select.Option>
        ))}
      </Select>
      <Select
        onChange={handleChangeInterviewLevel}
        placeholder={INTERVIEW.LEVEL_PLACEHOLDER}
        className={classes.selects}
        value={currentLevel || softskillsInterview.level?.id}
        disabled={isSelectDisabled}
      >
        {allLevels.map((level) => (
          <Select.Option value={level.id} key={level.id}>
            {level.name}
          </Select.Option>
        ))}
      </Select>
      <Button type="primary" onClick={handleStartInterview} disabled={disableStartInterview}>
        {INTERVIEW.START}
      </Button>
      {interviewResult?.answers && (
        <Button type="primary" className={classes.finishButton} onClick={() => setIsEditActive(!isEditActive)}>
          {isEditActive ? INTERVIEW.STOP_EDIT : INTERVIEW.START_EDIT}
        </Button>
      )}
    </div>
  );
};
