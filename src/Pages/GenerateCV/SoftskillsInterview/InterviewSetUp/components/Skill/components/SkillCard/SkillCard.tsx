import { Tooltip } from 'antd';

import { useStyles } from './styles';

interface IProps {
  value: string;
  question?: string;
}

export const SkillCard = (props: IProps) => {
  const classes = useStyles();

  const { value, question } = props;

  return (
    <Tooltip title={question ?? 'There will be question to this skill'} placement='bottom'>
      <div className={classes.skillCard}>
        {value}
      </div>
    </Tooltip>
  );
};
