import React, { useState, useCallback } from 'react';
import { Button, Input, Radio, RadioChangeEvent } from 'antd';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { interviewSelector, saveChangesToInterview } from 'store/reducers/interview';
import { candidatesSelector } from 'store/reducers/candidates';
import { positionsSelector } from 'store/reducers/positions';
import { levelsSelector } from 'store/reducers/levels';

import { useStyles } from './styles';
import { INTERVIEW } from '../InterviewForm/utils/constants';

import { InterviewResultsTable } from './InterviewResultsTable';
import { InterviewInfoCard } from './InterviewInfoCard';
import { ICompleteInterview } from 'models/IInterview';

import { processAnswers } from '../InterviewForm/utils/helpers/processAnswers';

export const InterviewResult = () => {
  const dispatch = useAppDispatch();
  const {
    interviewResult,
    chosenLevel,
    chosenPosition,
    interviewMatrix,
  } = useSelector(interviewSelector);

  const [isEdited, setIsEdited] = useState(false);
  const [isOffered, setIsOffered] = useState(interviewResult?.isOffered);
  const [comment, setComment] = useState(interviewResult?.comment);

  const classes = useStyles();

  const { currentCandidate } = useSelector(candidatesSelector);
  const { allPositions } = useSelector(positionsSelector);
  const { allLevels } = useSelector(levelsSelector);

  const handleChangeComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setComment(event.target.value);
  };

  const handleRadioChange = (event: RadioChangeEvent) => {
    setIsOffered(event.target.value);
  };

  const handleEdit = () => {
    setIsEdited(!isEdited);
  };

  const handleSaveChanges = useCallback(() => {
    if (interviewResult) {
      const processedAnswers = processAnswers(interviewResult, interviewMatrix);
      const interviewData: ICompleteInterview = {
        candidateId: currentCandidate.id,
        positionId: chosenPosition || interviewResult.position.id || '',
        levelId: chosenLevel || interviewResult.level.id || '',
        comment,
        isOffered,
        answers: processedAnswers,
      };

      dispatch(saveChangesToInterview(interviewData));
      setIsEdited(false);
    }
  }, [
    interviewResult,
    interviewMatrix,
    chosenPosition,
    chosenLevel,
    comment,
    currentCandidate,
    isOffered,
    dispatch,
  ]);

  const radioOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];

  return (
    <section className={classes.interviewResult}>
      <InterviewResultsTable />
      <div>
        <span className={classes.informationTitle}>{INTERVIEW.CANDIDATE}</span>
        <span>{currentCandidate?.fullName}</span>
      </div>
      <div className={classes.infoFields}>
        <InterviewInfoCard
          isEdited={isEdited}
          cardOptions="position"
          positions={allPositions}
        />
        <InterviewInfoCard
          isEdited={isEdited}
          cardOptions="level"
          levels={allLevels}
        />
        <Button className={classes.editButton} onClick={handleEdit}>
          {isEdited ? 'Disable edit' : 'Edit'}
        </Button>
      </div>
      <div className={classes.bottomContainer}>
        <div>
          Offer recommendation:{' '}
          <Radio.Group
            options={radioOptions}
            disabled={!isEdited}
            onChange={handleRadioChange}
            value={isOffered}
          />
        </div>
        <Input.TextArea
          id="comment"
          rows={2}
          placeholder="Comment"
          className={classes.textArea}
          onChange={handleChangeComment}
          value={comment}
          disabled={!isEdited}
        />
        <Button
          className={classes.editButton}
          disabled={!isEdited}
          onClick={handleSaveChanges}
        >
          Save changes
        </Button>
      </div>
    </section>
  );
};
