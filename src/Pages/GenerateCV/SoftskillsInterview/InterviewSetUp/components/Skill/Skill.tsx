import { ISoftSkill, ISoftSkillScore } from 'models/ISoftSkillsInterview';

import { SkillCard } from './components/SkillCard';
import { SkillComment } from './components/SkillComment';
import { SkillRadioButtons } from './components/SkillRadioButtons';

import { ISoftSkillInterview } from 'models/ISoftSkillsInterview';

import { useStyles } from './styles';

interface IProps {
  skill: ISoftSkill;
  softskillsInterview: ISoftSkillInterview;
  softSkillsList: [] | ISoftSkill[];
  scores: ISoftSkillScore[];
  candidateId?: string;
}

export const Skill = (props: IProps) => {
  const classes = useStyles();

  const {
    skill: { id, value, question, comment },
    softskillsInterview,
    softSkillsList,
    scores,
    candidateId,
  } = props;

  return (
    <div className={classes.skillContainer}>
      <SkillCard value={value} question={question} />
      <SkillRadioButtons 
        id={id}
        scores={scores}
        softskillsInterview={softskillsInterview}
        softSkillsList={softSkillsList}
        candidateId={candidateId}
      />
      <SkillComment 
        id={id} 
        comment={comment}
        softskillsInterview={softskillsInterview}
        softSkillsList={softSkillsList}
        candidateId={candidateId}
      />
    </div>
  );
};
