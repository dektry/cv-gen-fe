import { IPersonalData } from 'models/ICommon';

import Typography from '@mui/material/Typography';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  personalData: IPersonalData;
  children?: React.ReactNode | React.ReactNode[];
}

export const PersonalInfoCard = ({
  personalData: { firstName, lastName, location, level, position },
  children,
}: IProps) => {
  const classes = useStyles({ theme });

  return (
    <div className={classes.mainContainer}>
      <div className={classes.infoContainer}>
        <div>
          <Typography variant="h2" className={classes.name}>{`${lastName} ${firstName}`}</Typography>
          <Typography variant="h5" className={classes.greyText}>
            {location}
          </Typography>
        </div>
        <div>
          <Typography className={classes.text} variant="h3">
            {position}
          </Typography>
          <Typography variant="h5" className={classes.greyText}>
            Position
          </Typography>
        </div>
        <div>
          <Typography className={classes.text} variant="h3">
            {level}
          </Typography>
          <Typography variant="h5" className={classes.greyText}>
            Level
          </Typography>
        </div>
      </div>
      {children}
    </div>
  );
};
