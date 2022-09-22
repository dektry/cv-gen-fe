import React from 'react';
import { IDBPosition, IDBLevels } from 'models/IUser';

import { useStyles } from './styles';

const Positions = ({ position, level }: { position: IDBPosition; level: IDBLevels }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.positionOrLevel}>
        <p className={classes.name}>Desired position:</p>
        <h4>{position?.name}</h4>
      </div>
      <div className={classes.positionOrLevel}>
        <p className={classes.name}>Desired level:</p>
        <h4>{level?.name}</h4>
      </div>
    </div>
  );
};

export const AssessmentPositions = React.memo(Positions);
