import { ISoftSkill } from 'models/ISoftAssessment';

import { useStyles } from './styles';

interface IProps {
  skill: ISoftSkill;
}

export const SkillName = (props: IProps) => {
  const { skill } = props;

  const classes = useStyles();

  return <div className={classes.skillName}>{skill.value}</div>;
};
