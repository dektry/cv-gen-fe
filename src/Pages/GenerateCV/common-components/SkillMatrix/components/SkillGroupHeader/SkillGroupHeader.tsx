import { ChangeEvent } from 'react';

import { Button, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { IDBLevels, ISkillGroup } from 'models/IUser';

import { useStyles } from './styles';

interface IProps {
  skillGroup: ISkillGroup;
  allLevels: IDBLevels[];
  handleClickDeleteSkillGroup: (uuid: string) => void;
  handleChangeSkillGroup: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SkillGroupHeader = (props: IProps) => {

  const { 
    skillGroup,
    allLevels,
    handleClickDeleteSkillGroup,
    handleChangeSkillGroup,
  } = props;

  const classes = useStyles();

  return (
    <div style={{ display: 'flex' }}>
      <Button type="primary" onClick={() => handleClickDeleteSkillGroup(skillGroup.uuid)} icon={<DeleteOutlined />} />
      <Input
        placeholder="Skill group"
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangeSkillGroup(event)}
        id={skillGroup.uuid}
        value={skillGroup.value}
        style={{ width: '25%', height: 'fit-content' }}
      />
      <div className={classes.levelNamesWrapper}>
        {allLevels.map((level) => (
          <div className={classes.levelName} key={level.id}>
            {level.name}
          </div>
        ))}
      </div>
  </div>
  )
}