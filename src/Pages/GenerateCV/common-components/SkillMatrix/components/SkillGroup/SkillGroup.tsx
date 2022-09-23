import { Fragment, ChangeEvent } from 'react';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { IDBLevels, ISkillGroup } from 'models/IUser';
import { ISkill } from 'models/IUser';

import { SkillQuestions } from '../SkillQuestions';
import { SkillSelects } from '../SkillSelects';

interface IProps {
  skillGroup: ISkillGroup;
  allLevels: IDBLevels[];
  handleClickDeleteSkill: (group: ISkillGroup, skill: ISkill) => void;
  handleChangeSkill: (event: ChangeEvent<HTMLInputElement>, idx: number) => void;
  handleChangeLevelTypesSelect: (id: string, value: string, idx: number, levelId: string) => void;
  handleClickDeleteQuestion: (currentSkill: ISkill, uuid: string) => void;
  handleChangeQuestion: (event: ChangeEvent<HTMLInputElement>, idx: number, qidx: number) => void;
  handleClickAddQuestion: (skill: ISkill) => void;
  handleClickAddSkill: (group: ISkillGroup) => void;
}

export const SkillGroup = (props: IProps) => {
  const {
    skillGroup,
    allLevels,
    handleClickDeleteSkill,
    handleChangeSkill,
    handleChangeLevelTypesSelect,
    handleClickDeleteQuestion,
    handleChangeQuestion,
    handleClickAddQuestion,
    handleClickAddSkill,
  } = props;

  return (
    <>
      {skillGroup.skills.map((skill, idx) => (
        <Fragment key={skill.uuid}>
          <SkillSelects
            allLevels={allLevels}
            skill={skill}
            idx={idx}
            skillGroup={skillGroup}
            handleClickDeleteSkill={handleClickDeleteSkill}
            handleChangeSkill={handleChangeSkill}
            handleChangeLevelTypesSelect={handleChangeLevelTypesSelect}
          />
          <SkillQuestions
            skill={skill}
            handleClickDeleteQuestion={handleClickDeleteQuestion}
            handleChangeQuestion={handleChangeQuestion}
            idx={idx}
            skillGroupUiid={skillGroup.uuid}
          />
          <div style={{ marginLeft: '100px', marginTop: '10px' }}>
            <Button type="primary" onClick={() => handleClickAddQuestion(skill)} icon={<PlusOutlined />} />
          </div>
        </Fragment>
      ))}
      <Button
        style={{ marginLeft: '50px', marginTop: '10px' }}
        type="primary"
        onClick={() => handleClickAddSkill(skillGroup)}
        icon={<PlusOutlined />}
      />
    </>
  );
};
