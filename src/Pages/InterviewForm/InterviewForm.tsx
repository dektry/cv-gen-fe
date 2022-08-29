import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { Button, Select } from 'antd';

import { PositionSkillsModal } from '../PositionSkillsModal';

import { useAppDispatch } from 'store';
import {
  chooseInterviewLevel,
  chooseInterviewPosition,
  interviewSelector,
  loadInterviewMatrix,
  setInterviewMatrix,
  setSkillID,
} from 'store/reducers/interview';
import { softSkillInterviewSelector } from 'store/reducers/softskillsInterview';
import { positionsSelector } from 'store/reducers/positions';
import { levelsSelector } from 'store/reducers/levels';

import { processAnswers } from './utils/helpers/processAnswers';
import { useStyles } from './styles';

import { IInterviewAnswers } from 'models/IInterview';

import { INTERVIEW } from './utils/constants';

import { InterviewMatrix } from './InterviewMatrix';

export const InterviewForm = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const {
    chosenLevel,
    chosenPosition,
    interviewMatrix,
    interviewResult,
  } = useSelector(interviewSelector);
  const { softskillsInterview } = useSelector(softSkillInterviewSelector);
  const { allPositions, skillMatrix } = useSelector(positionsSelector);
  const { allLevels, levelsSchema } = useSelector(levelsSelector);

  const [answers, setAnswers] = useState<IInterviewAnswers>({});
  const [isStarted, setIsStarted] = useState(false);

  const [currentPosition, setCurrentPosition] = useState(
    interviewResult?.position?.id,
  );
  const [currentLevel, setCurrentLevel] = useState(interviewResult?.level?.id);
  const [isOpenMatrixModal, setOpenMatrixModal] = useState(false);
  const [isEditActive, setIsEditActive] = useState(false);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);

  const disableStartInterview =
    (!(currentLevel && currentPosition) &&
      !(softskillsInterview.position && softskillsInterview.level)) ||
    !!interviewMatrix.length;
  const isShowInterviewQuestions =
    currentLevel && currentPosition && !!interviewMatrix?.length;

  const positionSkillModalState = {
    skillMatrix,
    allLevels,
    positionId: chosenPosition || '',
    levels: levelsSchema,
  };

  // button handlers
  const handleStartInterview = async () => {
    console.log(
      'chosenLevel: ',
      chosenLevel,
      '|',
      'chosenPosition:',
      chosenPosition,
      '|',
      'currentLevel:',
      currentLevel,
      '|',
      'currentPosition:',
      currentPosition,
    );
    if ((chosenLevel && chosenPosition) || (currentLevel && currentPosition)) {
      const positionId: string = chosenPosition
        ? String(chosenPosition)
        : String(interviewResult?.position?.id);
      const levelId: string = chosenLevel
        ? String(chosenLevel)
        : String(interviewResult?.level?.id);

      dispatch(loadInterviewMatrix({ positionId, levelId }));
      setIsStarted(true);
    }
  };

  // modal handlers
  const handleMatrixModalClose = () => {
    dispatch(setSkillID(''));
    setOpenMatrixModal(false);
  };

  // select handlers
  const handleChangePosition = (value: string) => {
    dispatch(chooseInterviewPosition(value));
    setCurrentPosition(value);
  };
  const handleChangeInterviewLevel = (value: string) => {
    dispatch(chooseInterviewLevel(value));
    setCurrentLevel(value);
  };

  useEffect(() => {
    const isPositionMatchedWithPreviousResults =
      interviewResult?.level?.id === currentLevel &&
      interviewResult?.position?.id === currentPosition;

    if (isPositionMatchedWithPreviousResults && interviewResult) {
      const processedAnswers = processAnswers(interviewResult, interviewMatrix);
      setAnswers(processedAnswers);
    }
  }, [interviewResult, interviewMatrix, chosenLevel, chosenPosition]);

  useEffect(() => {
    if (!interviewResult) {
      setIsEditActive(true);
    } else {
      setIsSelectDisabled(true);
    }
  }, [interviewResult?.answers?.length]);
  useEffect(() => {
    return function clear() {
      dispatch(setInterviewMatrix([]));
    };
  }, []);

  return (
    <>
      <div className={classes.selectsWrapper}>
        <Select
          onChange={handleChangePosition}
          placeholder={INTERVIEW.POSITION_PLACEHOLDER}
          className={classes.selects}
          value={currentPosition || softskillsInterview.position?.id}
          disabled={isSelectDisabled}
        >
          {allPositions.map(position => (
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
          {allLevels.map(level => (
            <Select.Option value={level.id} key={level.id}>
              {level.name}
            </Select.Option>
          ))}
        </Select>
        <Button
          type="primary"
          onClick={handleStartInterview}
          disabled={disableStartInterview}
        >
          {INTERVIEW.START}
        </Button>
        {interviewResult?.answers && (
          <Button
            type="primary"
            className={classes.finishButton}
            onClick={() => setIsEditActive(!isEditActive)}
          >
            {isEditActive ? INTERVIEW.STOP_EDIT : INTERVIEW.START_EDIT}
          </Button>
        )}
      </div>
      <InterviewMatrix 
        isShowInterviewQuestions={isShowInterviewQuestions}
        answers={answers}
        setAnswers={setAnswers}
        setOpenMatrixModal={setOpenMatrixModal}
        isStarted={isStarted}
        setIsSelectDisabled={setIsSelectDisabled}
      />
      <PositionSkillsModal
        modalTitle={
          allPositions.find(({ id }) => chosenPosition === id)?.name || ''
        }
        isOpenMatrixModal={isOpenMatrixModal}
        onClose={handleMatrixModalClose}
        state={positionSkillModalState}
        onSubmit={handleStartInterview}
      />
    </>
  );
};
