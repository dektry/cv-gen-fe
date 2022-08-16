import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { generatePath, useHistory } from 'react-router-dom';

import { Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { PositionSkillsModal } from '../PositionSkillsModal/PositionSkillsModal';

import {
  chooseInterviewLevel,
  chooseInterviewPosition,
  interviewSelector,
  loadInterviewMatrix,
  setInterviewMatrix,
  setSkillID,
  finishInterview,
  saveChangesToInterview,
} from 'store/interview';
import { softSkillInterviewSelector } from 'store/softskillsInterview';
import { loadSkillMatrix, positionsSelector } from 'store/positions';
import { candidatesSelector } from 'store/candidates';
import { levelsSelector } from 'store/levels';
import { useAppDispatch } from 'store/store';

import { processAnswers } from 'utils/processAnswers';
import { useStyles } from './styles';
import { paths } from 'routes/paths';

import {
  IInterviewAnswers,
  LevelTypesEnum,
  IInterviewSkill,
  ICompleteInterview,
} from 'interfaces/interview.interface';

import { levelTypes } from 'constants/interview';
import { INTERVIEW } from 'constants/titles';

export const InterviewForm = () => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useAppDispatch();

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
  const [isTreeChanged, setIsTreeChanged] = useState(false);
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

    history.push(
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
    if (chosenPosition) {
      const button: HTMLButtonElement = e.currentTarget;
      dispatch(setSkillID(button.id));
      await dispatch(loadSkillMatrix(chosenPosition));
      setOpenMatrixModal(true);
    }
  };

  // modal handlers
  const handleMatrixModalOpen = async () => {
    if (chosenPosition) {
      await dispatch(loadSkillMatrix(chosenPosition));
      setOpenMatrixModal(true);
    }
  };
  const handleMatrixModalClose = () => {
    dispatch(setSkillID(''));
    setOpenMatrixModal(false);
  };

  // select handlers
  const handleSkillChange = (level: LevelTypesEnum, skill: IInterviewSkill) => {
    setAnswers({ ...answers, [skill.id]: level });
    setIsTreeChanged(true);
  };
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
    if (
      !interviewResult &&
      !(softskillsInterview.position && softskillsInterview.level)
    ) {
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
      {isShowInterviewQuestions ? (
        <section className={classes.interviewForm}>
          <div className={classes.answerColumns}>
            <strong className={classes.greenColor}>Desired:</strong>
            <strong className={classes.columnActual}>Actual:</strong>
          </div>
          {interviewMatrix.map(({ id, skills, value }) => (
            <div key={id} className={classes.group}>
              <h2>{value}</h2>
              <div className={classes.skills}>
                {skills.map(skill => (
                  <div key={skill.id} className={classes.skill}>
                    <div className={classes.skillHeader}>
                      <h3>{skill.value}</h3>
                      <div>
                        {skill.levels.map(level => (
                          <strong
                            key={level.value}
                            className={classes.greenColor}
                          >
                            {levelTypes[level.value]}
                          </strong>
                        ))}
                        <Select
                          onChange={level => handleSkillChange(level, skill)}
                          placeholder={INTERVIEW.LEVEL_PLACEHOLDER}
                          className={classes.answerSelect}
                          value={answers[skill.id]}
                        >
                          {Object.keys(levelTypes).map(key => (
                            <Select.Option
                              value={key}
                              key={key}
                              disabled={!isEditActive}
                            >
                              {levelTypes[key as LevelTypesEnum]}
                            </Select.Option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <ol>
                      {skill.questions.map(ques => (
                        <li key={ques.id}>{ques.value}</li>
                      ))}
                      <Button
                        id={id}
                        style={{ marginLeft: '95%', marginTop: '3%' }}
                        type="primary"
                        onClick={handleSkillClick}
                        icon={<PlusOutlined />}
                      />
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className={classes.buttons}>
            {isStarted && (
              <Button type="primary" onClick={handleMatrixModalOpen}>
                {INTERVIEW.CHANGE_SKILL_MATRIX}
              </Button>
            )}
            {!!interviewMatrix?.length && (
              <Button
                type="primary"
                onClick={handleFinishInterview}
                className={classes.finishButton}
                disabled={!isTreeChanged}
              >
                {interviewResult?.answers?.length
                  ? INTERVIEW.SAVE_CHANGES
                  : INTERVIEW.FINISH}
              </Button>
            )}
          </div>
        </section>
      ) : (
        <section className={classes.interviewForm} />
      )}
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
