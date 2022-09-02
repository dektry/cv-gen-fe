
import { ISoftSkill } from 'models/ISoftSkillsInterview';

import { SkillCard } from './components/SkillCard';
import { SkillComment } from './components/SkillComment';

import { ISoftSkillInterview } from 'models/ISoftSkillsInterview';

import { useStyles } from './styles';


interface IProps {
  skill: ISoftSkill;
  softskillsInterview: ISoftSkillInterview;
  softSkillsList: [] | ISoftSkill[];
}

export const Skill = (props: IProps) => {
  const classes = useStyles();

  const {
    skill: { id, value, question, comment },
    softskillsInterview,
    softSkillsList,
  } = props;

  return (
    <div className={classes.skillContainer}>
      <SkillCard value={value} question={question} />
      <SkillComment 
        id={id} 
        comment={comment}
        softskillsInterview={softskillsInterview}
        softSkillsList={softSkillsList}
      />
    </div>
  );
}