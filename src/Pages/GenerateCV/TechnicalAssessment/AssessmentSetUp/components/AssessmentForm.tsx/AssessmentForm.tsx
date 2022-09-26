import { useEffect, useState } from 'react';
import { useNavigate, generatePath, useParams } from 'react-router-dom';

import { Spin } from 'antd';

import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';

import { useSelector } from 'react-redux';

import { useAppDispatch } from 'store';
import { interviewSelector, setInterviewMatrix, setSkillID } from 'store/reducers/interview';
import { finishTechAssessment, editTechAssessment, techAssessmentSelector } from 'store/reducers/techAssessment';
import { loadSkillMatrix } from 'store/reducers/positions';

import { IInterviewAnswers, LevelTypesEnum } from 'models/IInterview';

import paths from 'config/routes.json';

import { IDBLevels, IDBPosition, ILevelsSchema } from 'models/IUser';
import { IEmployee } from 'models/IEmployee';
import {
  ICompleteAssessment,
  IAssessmentMatrix,
  IAssessmentSkillGroup,
  IAssessmentSkill,
} from 'models/ITechAssessment';

import { EditableMatrix } from 'Pages/GenerateCV/common-components/EditableMatrix';

interface IInterviewFormProps {
  currentEmployee: IEmployee;
  allLevels: IDBLevels[];
  allPositions: IDBPosition[];
  levelsSchema: ILevelsSchema[];
  isLoadingInterviewMatrix: boolean;
}

export const AssessmentForm = ({ isLoadingInterviewMatrix, currentEmployee }: IInterviewFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { levelId, positionId } = useParams<{ levelId: string; positionId: string }>();

  const { interviewMatrix } = useSelector(interviewSelector);
  const { assessmentResult } = useSelector(techAssessmentSelector);

  const [answers, setAnswers] = useState<IInterviewAnswers | undefined>({});

  const [currentPosition, setCurrentPosition] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [skillMatrixIsLoading, setSkillMatrixIsLoading] = useState(false);
  const [comment, setComment] = useState(assessmentResult?.comment);

  const [matrixTree, setMatrixTree] = useState<IAssessmentMatrix>([
    {
      uuid: uuidv4(),
      position_id: '',
      value: '',
      skills: [
        {
          uuid: uuidv4(),
          value: '',
          questions: [{ id: uuidv4(), value: '' }],
          levels: [{ id: uuidv4(), name: '', value: LevelTypesEnum.None }],
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
  }, [positionId, levelId, assessmentResult]);

  useEffect(() => {
    if (interviewMatrix) {
      const newMatrix = interviewMatrix.map((group) => {
        return {
          uuid: uuidv4(),
          position_id: currentPosition,
          ...group,
        };
      });
      setMatrixTree(newMatrix);
    }
  }, [interviewMatrix]);

  useEffect(() => {
    if (currentPosition) {
      setSkillMatrixIsLoading(true);
      dispatch(loadSkillMatrix(currentPosition));
      setSkillMatrixIsLoading(false);
    }

    if (assessmentResult) {
      setAnswers(assessmentResult.answers);
    }
  }, [currentPosition, currentLevel]);

  const handleFinishInterview = async () => {
    const interviewData: ICompleteAssessment = {
      employeeId: currentEmployee.id,
      levelId: levelId || '' || assessmentResult?.level?.id,
      positionId: positionId || '' || assessmentResult?.position?.id,
      answers: answers || {},
      comment: comment || '',
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
      setSkillMatrixIsLoading(true);
      dispatch(loadSkillMatrix(String(positionId || assessmentResult?.position?.id)));
      setSkillMatrixIsLoading(false);
    }
  };

  const handleClickDeleteSkill = (group: IAssessmentSkillGroup, skill: IAssessmentSkill) => {
    if (group.skills.length) {
      const matrixTreeCopy = cloneDeep(matrixTree);
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

  useEffect(() => {
    return function clear() {
      dispatch(setInterviewMatrix([]));
    };
  }, []);

  if (skillMatrixIsLoading) return <Spin size="large" tip={'Loading skill matrix...'} />;

  return (
    <>
      <EditableMatrix
        answers={answers}
        setAnswers={setAnswers}
        handleFinishInterview={handleFinishInterview}
        handleSkillClick={handleSkillClick}
        handleClickDeleteSkill={handleClickDeleteSkill}
        chosenPosition={positionId}
        chosenLevel={levelId}
        interviewResult={assessmentResult}
        interviewMatrix={matrixTree}
        isLoadingInterviewMatrix={isLoadingInterviewMatrix}
        setInterviewMatrix={setMatrixTree}
        setComment={setComment}
        comment={comment}
      />
    </>
  );
};
