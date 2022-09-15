import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from 'antd';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { employeesSelector, loadEmployee } from 'store/reducers/employees';


import { useStyles } from './styles';

export const EmployeeCard = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(loadEmployee(id));
    }
  }, [])

  const { currentEmployee: { fullName, location, position, level } } = useSelector(employeesSelector);

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
    <Button size='large' type='primary'>Generate CV</Button>
    </div>
  );
}