import { NullableField } from 'models/TNullableField';

import { useStyles } from './styles';

interface IProps {
  fullName: string;
  location: NullableField<string>;
  position: NullableField<string>;
  level: NullableField<string>;
  children?: React.ReactNode | React.ReactNode[];
}

export const PersonalInfoCard = ({location, fullName, position, level, children}: IProps) => {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.infoContainer}>
        <div>
          <h2 className={classes.name}>{fullName}</h2>
          <p className={classes.greyText}>{location}</p>
        </div>
        <div className={classes.positionAndLevelContainer}>
          <div className={classes.innerContainer}>
            <p className={classes.greyText}>Position</p>
            <p>{position}</p>
          </div>
          <div className={classes.innerContainer}>
            <p className={classes.greyText}>Level</p>
            <p>{level}</p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}