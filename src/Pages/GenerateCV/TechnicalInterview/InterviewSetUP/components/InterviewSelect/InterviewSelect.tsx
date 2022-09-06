import { Button, Select, Spin } from 'antd';

import { useAppDispatch } from 'store';

import { chooseInterviewLevel, chooseInterviewPosition } from 'store/reducers/interview';

import { INTERVIEW } from '../InterviewForm/utils/constants';
import { IInterviewResult } from 'models/IInterview';
import { NullableField } from 'models/TNullableField';
import { IDBLevels, IDBPosition } from 'models/IUser';

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
  interviewResult: NullableField<IInterviewResult>;
  allLevels: IDBLevels[];
  allPositions: IDBPosition[];
  isLoadingInterviewMatrix: boolean;
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
    interviewResult,
    allLevels,
    allPositions,
    isLoadingInterviewMatrix,
  } = props;

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
        value={currentPosition}
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
        value={currentLevel}
        disabled={isSelectDisabled}
      >
        {allLevels.map((level) => (
          <Select.Option value={level.id} key={level.id}>
            {level.name}
          </Select.Option>
        ))}
      </Select>

      {!isLoadingInterviewMatrix ? (
        <Button type="primary" onClick={handleStartInterview} disabled={disableStartInterview}>
          {INTERVIEW.START}
        </Button>
      ) : (
        <Spin size="small" tip={'Loading interview matrix...'} />
      )}

      {interviewResult?.answers && (
        <Button type="primary" className={classes.finishButton} onClick={() => setIsEditActive(!isEditActive)}>
          {isEditActive ? INTERVIEW.STOP_EDIT : INTERVIEW.START_EDIT}
        </Button>
      )}
    </div>
  );
};
