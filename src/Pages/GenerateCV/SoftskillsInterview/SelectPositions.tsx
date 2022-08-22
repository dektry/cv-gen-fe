import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import {
  chooseInterviewPosition,
  chooseInterviewLevel,
  softSkillInterviewSelector,
} from 'store/reducers/softskillsInterview';
import * as interviewStore from 'store/reducers/interview';
import { positionsSelector } from 'store/reducers/positions';
import { levelsSelector } from 'store/reducers/levels';

import { Select, Button } from 'antd';

import { useStyles } from 'pages/GenerateCV/SoftskillsInterview/styles';
import { SOFT_SKILL_INTERVIEW } from 'pages/CandidatesTable/utils/constants';

interface IProps {
  setFieldsDisabled: Dispatch<SetStateAction<boolean>>;
  fieldsDisabled: boolean;
}

export const SelectPositions = (props: IProps) => {
  const { setFieldsDisabled, fieldsDisabled } = props;

  const classes = useStyles();
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);

  const dispatch = useAppDispatch();
  const {
    softskillsInterview: { level, position, successfullySaved },
  } = useSelector(softSkillInterviewSelector);
  const { allPositions } = useSelector(positionsSelector);
  const { allLevels } = useSelector(levelsSelector);
  const { interviewResult } = useSelector(interviewStore.interviewSelector);

  useEffect(() => {
    if (interviewResult || successfullySaved) {
      setIsSelectDisabled(true);
    } else {
      setIsSelectDisabled(false);
    }
  }, [interviewResult, successfullySaved]);

  const handleClick = () => {
    setFieldsDisabled(!fieldsDisabled);
  };

  const handleSelectPositionChange = (value: string) => {
    const chosenPosition = allPositions.find(el => el.id === value);
    dispatch(
      chooseInterviewPosition({
        id: chosenPosition?.id,
        name: chosenPosition?.name,
      }),
    );
    dispatch(interviewStore.chooseInterviewPosition(chosenPosition?.id));
  };

  const handleSelectLevelChange = (value: string) => {
    const chosenLevel = allLevels.find(el => el.id === value);
    dispatch(
      chooseInterviewLevel({
        id: chosenLevel?.id,
        name: chosenLevel?.name,
      }),
    );
    dispatch(interviewStore.chooseInterviewLevel(chosenLevel?.id));
  };

  const editButtonText = fieldsDisabled
    ? SOFT_SKILL_INTERVIEW.START_EDIT
    : SOFT_SKILL_INTERVIEW.DISABLE_EDIT;
  return (
    <div className={classes.selectContainer}>
      <div className={classes.selectsWrapper}>
        <Select
          onChange={(value: string) => handleSelectPositionChange(value)}
          placeholder={SOFT_SKILL_INTERVIEW.POSITION_PLACEHOLDER}
          className={classes.selects}
          value={position?.id || interviewResult?.position?.id}
          disabled={isSelectDisabled}
        >
          {allPositions.map(selectPosition => (
            <Select.Option value={selectPosition.id} key={selectPosition.id}>
              {selectPosition.name}
            </Select.Option>
          ))}
        </Select>
        <Select
          onChange={(value: string) => handleSelectLevelChange(value)}
          placeholder={SOFT_SKILL_INTERVIEW.LEVEL_PLACEHOLDER}
          className={classes.selects}
          value={level?.id || interviewResult?.level?.id}
          disabled={isSelectDisabled}
        >
          {allLevels.map(selectLevel => (
            <Select.Option value={selectLevel.id} key={selectLevel.id}>
              {selectLevel.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      {successfullySaved && (
        <Button
          className={classes.editButton}
          onClick={handleClick}
          disabled={!successfullySaved}
        >
          {editButtonText}
        </Button>
      )}
    </div>
  );
};
