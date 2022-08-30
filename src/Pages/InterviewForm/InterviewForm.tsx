import { useEffect, useState } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { PositionSkillsModal } from '../PositionSkillsModal';

import { useAppDispatch } from 'store';
import { candidatesSelector } from 'store/reducers/candidates';
import {
  interviewSelector,
  loadInterviewMatrix,
  setInterviewMatrix,
  setSkillID,
  finishInterview,
  saveChangesToInterview
} from 'store/reducers/interview';
import { softSkillInterviewSelector } from 'store/reducers/softskillsInterview';
import { positionsSelector, loadSkillMatrix } from 'store/reducers/positions';
import { levelsSelector } from 'store/reducers/levels';

import { processAnswers } from './utils/helpers/processAnswers';

import { IInterviewAnswers, ICompleteInterview } from 'models/IInterview';

import paths from 'config/routes.json';

import { InterviewMatrix } from './InterviewMatrix';
import { InterviewSelect } from './InterviewSelect';

export const InterviewForm = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentCandidate } = useSelector(candidatesSelector);

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
  const handleStartInterview = () => {
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

  const handleFinishInterview = async () => {
    const interviewData: ICompleteInterview = {
      candidateId: currentCandidate.id,
      levelId: chosenLevel || '',
      positionId: chosenPosition || '',
      answers,
    };
    if (interviewResult) {
      dispatch(saveChangesToInterview(interviewData));
    } else {
      dispatch(finishInterview(interviewData));
    }

    navigate(
      generatePath(
        paths.generateCVtechnicalInterviewResult.replace(
          ':candidateId',
          currentCandidate.id,
        ),
        {
          id: currentCandidate.id,
        },
      ),
    );
  };

  const handleSkillClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    if (chosenPosition || interviewResult?.position?.id) {
      const button: HTMLButtonElement = e.currentTarget;
      dispatch(setSkillID(button.id));
      dispatch(loadSkillMatrix(String(chosenPosition || interviewResult?.position?.id)));
      setOpenMatrixModal(true);
    }
  };

  // modal handlers
  const handleMatrixModalClose = () => {
    dispatch(setSkillID(''));
    setOpenMatrixModal(false);
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
      <InterviewSelect
        isSelectDisabled={isSelectDisabled}
        isEditActive={isEditActive}
        setIsEditActive={setIsEditActive}
        disableStartInterview={disableStartInterview}
        setCurrentPosition={setCurrentPosition}
        setCurrentLevel={setCurrentLevel}
        handleStartInterview={handleStartInterview}
        currentLevel={currentLevel}
        currentPosition={currentPosition}
      />
      <InterviewMatrix 
        isShowInterviewQuestions={isShowInterviewQuestions}
        answers={answers}
        setAnswers={setAnswers}
        setOpenMatrixModal={setOpenMatrixModal}
        isStarted={isStarted}
        setIsSelectDisabled={setIsSelectDisabled}
        handleFinishInterview={handleFinishInterview}
        isEditActive={isEditActive}
        handleSkillClick={handleSkillClick}
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
