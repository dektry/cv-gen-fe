import React, { useCallback, useState, useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { candidatesSelector } from 'store/reducers/candidates';

import {
  setSoftSkillsInterview,
  softSkillInterviewSelector,
  finishSoftSkillInterview,
  saveChangesToSoftSkillsInterview,
  setSoftSkillInterviewSkillsList
} from 'store/reducers/softskillsInterview';

import { CandidatePopOver } from '../common-components/PopOver';
import { SelectPositions } from './components/SelectPositions';
import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { Skill } from './components/Skill';
import { SoftSkillModal } from './components/SoftSkillModal';
import { GenerateCV } from '../common-components/GenerateCv';
import { SoftSkillFotter } from './components/SoftSkillFooter';

import { ISoftSkill } from 'models/ISoftSkillsInterview';
import paths from 'config/routes.json';

export const SoftskillsInterview = () => {
  const dispatch = useAppDispatch();

  const { currentCandidate } = useSelector(candidatesSelector);
  const { softskillsInterview, softSkillsList } = useSelector(softSkillInterviewSelector);

  const [isOpenSkillModal, setOpenSkillModal] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [hobby, setHobby] = useState(softskillsInterview.hobby);
  const [comment, setComment] = useState(softskillsInterview.comment);
  const [fieldsDisabled, setFieldsDisabled] = useState(false);

  const backPath = paths.generateCVCandidatePage.replace(':id', currentCandidate.id);
  const skillsToView = softskillsInterview.successfullySaved ? softskillsInterview.softSkills : softSkillsList;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      const id = e.target.id;

      const softskillsInterviewCopy = cloneDeep(softskillsInterview);
      if (id === 'hobby') {
        softskillsInterviewCopy.hobby = value;
        setHobby(value);
      } else if (id === 'comment') {
        softskillsInterviewCopy.comment = value;
        setComment(value);
      }
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

  return (
    <>
      <GenerateCV />
      <GenerateCvHeader backPath={backPath} disabled={isChanged}>
        <CandidatePopOver />
      </GenerateCvHeader>
      <SelectPositions setFieldsDisabled={setFieldsDisabled} fieldsDisabled={fieldsDisabled} />
      {skillsToView &&
        skillsToView.map((el: ISoftSkill) => (
          <Skill 
            key={el.id} 
            skill={el}
            softskillsInterview={softskillsInterview}
            softSkillsList={softSkillsList}
          />
        ))}
      <SoftSkillModal isOpenSkillModal={isOpenSkillModal} onClose={() => setOpenSkillModal(false)} />
      <SoftSkillFotter
        setOpenSkillModal={setOpenSkillModal}
        handleSaveChanges={handleSaveChanges}
        handleChange={handleChange}
        hobby={hobby}
        comment={comment}
        fieldsDisabled={fieldsDisabled}
        saveDisabled={!isChanged}
        successfullySaved={softskillsInterview.successfullySaved}
        currentCandidate={currentCandidate}
      />
    </>
  );
};
