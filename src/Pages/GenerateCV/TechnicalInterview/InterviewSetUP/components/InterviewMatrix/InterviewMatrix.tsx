import { useState } from 'react';

import { Select, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';

import { interviewSelector } from 'store/reducers/interview';
import { loadSkillMatrix } from 'store/reducers/positions';

import { IInterviewSkill, IInterviewAnswers } from 'models/IInterview';
import { LevelTypesEnum } from 'models/IInterview';

import { INTERVIEW, levelTypes } from '../InterviewForm/utils/constants';

import { useStyles } from './styles';

interface IProps {
  isShowInterviewQuestions?: boolean | '';
  answers: IInterviewAnswers;
  setAnswers: (value: React.SetStateAction<IInterviewAnswers>) => void;
  setOpenMatrixModal: React.Dispatch<React.SetStateAction<boolean>>;
  isStarted: boolean;
  setIsSelectDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  handleFinishInterview: () => Promise<void>;
  isEditActive: boolean;
  handleSkillClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

export const InterviewMatrix = (props: IProps) => {
  const [isTreeChanged, setIsTreeChanged] = useState(false);

  const {
    isShowInterviewQuestions,
    answers,
    setAnswers,
    setOpenMatrixModal,
    isStarted,
    handleFinishInterview,
    isEditActive,
    handleSkillClick,
  } = props;

  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { chosenPosition, interviewMatrix, interviewResult } = useSelector(interviewSelector);

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

  return (
    <>
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
                {skills.map((skill) => (
                  <div key={skill.id} className={classes.skill}>
                    <div className={classes.skillHeader}>
                      <h3>{skill.value}</h3>
                      <div>
                        {skill.levels.map((level) => (
                          <strong key={level.value} className={classes.greenColor}>
                            {levelTypes[level.value]}
                          </strong>
                        ))}
                        <Select
                          onChange={(level) => handleSkillChange(level, skill)}
                          placeholder={INTERVIEW.LEVEL_PLACEHOLDER}
                          className={classes.answerSelect}
                          value={answers[skill.id]}
                        >
                          {Object.keys(levelTypes).map((key) => (
                            <Select.Option value={key} key={key} disabled={!isEditActive}>
                              {levelTypes[key as LevelTypesEnum]}
                            </Select.Option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <ol>
                      {skill.questions.map((ques) => (
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
                {interviewResult?.answers?.length ? INTERVIEW.SAVE_CHANGES : INTERVIEW.FINISH}
              </Button>
            )}
          </div>
        </section>
      ) : (
        <section className={classes.interviewForm} />
      )}
    </>
  );
};
