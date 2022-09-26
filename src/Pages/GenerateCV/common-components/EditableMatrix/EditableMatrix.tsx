import { useState } from 'react';
import { cloneDeep } from 'lodash';

import { Spin, Button, Select, Input } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import { IInterviewAnswers } from 'models/IInterview';
import { IAssessmentFromDB, IAssessmentMatrix, IAssessmentSkill, IAssessmentSkillGroup } from 'models/ITechAssessment';
import { NullableField } from 'models/TNullableField';
import { LevelTypesEnum } from 'models/IInterview';

import { DeleteModal } from '../DeleteModal';

import {
  INTERVIEW,
  levelTypes,
} from 'Pages/GenerateCV/TechnicalInterview/InterviewSetUP/components/InterviewForm/utils/constants';

import { useStyles } from './styles';

interface IProps {
  answers?: IInterviewAnswers;
  setAnswers: (value: React.SetStateAction<IInterviewAnswers | undefined>) => void;
  handleFinishInterview: () => Promise<void>;
  isEditActive?: boolean;
  handleSkillClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  chosenPosition?: string;
  chosenLevel?: string;
  interviewResult: NullableField<IAssessmentFromDB>;
  interviewMatrix: IAssessmentMatrix;
  isLoadingInterviewMatrix: boolean;
  setInterviewMatrix: React.Dispatch<React.SetStateAction<IAssessmentMatrix>>;
  comment?: string;
  setComment: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleClickDeleteSkill: (group: IAssessmentSkillGroup, skill: IAssessmentSkill) => void;
}
interface IDeleteEventTarget extends EventTarget {
  id: string;
}
interface IDeleteElement extends React.MouseEvent<HTMLDivElement> {
  target: IDeleteEventTarget;
}

export const EditableMatrix = ({
  answers,
  setAnswers,
  handleFinishInterview,
  isEditActive,
  handleSkillClick,
  interviewResult,
  interviewMatrix,
  comment,
  setComment,
  isLoadingInterviewMatrix,
  setInterviewMatrix,
}: IProps) => {
  const [isTreeChanged, setIsTreeChanged] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [skillGroupId, setSkillGroupId] = useState('');

  const classes = useStyles();

  const handleChangeComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSkillChange = (level: LevelTypesEnum, skill: IAssessmentSkill) => {
    setAnswers({ ...answers, [String(skill?.uuid)]: level });
    setIsTreeChanged(true);
  };

  const handleClickDelete = (e: IDeleteElement) => {
    setSkillGroupId(e.target.id);
    setDeleteModalOpen(true);
  };

  const handleClickDeleteSkillGroup = () => {
    if (interviewMatrix.length) {
      setInterviewMatrix((prev) => [...prev.filter((item) => item.uuid !== skillGroupId)]);
    }
    setDeleteModalOpen(false);
  };

  const handleClose = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteSkill = async (skill: IAssessmentSkill, id: string) => {
    const group = interviewMatrix[interviewMatrix.findIndex((item) => item.uuid === id)];

    const currentSkill = group.skills[group.skills.findIndex((el) => el.uuid === skill.uuid)];

    if (group.skills.length && currentSkill) {
      const matrixTreeCopy = cloneDeep(interviewMatrix);

      const newMatrix = matrixTreeCopy.map((item) => {
        if (group?.uuid === item.uuid) {
          return {
            ...item,
            skills: [...item.skills.filter((i) => i.uuid !== currentSkill.uuid)],
          };
        }
        return item;
      });

      setInterviewMatrix(newMatrix);
    }
  };

  return (
    <>
      <section className={classes.interviewForm}>
        {interviewMatrix &&
          interviewMatrix.map(({ uuid, skills, value }) => (
            <div key={uuid} className={classes.group}>
              <h2>{value}</h2>
              <div className={classes.skills}>
                <div className={classes.deleteSection} id={uuid} onClick={handleClickDelete}>
                  Delete section
                </div>
                {skills.map((skill) => (
                  <div key={skill.uuid} className={classes.skill}>
                    <div className={classes.skillHeader}>
                      <h3>{skill.value}</h3>
                      <div className={classes.rightSkillElementsContainer}>
                        {skill.levels.map((level) => (
                          <strong key={level.value} className={classes.greenColor}>
                            {levelTypes[level.value]}
                          </strong>
                        ))}
                        <Select
                          onChange={(level) => handleSkillChange(level, skill)}
                          placeholder={INTERVIEW.LEVEL_PLACEHOLDER}
                          className={classes.answerSelect}
                          value={answers && answers[String(skill.uuid)]}
                        >
                          {Object.keys(levelTypes).map((key) => (
                            <Select.Option value={key} key={key} disabled={!isEditActive}>
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
                      {skill.questions.map((ques) => (
                        <li key={ques.id}>{ques.value}</li>
                      ))}
                      <Button
                        id={uuid}
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
