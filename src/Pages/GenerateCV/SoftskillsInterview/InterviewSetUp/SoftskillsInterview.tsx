import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { cloneDeep, debounce } from 'lodash';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { candidatesSelector } from 'store/reducers/candidates';

import { Spin } from 'antd';

import {
  setSoftSkillsInterview,
  softSkillInterviewSelector,
  loadSoftSkillsList,
  loadSoftSkillInterview,
  softSkillScores, 
  finishSoftSkillInterview,
  saveChangesToSoftSkillsInterview
} from 'store/reducers/softskillsInterview';
import { loadPositions } from 'store/reducers/positions';
import { loadLevels } from 'store/reducers/levels';
import { loadOneCandidate } from 'store/reducers/candidates';

import { CandidatePopOver } from '../../common-components/PopOver';
import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { Skill } from './components/Skill';
import { SoftSkillModal } from './components/SoftSkillModal';
import { GenerateCV } from '../../common-components/GenerateCv';
import { SoftSkillFotter } from './components/SoftSkillFooter';

import { ISoftSkill } from 'models/ISoftSkillsInterview';
import paths from 'config/routes.json';

export const SoftskillsInterview = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { currentCandidate, isLoadingOneCandidate } = useSelector(candidatesSelector);
  const {
    softskillsInterview,
    softSkillsList,
    isLoading: isLoadingSoftInterview,
    scores
  } = useSelector(softSkillInterviewSelector);

  const [isOpenSkillModal, setOpenSkillModal] = useState(false);
  const [comment, setComment] = useState(softskillsInterview.comment);

  const backPath = paths.generateCVCandidatePage.replace(':id', currentCandidate.id);
  const skillsToView = softskillsInterview?.softSkills?.length ? softskillsInterview.softSkills : softSkillsList;

  const debouncedFeedback = useRef(
    debounce((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      const softskillsInterviewCopy = cloneDeep(softskillsInterview);
      softskillsInterviewCopy.comment = value;
      softskillsInterviewCopy.candidateId = id;
      (softskillsInterview?.softSkills?.length || softskillsInterview?.comment) ?
        dispatch(saveChangesToSoftSkillsInterview(softskillsInterviewCopy)) :
        dispatch(finishSoftSkillInterview(softskillsInterviewCopy));
      dispatch(setSoftSkillsInterview(softskillsInterviewCopy));
    }, 600)
  ).current;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
      debouncedFeedback(e);
    },
    [debouncedFeedback]
  );

  useEffect(() => {
    const softskillsInterviewCopy = cloneDeep(softskillsInterview);
    softskillsInterviewCopy.candidateId = currentCandidate.id;
    dispatch(setSoftSkillsInterview(softskillsInterviewCopy));
  }, [currentCandidate]);

  useEffect(() => {
    if (id) {
      dispatch(loadOneCandidate(id));
      dispatch(loadSoftSkillInterview(id));

      dispatch(loadPositions());
      dispatch(loadLevels());
      dispatch(loadSoftSkillsList());
      dispatch(softSkillScores());
    }
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      debouncedFeedback.cancel();
    };
  }, [debouncedFeedback]);

  if (isLoadingOneCandidate || isLoadingSoftInterview)
    return <Spin size="large" tip={'Loading soft skills interview...'} />;

  return (
    <>
      <GenerateCV />
      <GenerateCvHeader backPath={backPath}>
        <CandidatePopOver />
      </GenerateCvHeader>
      {skillsToView &&
        skillsToView.map((el: ISoftSkill) => (
          <Skill 
            key={el.id} 
            skill={el} 
            softskillsInterview={softskillsInterview} 
            softSkillsList={softSkillsList} 
            scores={scores}
            candidateId={id}
          />
        ))}
      <SoftSkillModal isOpenSkillModal={isOpenSkillModal} onClose={() => setOpenSkillModal(false)} />
      <SoftSkillFotter
        setOpenSkillModal={setOpenSkillModal}
        handleChange={handleChange}
        comment={softskillsInterview.comment}
        currentCandidate={currentCandidate}
      />
    </>
  );
};
