import { useState, useEffect } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';

import { Select, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';

import { candidatesSelector } from 'store/reducers/candidates';
import { interviewSelector } from 'store/reducers/interview';
import { saveChangesToInterview, finishInterview, setSkillID, setInterviewMatrix } from 'store/reducers/interview';
import { loadSkillMatrix } from 'store/reducers/positions';

import { IInterviewSkill, IInterviewAnswers, ICompleteInterview } from 'models/IInterview';
import { LevelTypesEnum } from 'models/IInterview';

import { INTERVIEW, levelTypes } from './utils/constants';
import paths from 'config/routes.json';

import { useStyles } from './styles';

interface IProps {
  isShowInterviewQuestions?: boolean | '';
  answers: IInterviewAnswers;
  setAnswers: (value: React.SetStateAction<IInterviewAnswers>) => void;
  setOpenMatrixModal: React.Dispatch<React.SetStateAction<boolean>>;
  isStarted: boolean;
  setIsSelectDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InterviewMatrix = (props: IProps) => {

  const [isEditActive, setIsEditActive] = useState(false);
  const [isTreeChanged, setIsTreeChanged] = useState(false);

  const navigate = useNavigate();

  const { isShowInterviewQuestions, answers, setAnswers, setOpenMatrixModal, isStarted, setIsSelectDisabled } = props;

  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { currentCandidate } = useSelector(candidatesSelector);
  const {
    chosenLevel,
    chosenPosition,
    interviewMatrix,
    interviewResult,
  } = useSelector(interviewSelector);


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

  const handleSkillChange = (level: LevelTypesEnum, skill: IInterviewSkill) => {
    setAnswers({ ...answers, [skill.id]: level });
    setIsTreeChanged(true);
  };


  const handleMatrixModalOpen = async () => {
    if (chosenPosition) {
      await dispatch(loadSkillMatrix(chosenPosition));
      setOpenMatrixModal(true);
    }
  };

  return (<>
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
    </>
  )
}