import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  type: string;
}
export const TypeBadge = ({ type }: IProps) => {
  const classes = useStyles({ theme });

  const style = type === 'Assessment' ? classes.typeAssessment : classes.typeInterview;

  return <div className={style}>{type}</div>;
};
