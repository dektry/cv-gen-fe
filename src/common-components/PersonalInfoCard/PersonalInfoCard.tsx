import { IPersonalData } from 'models/ICommon';

import { useStyles } from './styles';

interface IProps {
  personalData: IPersonalData;
  children?: React.ReactNode | React.ReactNode[];
}

export const PersonalInfoCard = ({
  personalData: { firstName, lastName, location, level, position },
  children,
}: IProps) => {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.infoContainer}>
        <div>
          <h2 className={classes.name}>{`${lastName} ${firstName}`}</h2>
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
};
