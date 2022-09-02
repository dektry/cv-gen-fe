
import { ISoftSkill } from 'models/ISoftSkillsInterview';

import { SkillCard } from './components/SkillCard';
import { SkillComment } from './components/SkillComment';

import { useStyles } from './styles';


interface IProps {
  skill: ISoftSkill;
}

export const Skill = (props: IProps) => {
  const classes = useStyles();

  const {
    skill: { id, value, question, comment },
  } = props;

  return (
    <div className={classes.skillContainer}>
      <SkillCard value={value} question={question} />
      <SkillComment id={id} comment={comment} />
    </div>
  );
}