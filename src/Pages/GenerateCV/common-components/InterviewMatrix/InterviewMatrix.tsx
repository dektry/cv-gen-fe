import React, { useState } from 'react';

import { Select, Button, Spin } from 'antd';
import { PlusOutlined, DeleteFilled } from '@ant-design/icons';

import { useAppDispatch } from 'store';

import { loadSkillMatrix } from 'store/reducers/positions';

import {
  IInterviewSkill,
  IInterviewAnswers,
  IInterviewResult,
  LevelTypesEnum,
  IInterviewMatrix,
} from 'models/IInterview';
import { NullableField } from 'models/TNullableField';
import { IAssessmentFromDB } from 'models/ITechAssessment';

import { INTERVIEW, levelTypes } from '../../TechnicalInterview/InterviewSetUP/components/InterviewForm/utils/constants';

import { useStyles } from './styles';

import { DeleteModal } from 'Pages/GenerateCV/common-components/DeleteModal';

interface IProps {
  isShowInterviewQuestions?: boolean | '';
  answers?: IInterviewAnswers;
  setAnswers: (value: React.SetStateAction<IInterviewAnswers | undefined>) => void;
  setOpenMatrixModal: React.Dispatch<React.SetStateAction<boolean>>;
  isStarted: boolean;
  setIsSelectDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
  handleFinishInterview: () => Promise<void>;
  isEditActive?: boolean;
  handleSkillClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  chosenPosition: string | undefined;
  interviewResult: NullableField<IInterviewResult | IAssessmentFromDB>;
  interviewMatrix: IInterviewMatrix;
  isLoadingInterviewMatrix: boolean;
  handleClickDeleteSkillGroup: (uuid: string) => void;
}
interface IDeleteEventTarget extends EventTarget {
  id: string
}
interface IDeleteElement extends React.MouseEvent<HTMLDivElement> {
  target: IDeleteEventTarget;
}

export const InterviewMatrix = (props: IProps) => {
  const {
    isShowInterviewQuestions,
    answers,
    setAnswers,
    setOpenMatrixModal,
    isStarted,
    handleFinishInterview,
    isEditActive,
    handleSkillClick,
    chosenPosition,
    interviewResult,
    interviewMatrix,
    isLoadingInterviewMatrix,
    handleClickDeleteSkillGroup
  } = props;

  const [isTreeChanged, setIsTreeChanged] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const classes = useStyles();

  const dispatch = useAppDispatch();

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

  const handleDeleteSkillGroupClick = (e: IDeleteElement) => {
    setDeleteModalOpen(true);
    handleDeleteSkillGroupClick(String(e.target.id))
    
  }


  return (
    <>
      {isShowInterviewQuestions ? (
        <section className={classes.interviewForm}>
          {interviewMatrix.map(({ id, skills, value }) => (
            <div key={id} className={classes.group}>
              <h2>{value}</h2>
              <div className={classes.skills}>
                <p className={classes.deleteSection} id={id} onClick={handleDeleteSkillGroupClick}>Delete section</p>
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
                          value={answers && answers[skill.id]}
                        >
                          {Object.keys(levelTypes).map((key) => (
                            <Select.Option value={key} key={key} disabled={!isEditActive}>
                              {levelTypes[key as LevelTypesEnum]}
                            </Select.Option>
                          ))}
                        </Select>
                      <DeleteFilled className={classes.deleteIcon} />
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
      ) : !isLoadingInterviewMatrix ? (
        <section className={classes.interviewForm} />
      ) : (
        <Spin size="small" tip={'Loading interview matrix...'} />
      )}

    </>
  );
};
