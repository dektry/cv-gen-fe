import React, { useState } from 'react';
import { cloneDeep } from 'lodash';

import { Select, Button, Spin } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { useAppDispatch } from 'store';

import {
  IInterviewSkill,
  IInterviewAnswers,
  IInterviewResult,
  LevelTypesEnum,
  IInterviewMatrix,
} from 'models/IInterview';
import { NullableField } from 'models/TNullableField';
import { IAssessmentFromDB } from 'models/ITechAssessment';
import { IMatrix } from 'models/IUser';

import { createSkillMatrix } from 'actions/skills';

import {
  INTERVIEW,
  levelTypes,
} from '../../TechnicalInterview/InterviewSetUP/components/InterviewForm/utils/constants';

import { useStyles } from './styles';

import { DeleteModal } from 'Pages/GenerateCV/common-components/DeleteModal';
import { loadInterviewMatrix } from 'store/reducers/interview';

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
  chosenPosition?: string;
  chosenLevel?: string;
  interviewResult: NullableField<IInterviewResult | IAssessmentFromDB>;
  interviewMatrix: IInterviewMatrix;
  isLoadingInterviewMatrix: boolean;
  skillMatrix: IMatrix;
  setMatrixTree: React.Dispatch<React.SetStateAction<IMatrix>>;
  matrixTree: IMatrix;
}
interface IDeleteEventTarget extends EventTarget {
  id: string;
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
    chosenLevel,
    interviewResult,
    interviewMatrix,
    isLoadingInterviewMatrix,
    skillMatrix,
    setMatrixTree,
    matrixTree,
  } = props;

  const [isTreeChanged, setIsTreeChanged] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [skillGroupId, setSkillGroupId] = useState('');

  const classes = useStyles();

  const dispatch = useAppDispatch();

  const handleSkillChange = (level: LevelTypesEnum, skill: IInterviewSkill) => {
    setAnswers({ ...answers, [skill.id]: level });
    setIsTreeChanged(true);
  };

  const handleMatrixModalOpen = async () => {
    if (chosenPosition && skillMatrix.length) {
      setOpenMatrixModal(true);
    }
  };

  const handleClickDelete = (e: IDeleteElement) => {
    setSkillGroupId(e.target.id);
    setDeleteModalOpen(true);
  };

  const handleClickDeleteSkillGroup = async () => {
    if (skillMatrix.length) {
      setMatrixTree((prev) => [...prev.filter((item) => item.uuid !== skillGroupId)]);
      await createSkillMatrix({ matrixTree, position_id: chosenPosition || '' });
    }
    if (chosenPosition && chosenLevel) {
      dispatch(loadInterviewMatrix({ positionId: chosenPosition, levelId: chosenLevel }));
    }
    setDeleteModalOpen(false);
  };

  const handleClose = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteSkill = async (skill: IInterviewSkill, id: string) => {
    const group = matrixTree[matrixTree.findIndex((item) => item.uuid === id)];

    const currentSkill = group.skills[group.skills.findIndex((el) => el.uuid === skill.id)];

    if (group.skills.length && currentSkill) {
      const matrixTreeCopy = cloneDeep(skillMatrix);

      const newMatrix = matrixTreeCopy.map((item) => {
        if (group?.uuid === item.uuid) {
          return {
            ...item,
            skills: [...item.skills.filter((i) => i.uuid !== currentSkill.uuid)],
          };
        }
        return item;
      });

      setMatrixTree(newMatrix);
      await createSkillMatrix({ matrixTree, position_id: chosenPosition || '' });
      if (chosenPosition && chosenLevel) {
        dispatch(loadInterviewMatrix({ positionId: chosenPosition, levelId: chosenLevel }));
      }
    }
  };

  return (
    <>
      {isShowInterviewQuestions ? (
        <section className={classes.interviewForm}>
          {interviewMatrix.map(({ id, skills, value }) => (
            <div key={id} className={classes.group}>
              <h2>{value}</h2>
              <div className={classes.skills}>
                <div className={classes.deleteSection} id={id} onClick={handleClickDelete}>
                  Delete section
                </div>
                {skills.map((skill) => (
                  <div key={skill.id} className={classes.skill}>
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
                          value={answers && answers[skill.id]}
                        >
                          {Object.keys(levelTypes).map((key) => (
                            <Select.Option value={key} key={key} disabled={!isEditActive}>
                              {levelTypes[key as LevelTypesEnum]}
                            </Select.Option>
                          ))}
                        </Select>
                        <Button
                          className={classes.deleteIcon}
                          id={id}
                          type="primary"
                          onClick={() => {
                            handleDeleteSkill(skill, id);
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
      <DeleteModal
        onSubmit={handleClickDeleteSkillGroup}
        onClose={handleClose}
        isOpen={isDeleteModalOpen}
        modalTitle={'Delete section'}
      />
    </>
  );
};
