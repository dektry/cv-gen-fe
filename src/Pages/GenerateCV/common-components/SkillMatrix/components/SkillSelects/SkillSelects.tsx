import { ChangeEvent } from 'react';

import { Button, Select, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { ISkillGroup, ISkill, IDBLevels } from 'models/IUser';
import { levelTypes } from '../../../PositionSkillsModal/utils/constants';
import { LevelTypesEnum } from 'models/IInterview';

import { useStyles } from './styles';

interface IProps {
  skillGroup: ISkillGroup;
  skill: ISkill;
  handleClickDeleteSkill: (group: ISkillGroup, skill: ISkill) => void;
  handleChangeSkill: (event: ChangeEvent<HTMLInputElement>, idx: number) => void;
  handleChangeLevelTypesSelect: (id: string, value: string, idx: number, levelId: string) => void;
  idx: number;
  allLevels: IDBLevels[];
}

export const SkillSelects = (props: IProps) => {
  const { skill, skillGroup, handleChangeSkill, handleClickDeleteSkill, idx, allLevels, handleChangeLevelTypesSelect } =
    props;

  const classes = useStyles();

  return (
    <div className={classes.levelSelectsWrapper}>
      <Button type="primary" onClick={() => handleClickDeleteSkill(skillGroup, skill)} icon={<DeleteOutlined />} />
      <Input
        placeholder="Skill"
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangeSkill(event, idx)}
        id={skillGroup.uuid}
        value={skill.value}
        style={{ width: '21.6%' }}
      />
      <div className={classes.selectWrapper}>
        {allLevels.map((level) => (
          <Select
            key={level.id}
            defaultValue={skill.levels.find(({ id }) => id === level.id)?.value || 'none'}
            className={classes.select}
            onChange={(value: string) =>
              handleChangeLevelTypesSelect(skillGroup.uuid, value, idx, level.id ? level.id : '')
            }
          >
            {Object.keys(levelTypes).map((key) => (
              <Select.Option value={key} key={key}>
                {levelTypes[key as LevelTypesEnum]}
              </Select.Option>
            ))}
          </Select>
        ))}
      </div>
    </div>
  );
};
