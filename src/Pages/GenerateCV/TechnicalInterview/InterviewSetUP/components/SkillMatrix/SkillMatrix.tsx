import React, { ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';

import { ILevelsSchema, IMatrix, ISkillGroup, ISkill } from 'models/IUser';

import { StateProps } from '../PositionSkillsModal';
import { SkillGroup } from './components/SkillGroup';
import { SkillGroupHeader } from './components/SkillGroupHeader';

interface ISkillProps extends StateProps {
  skillGroup: ISkillGroup;
  setMatrixTree: React.Dispatch<React.SetStateAction<IMatrix>>;
}

export const SkillMatrix = ({ skillGroup, skillMatrix, setMatrixTree, levels, allLevels }: ISkillProps) => {


  // skill groups handlers
  const handleChangeSkillGroup = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    const matrixTreeCopy = cloneDeep(skillMatrix);
    const currentSkillGroupIdx = matrixTreeCopy.findIndex((item) => id === item.uuid);
    matrixTreeCopy[currentSkillGroupIdx].value = value;
    setMatrixTree(matrixTreeCopy);
  };

  const handleClickDeleteSkillGroup = (uuid: string) => {
    if (skillMatrix.length) {
      setMatrixTree((prev) => [...prev.filter((item) => item.uuid !== uuid)]);
    }
  };
  
  // skills handlers
  const handleClickAddSkill = (group: ISkillGroup) => {
    const matrixCopy = cloneDeep(skillMatrix);
    const currentSkillGroupIdx = matrixCopy.findIndex((item) => group?.uuid === item.uuid);

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

  const handleChangeSkill = (event: ChangeEvent<HTMLInputElement>, idx: number) => {
    const { value, id } = event.target;

    const matrixTreeCopy = cloneDeep(skillMatrix);
    const currentSkillGroupIdx = matrixTreeCopy.findIndex((item) => id === item.uuid);
    matrixTreeCopy[currentSkillGroupIdx].skills[idx].value = value;
    setMatrixTree(matrixTreeCopy);
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


  // questions handlers
  const handleClickAddQuestion = (skill: ISkill) => {
    const matrixTreeCopy: IMatrix = cloneDeep(skillMatrix);
    for (const group of matrixTreeCopy) {
      const currentSkillIdx = group.skills.findIndex((item) => skill?.uuid === item.uuid);
      const currentSkill = group.skills[currentSkillIdx];
      if (currentSkill) {
        currentSkill.questions = [...currentSkill.questions, { uuid: uuidv4(), value: '' }];
        group.skills[currentSkillIdx] = currentSkill;
      }
    }
    setMatrixTree(matrixTreeCopy);
  };

  const handleChangeQuestion = (event: ChangeEvent<HTMLInputElement>, idx: number, qidx: number) => {
    const { value, id } = event.target;
    const matrixTreeCopy = cloneDeep(skillMatrix);
    const currentSkillGroupIdx = matrixTreeCopy.findIndex((item) => id === item.uuid);
    matrixTreeCopy[currentSkillGroupIdx].skills[idx].questions[qidx].value = value;
    setMatrixTree(matrixTreeCopy);
  };

  const handleClickDeleteQuestion = (currentSkill: ISkill, uuid: string) => {
    if (currentSkill.questions.length) {
      const matrixTreeCopy = cloneDeep(skillMatrix);
      for (const group of matrixTreeCopy) {
        group.skills.map((skill) => {
          if (currentSkill?.uuid === skill.uuid) {
            skill.questions = [...skill.questions.filter((el) => el.uuid !== uuid)];
          }
          return skill;
        });
      }
      setMatrixTree(matrixTreeCopy);
    }
  };

  // levels handler
  const handleChangeLevelTypesSelect = (id: string, value: string, idx: number, levelId: string) => {
    const matrixTreeCopy = cloneDeep(skillMatrix);
    const currentSkillGroupIdx = matrixTreeCopy.findIndex((item) => id === item.uuid);
    matrixTreeCopy[currentSkillGroupIdx].skills[idx].levels.map((level: ILevelsSchema) => {
      if (level?.id === levelId) {
        level.value = value;
      }
      return level;
    });

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
      <SkillGroupHeader
        skillGroup={skillGroup}
        allLevels={allLevels}
        handleClickDeleteSkillGroup={handleClickDeleteSkillGroup}
        handleChangeSkillGroup={handleChangeSkillGroup}
      />
      <SkillGroup 
        skillGroup={skillGroup}
        allLevels={allLevels}
        handleClickDeleteSkill={handleClickDeleteSkill}
        handleChangeSkill={handleChangeSkill}
        handleChangeLevelTypesSelect={handleChangeLevelTypesSelect}
        handleClickDeleteQuestion={handleClickDeleteQuestion}
        handleChangeQuestion={handleChangeQuestion}
        handleClickAddQuestion={handleClickAddQuestion}
        handleClickAddSkill={handleClickAddSkill}
      />
    </div>
  );
};
