import { Card } from 'antd';

import { useStyles } from './styles';

interface IProps {
  value: string;
  question?: string;
}

export const SkillCard = (props: IProps) => {
  const classes = useStyles();

  const { value, question } = props;

  return (
    <Card title={value} bordered={true} className={classes.skillCard}>
      {question ?? 'There will be question to this softskill'}
    </Card>
  );
};
