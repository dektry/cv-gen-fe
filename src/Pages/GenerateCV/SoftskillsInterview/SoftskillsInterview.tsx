import React, { useCallback, useState, useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/store';
import { candidatesSelector } from 'store/candidates';
import { interviewSelector } from 'store/interview';
import {
  setSoftSkillsInterview,
  softSkillInterviewSelector,
  finishSoftSkillInterview,
  saveChangesToSoftSkillsInterview,
  setSoftSkillInterviewSkillsList,
} from 'store/softskillsInterview';

import { useStyles } from './styles';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

import { paths } from 'routes/paths';
import { CandidatePopOver } from '../ChoosePerson/Candidate/CandidatePopOver';
import { GenerateCvHeader } from 'components/Molecules/GenerateCVHeader/CvHeader';
import { SkillWithCheckbox } from './SkillWithCheckbox';
import { SelectPositions } from './SelectPositions';
import { SoftSkillModal } from './SoftSkillModal';
import { ButtonWithLink } from 'components/Atoms/ButtonWithLink';
import { ISoftSkill } from 'interfaces/softskillsInterview.interface';

import { SOFT_SKILL_INTERVIEW } from 'constants/titles';

const { TextArea } = Input;

type InputProps = HTMLTextAreaElement & Input;

export const SoftskillsInterview = () => {
  const dispatch = useAppDispatch();
  const { currentCandidate } = useSelector(candidatesSelector);
  const { softskillsInterview, softSkillsList } = useSelector(
    softSkillInterviewSelector,
  );
  const { interviewResult } = useSelector(interviewSelector);

  const [isOpenSkillModal, setOpenSkillModal] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [hobby, setHobby] = useState(softskillsInterview.hobby);
  const [comment, setComment] = useState(softskillsInterview.comment);
  const [fieldsDisabled, setFieldsDisabled] = useState(false);

  const classes = useStyles();

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

  const handleChange = useCallback(
    (e: React.ChangeEvent<InputProps>) => {
      const {
        props: { id },
        value,
      } = e.target;

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
    [softskillsInterview, dispatch, setIsChanged],
  );

  const isLevelAndPosition =
    (interviewResult?.level.id && interviewResult.position.id) ||
    (softskillsInterview.positionId && softskillsInterview.levelId);
  const saveDisabled = !(isLevelAndPosition && isChanged);

  const skillsToView = softskillsInterview.successfullySaved
    ? softskillsInterview.softSkills
    : softSkillsList;

  const saveButtonText = softskillsInterview.successfullySaved
    ? SOFT_SKILL_INTERVIEW.SAVE_CHANGES
    : SOFT_SKILL_INTERVIEW.SAVE;

  const handleSaveChanges = async () => {
    const saveButtonThunk = softskillsInterview.successfullySaved
      ? saveChangesToSoftSkillsInterview
      : finishSoftSkillInterview;
    dispatch(setSoftSkillInterviewSkillsList(softSkillsList));
    dispatch(saveButtonThunk(softskillsInterview));
    setIsChanged(false);
    setFieldsDisabled(true);
  };

  const backPath = paths.generateCVCandidatePage.replace(
    ':id',
    currentCandidate.id,
  );

  return (
    <>
      <GenerateCvHeader backPath={backPath} disabled={isChanged}>
        <CandidatePopOver />
      </GenerateCvHeader>
      <SelectPositions
        setFieldsDisabled={setFieldsDisabled}
        fieldsDisabled={fieldsDisabled}
      />
      {skillsToView &&
        skillsToView.map((el: ISoftSkill) => (
          <SkillWithCheckbox
            key={el.id}
            skill={el}
            setIsChanged={setIsChanged}
            disabled={fieldsDisabled}
          />
        ))}
      <TextArea
        id="hobby"
        rows={2}
        placeholder="Hobbies"
        className={classes.textArea}
        onChange={handleChange}
        value={hobby}
        disabled={fieldsDisabled}
      />
      <Button
        title="Add a skill"
        type="primary"
        onClick={() => setOpenSkillModal(true)}
        disabled={softskillsInterview.successfullySaved}
      >
        +
      </Button>
      <TextArea
        id="comment"
        rows={2}
        placeholder="Comment"
        className={classes.textArea}
        onChange={handleChange}
        value={comment}
        disabled={fieldsDisabled}
      />
      <Button disabled={saveDisabled} onClick={handleSaveChanges}>
        {saveButtonText}
      </Button>
      <ButtonWithLink
        path={paths.generateCVtechnicalInterview}
        text={'Start tech interview'}
        candidate={currentCandidate}
      />
      <SoftSkillModal
        isOpenSkillModal={isOpenSkillModal}
        onClose={() => setOpenSkillModal(false)}
      />
    </>
  );
};
