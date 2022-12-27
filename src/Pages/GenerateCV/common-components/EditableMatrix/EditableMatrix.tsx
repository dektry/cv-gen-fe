import React, { useState } from 'react';
import { cloneDeep } from 'lodash';

import { v4 as uuidv4 } from 'uuid';

import { Spin, Button, Select, Input } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import { IInterviewAnswers } from 'models/IInterview';
import {
  IAssessmentFromDB,
  IAssessmentMatrix,
  IAssessmentSkill,
  IAssessmentSkillGroup,
  IExtendElement,
  InputChangeEvent,
} from 'models/ITechAssessment';
import { NullableField } from 'models/TNullableField';
import { LevelTypesEnum } from 'models/IInterview';

import { DeleteModal } from 'common-components/DeleteModal';

import {
  INTERVIEW,
  levelTypes,
} from 'Pages/GenerateCV/TechnicalInterview/InterviewSetUP/components/InterviewForm/utils/constants';

import { useStyles } from './styles';

interface IProps {
  answers?: IInterviewAnswers;
  setAnswers: (value: React.SetStateAction<IInterviewAnswers | undefined>) => void;
  handleFinishInterview: () => Promise<void>;
  chosenPosition?: string;
  chosenLevel?: string;
  interviewResult: NullableField<IAssessmentFromDB>;
  interviewMatrix: IAssessmentMatrix;
  isLoadingInterviewMatrix: boolean;
  setInterviewMatrix: React.Dispatch<React.SetStateAction<IAssessmentMatrix>>;
  comment?: string;
  setComment: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleClickDeleteSkill: (group: IAssessmentSkillGroup, skill: IAssessmentSkill) => void;
  handleClickAddSkillGroup: () => void;
}

export const EditableMatrix = ({
  answers,
  setAnswers,
  handleFinishInterview,
  interviewResult,
  interviewMatrix,
  comment,
  setComment,
  isLoadingInterviewMatrix,
  setInterviewMatrix,
  handleClickAddSkillGroup,
}: IProps) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [skillGroupId, setSkillGroupId] = useState('');

  const classes = useStyles();

  const handleChangeSkillGroup = (event: InputChangeEvent) => {
    const { value, id } = event.target;
    const matrixTreeCopy = cloneDeep(interviewMatrix);
    const currentSkillGroupIdx = matrixTreeCopy.findIndex((item) => id === item.uuid);
    matrixTreeCopy[currentSkillGroupIdx].value = value;
    setInterviewMatrix(matrixTreeCopy);
  };

  const handleChangeSkill = (event: InputChangeEvent, idx: number) => {
    const { value, id } = event.target;

    const matrixTreeCopy = cloneDeep(interviewMatrix);
    const currentSkillGroupIdx = matrixTreeCopy.findIndex((item) => id === item.uuid);
    matrixTreeCopy[currentSkillGroupIdx].skills[idx].value = value;
    setInterviewMatrix(matrixTreeCopy);
  };

  const handleChangeComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSkillChange = (level: string, skill: IAssessmentSkill) => {
    setAnswers({ ...answers, [String(skill?.id)]: level });
  };

  const handleClickDelete = (e: IExtendElement) => {
    setSkillGroupId(e.target.id);
    setDeleteModalOpen(true);
  };

  const handleClickDeleteSkillGroup = () => {
    if (interviewMatrix.length) {
      setInterviewMatrix((prev) => prev.filter((item) => item.uuid !== skillGroupId));
    }
    setDeleteModalOpen(false);
  };

  const handleClose = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteSkill = async (skill: IAssessmentSkill, id: string) => {
    const group = interviewMatrix[interviewMatrix.findIndex((item) => item.uuid === id)];

    const currentSkill = group.skills[group.skills.findIndex((el) => el.id === skill.id)];

    if (group.skills.length && currentSkill) {
      const matrixTreeCopy = cloneDeep(interviewMatrix);

      const newMatrix = matrixTreeCopy.map((item) => {
        if (group?.uuid === item.uuid) {
          return {
            ...item,
            skills: item.skills.filter((i) => i.id !== currentSkill.id),
          };
        }
        return item;
      });

      setInterviewMatrix(newMatrix);
    }
  };

  // questions handlers
  const handleClickAddQuestion = (skill: IAssessmentSkill, uuid: string) => {
    const matrixTreeCopy: IAssessmentMatrix = cloneDeep(interviewMatrix);
    const groupIdx = matrixTreeCopy.findIndex((el) => el.uuid === uuid);
    const currentGroup = matrixTreeCopy[groupIdx];

    const skillIdx = currentGroup.skills.findIndex((el) => el.id === skill.id);

    currentGroup.skills[skillIdx].questions.push({ id: uuidv4(), value: '' });

    setInterviewMatrix(matrixTreeCopy);
  };

  const handleChangeQuestion = (event: InputChangeEvent, idx: number, qidx: number) => {
    const { value, id } = event.target;
    const matrixTreeCopy = cloneDeep(interviewMatrix);
    const currentSkillGroupIdx = matrixTreeCopy.findIndex((item) => id === item.uuid);
    matrixTreeCopy[currentSkillGroupIdx].skills[idx].questions[qidx].value = value;
    setInterviewMatrix(matrixTreeCopy);
  };

  const handleClickDeleteQuestion = (currentSkill: IAssessmentSkill, uuid: string) => {
    if (currentSkill.questions.length) {
      const matrixTreeCopy = cloneDeep(interviewMatrix);
      for (const group of matrixTreeCopy) {
        group.skills.map((skill) => {
          if (currentSkill?.id === skill.id) {
            skill.questions = skill.questions.filter((el) => el.id !== uuid);
          }
          return skill;
        });
      }
      setInterviewMatrix(matrixTreeCopy);
    }
  };

  return (
    <>
      <section className={classes.interviewForm}>
        {interviewMatrix &&
          interviewMatrix.map(({ uuid, skills, value }) => (
            <div key={uuid} className={classes.group}>
              <Input
                placeholder="Skill group"
                onChange={(event: InputChangeEvent) => handleChangeSkillGroup(event)}
                id={uuid}
                value={value}
                className={classes.skillInput}
              />
              <div className={classes.skills}>
                <div className={classes.deleteSection} id={uuid} onClick={handleClickDelete}>
                  Delete section
                </div>
                {skills.map((skill, idx) => (
                  <div key={skill.id} className={classes.skill}>
                    <div className={classes.skillHeader}>
                      <Input
                        placeholder="Skill"
                        onChange={(event: InputChangeEvent) => handleChangeSkill(event, idx)}
                        id={uuid}
                        value={skill.value}
                        className={classes.skillInput}
                      />
                      <div className={classes.rightSkillElementsContainer}>
                        <Select
                          onChange={(level) => handleSkillChange(level, skill)}
                          placeholder={INTERVIEW.LEVEL_PLACEHOLDER}
                          className={classes.answerSelect}
                          value={answers && answers[String(skill.id)]}
                        >
                          {Object.keys(levelTypes).map((key) => (
                            <Select.Option value={key} key={key}>
                              {levelTypes[key as LevelTypesEnum]}
                            </Select.Option>
                          ))}
                        </Select>
                        <Button
                          className={classes.deleteIcon}
                          id={uuid}
                          type="primary"
                          onClick={() => {
                            handleDeleteSkill(skill, uuid);
                          }}
                          icon={<DeleteOutlined />}
                        />
                      </div>
                    </div>
                    <ol>
                      {skill.questions.map((ques, qidx) => (
                        <div className={classes.questionsContainer} key={ques.id}>
                          <Button
                            type="primary"
                            onClick={() => handleClickDeleteQuestion(skill, ques.id)}
                            icon={<DeleteOutlined />}
                          />
                          <Input
                            placeholder="Question"
                            onChange={(event: InputChangeEvent) => handleChangeQuestion(event, idx, qidx)}
                            id={uuid}
                            value={ques.value}
                          />
                        </div>
                      ))}
                      <Button
                        id={skill.id}
                        className={classes.addQuestionButton}
                        type="primary"
                        onClick={() => handleClickAddQuestion(skill, uuid)}
                        icon={<PlusOutlined />}
                      >
                        Add new question
                      </Button>
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          ))}
        <Button
          className={classes.addSkillButton}
          type="primary"
          onClick={() => handleClickAddSkillGroup()}
          icon={<PlusOutlined />}
        >
          Add new section
        </Button>
        <div className={classes.buttons}>
          <div className={classes.bottomContainer}>
            <Input.TextArea
              id="comment"
              rows={2}
              placeholder="Total"
              className={classes.textArea}
              onChange={handleChangeComment}
              value={comment}
            />
          </div>
          {!!interviewMatrix?.length && (
            <Button type="primary" onClick={handleFinishInterview} className={classes.finishButton}>
              {interviewResult?.answers?.length ? INTERVIEW.SAVE_CHANGES : INTERVIEW.FINISH}
            </Button>
          )}
        </div>
      </section>
      {!isLoadingInterviewMatrix ? (
        <section className={classes.interviewForm} />
      ) : (
        <Spin size="small" tip={'Loading interview matrix...'} />
      )}
      <DeleteModal
        onSubmit={handleClickDeleteSkillGroup}
        onClose={handleClose}
        isOpen={isDeleteModalOpen}
        modalTitle={'Delete section'}
      />
    </>
  );
};
