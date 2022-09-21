import { useEffect, useState } from 'react';
import { useNavigate, generatePath, useParams } from 'react-router-dom';

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
} from 'store/reducers/interview';
import {
  finishTechAssessment,
  editTechAssessment,
  techAssessmentSelector
} from 'store/reducers/techAssessment';
import { loadSkillMatrix } from 'store/reducers/positions';

import { IInterviewAnswers } from 'models/IInterview';

import paths from 'config/routes.json';

import { IDBLevels, IDBPosition, ILevelsSchema, IMatrix, ISkill, ISkillGroup } from 'models/IUser';
import { IEmployee } from 'models/IEmployee';
import { ICompleteAssessment } from 'models/ITechAssessment';

import { InterviewMatrix } from 'Pages/GenerateCV/common-components/InterviewMatrix';


interface IInterviewFormProps {
  currentEmployee: IEmployee;
  allLevels: IDBLevels[];
  allPositions: IDBPosition[];
  levelsSchema: ILevelsSchema[];
  skillMatrix: IMatrix;
  isLoadingInterviewMatrix: boolean;
}

export const AssessmentForm = ({
  allLevels,
  allPositions,
  levelsSchema,
  skillMatrix,
  isLoadingInterviewMatrix,
  currentEmployee,
}: IInterviewFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { levelId, positionId } = useParams<{ levelId: string, positionId: string}>();

  const { interviewMatrix } = useSelector(interviewSelector);
  const { assessmentResult } = useSelector(techAssessmentSelector);

  const [answers, setAnswers] = useState<IInterviewAnswers | undefined>({});
  const [isStarted, setIsStarted] = useState(false);

  const [isOpenMatrixModal, setOpenMatrixModal] = useState(false);
  const [currentPosition, setCurrentPosition] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');

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

  useEffect(() => {
    if (positionId && levelId) {
      setCurrentPosition(positionId);
      setCurrentLevel(levelId);
    }

    if (assessmentResult && assessmentResult.position.id && assessmentResult.level.id) {
      setCurrentPosition(assessmentResult.position.id);
      setCurrentLevel(assessmentResult.level.id);
    }
  }, [positionId, levelId, assessmentResult])
  

  useEffect(() => {
    handleStartInterview();
    if (currentPosition) {
      dispatch(loadSkillMatrix(currentPosition));
    }

    if (assessmentResult) {
      setAnswers(assessmentResult.answers);
    }
  }, [currentPosition, currentLevel])

  const handleStartInterview = () => {
    if (currentPosition && currentLevel) {
      dispatch(loadInterviewMatrix({ positionId: currentPosition, levelId: currentLevel }));
    }
    setIsStarted(true);
  };


  const positionSkillModalState = {
    skillMatrix,
    allLevels,
    positionId: positionId || assessmentResult?.position?.id,
    levels: levelsSchema,
  };

  // button handlers

  const handleFinishInterview = async () => {
    const interviewData: ICompleteAssessment = {
      employeeId: currentEmployee.id,
      levelId: levelId || '' || assessmentResult?.level?.id,
      positionId: positionId || '' || assessmentResult?.position?.id,
      answers: answers || {},
    };
    if (assessmentResult) {
      dispatch(editTechAssessment(interviewData));
    } else {
      dispatch(finishTechAssessment(interviewData));
    }

    navigate(
      generatePath(paths.generateCVtechnicalInterviewResult, {
        id: currentEmployee?.id || '',
      })
    );
  };

  const handleSkillClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    if (positionId || assessmentResult?.position?.id) {
      const button: HTMLButtonElement = e.currentTarget;
      dispatch(setSkillID(button.id));
      dispatch(loadSkillMatrix(String(positionId || assessmentResult?.position?.id)));
      setOpenMatrixModal(true);
    }
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

  // modal handlers
  const handleMatrixModalClose = () => {
    dispatch(setSkillID(''));
    setOpenMatrixModal(false);
  };

  useEffect(() => {
    return function clear() {
      dispatch(setInterviewMatrix([]));
    };
  }, []);

  return (
    <>
      <InterviewMatrix
        answers={answers}
        setAnswers={setAnswers}
        setOpenMatrixModal={setOpenMatrixModal}
        isStarted={isStarted}
        handleFinishInterview={handleFinishInterview}
        handleSkillClick={handleSkillClick}
        chosenPosition={positionId}
        chosenLevel={levelId}
        interviewResult={assessmentResult}
        interviewMatrix={interviewMatrix}
        isLoadingInterviewMatrix={isLoadingInterviewMatrix}
        isShowInterviewQuestions={true}
        setMatrixTree={setMatrixTree}
        skillMatrix={skillMatrix}
        matrixTree={matrixTree}
      />
      <PositionSkillsModal
        modalTitle={allPositions.find(({ id }) => positionId === id)?.name || ''}
        isOpenMatrixModal={isOpenMatrixModal}
        onClose={handleMatrixModalClose}
        state={positionSkillModalState}
        onSubmit={handleStartInterview}
        matrixTree={matrixTree}
        setMatrixTree={setMatrixTree}
        handleClickDeleteSkill={handleClickDeleteSkill}
      />
    </>
  );
};
