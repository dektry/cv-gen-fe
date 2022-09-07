import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { candidatesSelector } from 'store/reducers/candidates';

import { Spin } from 'antd';

import {
  setSoftSkillsInterview,
  softSkillInterviewSelector,
  finishSoftSkillInterview,
  saveChangesToSoftSkillsInterview,
  setSoftSkillInterviewSkillsList,
  loadSoftSkillsList,
  loadSoftSkillInterview,
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
  } = useSelector(softSkillInterviewSelector);

  const [isOpenSkillModal, setOpenSkillModal] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [comment, setComment] = useState(softskillsInterview.comment);
  const [fieldsDisabled, setFieldsDisabled] = useState(false);

  const backPath = paths.generateCVCandidatePage.replace(':id', currentCandidate.id);
  const skillsToView = softskillsInterview.successfullySaved ? softskillsInterview.softSkills : softSkillsList;


  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      const softskillsInterviewCopy = cloneDeep(softskillsInterview);
      softskillsInterviewCopy.comment = value;
      setComment(value);
      dispatch(setSoftSkillsInterview(softskillsInterviewCopy));
      setIsChanged(true);
    },
    [softskillsInterview, dispatch, setIsChanged]
  );

  const handleSaveChanges = async () => {
    const saveButtonThunk = softskillsInterview.successfullySaved
      ? saveChangesToSoftSkillsInterview
      : finishSoftSkillInterview;
    dispatch(setSoftSkillInterviewSkillsList(softSkillsList));
    dispatch(saveButtonThunk(softskillsInterview));
    setIsChanged(false);
    setFieldsDisabled(true);
  };

  useEffect(() => {
    if (softskillsInterview.successfullySaved) {
      setFieldsDisabled(true);
    } else {
      setFieldsDisabled(false);
    }
  }, [softskillsInterview.successfullySaved]);

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
    }
  }, [dispatch, id]);

  if (isLoadingOneCandidate || isLoadingSoftInterview)
    return <Spin size="large" tip={'Loading soft skills interview...'} />;

  return (
    <>
      <GenerateCV />
      <GenerateCvHeader backPath={backPath} disabled={isChanged}>
        <CandidatePopOver />
      </GenerateCvHeader>
      {skillsToView &&
        skillsToView.map((el: ISoftSkill) => (
          <Skill key={el.id} skill={el} softskillsInterview={softskillsInterview} softSkillsList={softSkillsList} />
        ))}
      <SoftSkillModal isOpenSkillModal={isOpenSkillModal} onClose={() => setOpenSkillModal(false)} />
      <SoftSkillFotter
        setOpenSkillModal={setOpenSkillModal}
        handleChange={handleChange}
        comment={comment}
        fieldsDisabled={fieldsDisabled}
        successfullySaved={softskillsInterview.successfullySaved}
        currentCandidate={currentCandidate}
      />
    </>
  );
};
