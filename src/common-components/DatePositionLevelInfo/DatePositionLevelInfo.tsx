import Typography from '@mui/material/Typography';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  title: string;
  date?: string;
  position: string;
  level: string;
}

export const DatePositionLevelInfo = ({ title, date, position, level }: IProps) => {
  const classes = useStyles({ theme });

  return (
    <div className={classes.upperContainer}>
      <Typography variant="h3">
        {title} {date ? new Date(date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')}
      </Typography>
      <div className={classes.positionsContainer}>
        <div className={classes.positionLevelContainer}>
          <Typography variant="h3">Position: </Typography>
          {position && (
            <Typography variant="h5" className={classes.tag}>
              {position}
            </Typography>
          )}
        </div>
        <div className={classes.positionLevelContainer}>
          <Typography variant="h3">Level: </Typography>
          {level && (
            <Typography variant="h5" className={classes.tag}>
              {level}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
