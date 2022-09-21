import { useEffect, useState } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import { cloneDeep } from 'lodash';

import { useSelector } from 'react-redux';

import { PositionSkillsModal } from '../../../../common-components/PositionSkillsModal';

import { useAppDispatch } from 'store';
import {
  interviewSelector,
  loadInterviewMatrix,
  setInterviewMatrix,
  setSkillID,
  finishInterview,
  saveChangesToInterview,
} from 'store/reducers/interview';
import { loadSkillMatrix } from 'store/reducers/positions';

import { processInterviewAnswers } from './utils/helpers/processAnswers';

import { IInterviewAnswers, ICompleteInterview } from 'models/IInterview';

import paths from 'config/routes.json';
import { ICandidate } from 'models/ICandidate';
import { IDBLevels, IDBPosition, ILevelsSchema, ISkill, IMatrix, ISkillGroup } from 'models/IUser';

import { InterviewMatrix } from 'Pages/GenerateCV/common-components/InterviewMatrix';
import { InterviewSelect } from '../InterviewSelect';

interface IInterviewFormProps {
  currentCandidate: ICandidate;
  allLevels: IDBLevels[];
  allPositions: IDBPosition[];
  levelsSchema: ILevelsSchema[];
  skillMatrix: IMatrix;
  isLoadingInterviewMatrix: boolean;
}

export const InterviewForm = ({
  currentCandidate,
  allLevels,
  allPositions,
  levelsSchema,
  skillMatrix,
  isLoadingInterviewMatrix,
}: IInterviewFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { chosenLevel, chosenPosition, interviewMatrix, interviewResult } = useSelector(interviewSelector);

  const [answers, setAnswers] = useState<IInterviewAnswers | undefined>({});
  const [isStarted, setIsStarted] = useState(false);

  const [currentPosition, setCurrentPosition] = useState(interviewResult?.position?.id);
  const [currentLevel, setCurrentLevel] = useState(interviewResult?.level?.id);
  const [isOpenMatrixModal, setOpenMatrixModal] = useState(false);
  const [isEditActive, setIsEditActive] = useState(false);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);

  const [matrixTree, setMatrixTree] = useState<IMatrix>([
    {
      uuid: uuidv4(),
      position_id: '',
      value: '',
      skills: [
        {
          uuid: uuidv4(),
          value: '',
          questions: [{ uuid: uuidv4(), value: '' }],
          levels: [{ id: uuidv4(), name: '', value: '' }],
        },
      ],
    },
  ]);

  const disableStartInterview = !(currentLevel && currentPosition) || !!interviewMatrix.length;
  const isShowInterviewQuestions = currentLevel && currentPosition && !!interviewMatrix?.length;

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
      currentPosition
    );
    if ((chosenLevel && chosenPosition) || (currentLevel && currentPosition)) {
      const positionId: string = chosenPosition ? String(chosenPosition) : String(interviewResult?.position?.id);
      const levelId: string = chosenLevel ? String(chosenLevel) : String(interviewResult?.level?.id);

      dispatch(loadInterviewMatrix({ positionId, levelId }));
      setIsStarted(true);
    }
  };

  const handleFinishInterview = async () => {
    const interviewData: ICompleteInterview = {
      candidateId: currentCandidate?.id,
      levelId: chosenLevel || '',
      positionId: chosenPosition || '',
      answers: answers || {},
    };
    if (interviewResult) {
      dispatch(saveChangesToInterview(interviewData));
    } else {
      dispatch(finishInterview(interviewData));
    }

    navigate(
      generatePath(paths.generateCVtechnicalInterviewResult.replace(':candidateId', currentCandidate.id), {
        id: currentCandidate?.id,
      })
    );
  };

  const handleClickDeleteSkill = (group: ISkillGroup, skill: ISkill) => {
    if (group.skills.length) {
      const matrixTreeCopy = cloneDeep(skillMatrix);
      const newMatrix = matrixTreeCopy.map((item) => {
        if (group?.uuid === item.uuid) {
          return {
            ...item,
            skills: [...item.skills.filter((i) => i.uuid !== skill.uuid)],
          };
        }
        return item;
      });
      setMatrixTree(newMatrix);
    }
  };

  const handleSkillClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
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
      interviewResult?.level?.id === currentLevel && interviewResult?.position?.id === currentPosition;

    if (isPositionMatchedWithPreviousResults && interviewResult) {
      const processedAnswers = processInterviewAnswers(interviewResult, interviewMatrix);
      setAnswers(processedAnswers);
    }
  }, [interviewResult, interviewMatrix, chosenLevel, chosenPosition]);

  useEffect(() => {
    if (chosenPosition) {
      dispatch(loadSkillMatrix(chosenPosition));
    }
  }, []);

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
        interviewResult={interviewResult}
        allLevels={allLevels}
        allPositions={allPositions}
        isLoadingInterviewMatrix={isLoadingInterviewMatrix}
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
        chosenPosition={chosenPosition}
        chosenLevel={chosenLevel}
        interviewResult={interviewResult}
        interviewMatrix={interviewMatrix}
        isLoadingInterviewMatrix={isLoadingInterviewMatrix}
        skillMatrix={skillMatrix}
        setMatrixTree={setMatrixTree}
        matrixTree={matrixTree}
      />
      <PositionSkillsModal
        modalTitle={allPositions.find(({ id }) => chosenPosition === id)?.name || ''}
        isOpenMatrixModal={isOpenMatrixModal}
        onClose={handleMatrixModalClose}
        state={positionSkillModalState}
        onSubmit={handleStartInterview}
        handleClickDeleteSkill={handleClickDeleteSkill}
        matrixTree={matrixTree}
        setMatrixTree={setMatrixTree}
      />
    </>
  );
};
