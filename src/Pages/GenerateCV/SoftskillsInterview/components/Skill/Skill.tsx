
import { ISoftSkill } from 'models/ISoftSkillsInterview';

import { SkillCard } from './components/SkillCard';
import { SkillComment } from './components/SkillComment';
import { SkillRadioButtons } from './components/SkillRadioButtons';

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
    skill: { id, value, question, comment, score },
    softskillsInterview,
    softSkillsList,
  } = props;

  return (
    <div className={classes.skillContainer}>
      <SkillCard value={value} question={question} />
      <SkillRadioButtons 
        id={id}
        score={score}
        softskillsInterview={softskillsInterview}
        softSkillsList={softSkillsList}
      />
      <SkillComment 
        id={id} 
        comment={comment}
        softskillsInterview={softskillsInterview}
        softSkillsList={softSkillsList}
      />
    </div>
  );
}