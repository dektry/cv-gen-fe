import { useEffect, useState, useMemo } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { cloneDeep } from 'lodash';

import { useSelector } from 'react-redux';

import { PositionSkillsModal } from '../../../../common-components/PositionSkillsModal';

import { useAppDispatch } from 'store';
import { interviewSelector, loadInterviewMatrix, setInterviewMatrix, setSkillID } from 'store/reducers/interview';
import { loadSkillMatrix } from 'store/reducers/positions';

import { ICandidate } from 'models/ICandidate';
import { IDBLevels, IDBPosition, ILevelsSchema, ISkill, IMatrix, ISkillGroup } from 'models/IUser';

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
  allLevels,
  allPositions,
  levelsSchema,
  skillMatrix,
  isLoadingInterviewMatrix,
}: IInterviewFormProps) => {
  const dispatch = useAppDispatch();

  const { chosenLevel, chosenPosition, interviewMatrix, interviewResult } = useSelector(interviewSelector);

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

  const modalTitle = useMemo(
    () => allPositions.find(({ id }) => chosenPosition === id)?.name || '',
    [allPositions, chosenPosition]
  );

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
      <PositionSkillsModal
        modalTitle={modalTitle}
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
