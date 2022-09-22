import { ChangeEvent } from 'react';

import { Button, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { ISkill } from 'models/IUser';

interface IProps {
  skill: ISkill;
  handleClickDeleteQuestion: (currentSkill: ISkill, uuid: string) => void;
  handleChangeQuestion: (event: ChangeEvent<HTMLInputElement>, idx: number, qidx: number) => void;
  idx: number;
  skillGroupUiid: string;
}

export const SkillQuestions = (props: IProps) => {
  const { 
    skill,
    handleClickDeleteQuestion,
    handleChangeQuestion,
    idx,
    skillGroupUiid,
   } = props;
  
  return (
    <>
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
              onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangeQuestion(event, idx, qidx)}
              id={skillGroupUiid}
              value={question.value}
            />
          </div>
        ))}
    </>
  );
}