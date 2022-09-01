import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'store';
import { loadInterviewResult } from 'store/reducers/interview';
import { loadPositions } from 'store/reducers/positions';
import { loadLevels } from 'store/reducers/levels';
import { loadSoftSkillsList, loadSoftSkillInterview } from 'store/reducers/softskillsInterview';
import { loadOneCandidate, updateOneCandidate, candidatesSelector, setCandidate } from 'store/reducers/candidates';

import { Spin } from 'antd';

import { CandidateUI } from './CandidateUI';

import { cleanCandidateFields } from './utils/helpers';

export const Candidate = () => {
  const dispatch = useAppDispatch();
  const { currentCandidate, isLoading, isLoadingOneCandidate } = useSelector(candidatesSelector);

  const { id } = useParams<{ id: string }>();

  const [isChanged, setIsChanged] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const modifiedCandidate = {
      ...currentCandidate,
      [e.target.name]: e.target.value,
    };
    dispatch(setCandidate(modifiedCandidate));
    setIsChanged(true);
  };

  const handleCandidateSave = () => {
    const candidateToSave = cleanCandidateFields(currentCandidate);
    dispatch(updateOneCandidate(candidateToSave));

    setIsChanged(false);
    setIsEdited(false);
  };

  const handleClickEdit = () => {
    setIsEdited(!isEdited);
  };

  useEffect(() => {
    if (id) {
      dispatch(loadOneCandidate(id));
      dispatch(loadSoftSkillInterview(id));
      dispatch(loadInterviewResult(id));

      dispatch(loadPositions());
      dispatch(loadLevels());
      dispatch(loadSoftSkillsList());
    }
  }, [dispatch, id]);

  if (isLoadingOneCandidate) return <Spin size="large" tip={'Loading candidate...'} />;

  return (
    <CandidateUI
      handleClickEdit={handleClickEdit}
      handleCandidateSave={handleCandidateSave}
      handleChange={handleChange}
      isChanged={isChanged}
      isEdited={isEdited}
      isLoading={isLoading}
      currentCandidate={currentCandidate}
      candidateId={id}
    />
  );
};
