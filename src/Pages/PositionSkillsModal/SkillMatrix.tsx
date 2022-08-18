import React, { ChangeEvent, Fragment } from 'react';
import { Button, Input, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';

import {
  ILevelsSchema,
  IMatrix,
  ISkillGroup,
  ISkill,
} from 'models/IUser';
import { LevelTypesEnum } from 'models/IInterview';

import { levelTypes } from '../InterviewForm/utils/constants';
import { StateProps } from './PositionSkillsModal';

import { useStyles } from './styles';

const { Option } = Select;

interface ISkillProps extends StateProps {
  skillGroup: ISkillGroup;
  setMatrixTree: React.Dispatch<React.SetStateAction<IMatrix>>;
}

export const SkillMatrix = ({
  skillGroup,
  skillMatrix,
  setMatrixTree,
  levels,
  allLevels,
}: ISkillProps) => {
  const classes = useStyles();

  const handleClickAddSkill = (group: ISkillGroup) => {
    const matrixCopy = cloneDeep(skillMatrix);
    const currentSkillGroupIdx = matrixCopy.findIndex(
      item => group.uuid === item.uuid,
    );

    const currentSkillGroup = matrixCopy[currentSkillGroupIdx];
    if (currentSkillGroup) {
      currentSkillGroup.skills = [
        ...currentSkillGroup.skills,
        {
          uuid: uuidv4(),
          value: '',
          questions: [{ uuid: uuidv4(), value: '' }],
          levels: cloneDeep(levels),
        },
      ];
      setMatrixTree(matrixCopy);
    }
  };

  const handleClickAddQuestion = (skill: ISkill) => {
    const matrixTreeCopy: IMatrix = cloneDeep(skillMatrix);
    for (const group of matrixTreeCopy) {
      const currentSkillIdx = group.skills.findIndex(
        item => skill.uuid === item.uuid,
      );
      const currentSkill = group.skills[currentSkillIdx];
      if (currentSkill) {
        currentSkill.questions = [
          ...currentSkill.questions,
          { uuid: uuidv4(), value: '' },
        ];
        group.skills[currentSkillIdx] = currentSkill;
      }
    }
    setMatrixTree(matrixTreeCopy);
  };

  const handleClickDeleteSkillGroup = (uuid: string) => {
    if (skillMatrix.length) {
      setMatrixTree(prev => [...prev.filter(item => item.uuid !== uuid)]);
    }
  };

  const handleClickDeleteSkill = (group: ISkillGroup, skill: ISkill) => {
    if (group.skills.length) {
      const matrixTreeCopy = cloneDeep(skillMatrix);
      const newMatrix = matrixTreeCopy.map(item => {
        if (group.uuid === item.uuid) {
          return {
            ...item,
            skills: [...item.skills.filter(i => i.uuid !== skill.uuid)],
          };
        }
        return item;
      });
      setMatrixTree(newMatrix);
    }
  };

  const handleClickDeleteQuestion = (currentSkill: ISkill, uuid: string) => {
    if (currentSkill.questions.length) {
      const matrixTreeCopy = cloneDeep(skillMatrix);
      for (const group of matrixTreeCopy) {
        group.skills.map(skill => {
          if (currentSkill.uuid === skill.uuid) {
            skill.questions = [
              ...skill.questions.filter(el => el.uuid !== uuid),
            ];
          }
          return skill;
        });
      }
      setMatrixTree(matrixTreeCopy);
    }
  };

  const handleChangeSkillGroup = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    const matrixTreeCopy = cloneDeep(skillMatrix);
    const currentSkillGroupIdx = matrixTreeCopy.findIndex(
      item => id === item.uuid,
    );
    matrixTreeCopy[currentSkillGroupIdx].value = value;
    setMatrixTree(matrixTreeCopy);
  };

  const handleChangeSkill = (
    event: ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const { value, id } = event.target;

    const matrixTreeCopy = cloneDeep(skillMatrix);
    const currentSkillGroupIdx = matrixTreeCopy.findIndex(
      item => id === item.uuid,
    );
    matrixTreeCopy[currentSkillGroupIdx].skills[idx].value = value;
    setMatrixTree(matrixTreeCopy);
  };

  const handleChangeQuestion = (
    event: ChangeEvent<HTMLInputElement>,
    idx: number,
    qidx: number,
  ) => {
    const { value, id } = event.target;
    const matrixTreeCopy = cloneDeep(skillMatrix);
    const currentSkillGroupIdx = matrixTreeCopy.findIndex(
      item => id === item.uuid,
    );
    matrixTreeCopy[currentSkillGroupIdx].skills[idx].questions[
      qidx
    ].value = value;
    setMatrixTree(matrixTreeCopy);
  };

  const handleChangeLevelTypesSelect = (
    id: string,
    value: string,
    idx: number,
    levelId: string,
  ) => {
    const matrixTreeCopy = cloneDeep(skillMatrix);
    const currentSkillGroupIdx = matrixTreeCopy.findIndex(
      item => id === item.uuid,
    );
    matrixTreeCopy[currentSkillGroupIdx].skills[idx].levels.map(
      (level: ILevelsSchema) => {
        if (level.id === levelId) {
          level.value = value;
        }
        return level;
      },
    );

    setMatrixTree(matrixTreeCopy);
  };

  return (
    <div
      style={{
        marginTop: '10px',
        minWidth: '100%',
        maxWidth: '100%',
      }}
      key={skillGroup.uuid}
    >
      <div style={{ display: 'flex' }}>
        <Button
          type="primary"
          onClick={() => handleClickDeleteSkillGroup(skillGroup.uuid)}
          icon={<DeleteOutlined />}
        />
        <Input
          placeholder="Skill group"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChangeSkillGroup(event)
          }
          id={skillGroup.uuid}
          value={skillGroup.value}
          style={{ width: '25%', height: 'fit-content' }}
        />
        <div className={classes.levelNamesWrapper}>
          {allLevels.map(level => (
            <div className={classes.levelName} key={level.id}>
              {level.name}
            </div>
          ))}
        </div>
      </div>
      {skillGroup.skills.map((skill, idx) => (
        <Fragment key={skill.uuid}>
          <div className={classes.levelSelectsWrapper}>
            <Button
              type="primary"
              onClick={() => handleClickDeleteSkill(skillGroup, skill)}
              icon={<DeleteOutlined />}
            />
            <Input
              placeholder="Skill"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleChangeSkill(event, idx)
              }
              id={skillGroup.uuid}
              value={skill.value}
              style={{ width: '21.6%' }}
            />
            <div className={classes.selectWrapper}>
              {allLevels.map(level => (
                <Select
                  key={level.id}
                  defaultValue={
                    skill.levels.find(({ id }) => id === level.id)?.value ||
                    'none'
                  }
                  className={classes.select}
                  onChange={(value: string) =>
                    handleChangeLevelTypesSelect(
                      skillGroup.uuid,
                      value,
                      idx,
                      level.id,
                    )
                  }
                >
                  {Object.keys(levelTypes).map(key => (
                    <Option value={key} key={key}>
                      {levelTypes[key as LevelTypesEnum]}
                    </Option>
                  ))}
                </Select>
              ))}
            </div>
          </div>
          {skill.questions.map((question, qidx) => (
            <div
              style={{
                marginLeft: '100px',
                marginTop: '10px',
                display: 'flex',
              }}
              key={question.uuid}
            >
              <Button
                type="primary"
                onClick={() => handleClickDeleteQuestion(skill, question.uuid)}
                icon={<DeleteOutlined />}
              />
              <Input
                placeholder="Question"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChangeQuestion(event, idx, qidx)
                }
                id={skillGroup.uuid}
                value={question.value}
              />
            </div>
          ))}
          <div style={{ marginLeft: '100px', marginTop: '10px' }}>
            <Button
              type="primary"
              onClick={() => handleClickAddQuestion(skill)}
              icon={<PlusOutlined />}
            />
          </div>
        </Fragment>
      ))}
      <Button
        style={{ marginLeft: '50px', marginTop: '10px' }}
        type="primary"
        onClick={() => handleClickAddSkill(skillGroup)}
        icon={<PlusOutlined />}
      />
    </div>
  );
};
