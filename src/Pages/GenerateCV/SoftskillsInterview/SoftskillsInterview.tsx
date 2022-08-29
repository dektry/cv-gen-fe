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
  setSoftSkillInterviewSkillsList,
} from 'store/reducers/softskillsInterview';

import { useStyles } from './styles';
import { Input , Button } from 'antd';

import paths from 'config/routes.json';
import { CandidatePopOver } from '../ChoosePerson/Candidate';
import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { SkillWithCheckbox } from '../SoftskillsInterview';
import { SelectPositions } from '../SoftskillsInterview';
import { SoftSkillModal } from '../SoftskillsInterview';
import { ButtonWithLink } from 'common-components/ButtonWithLink';
import { GenerateCV } from '../GenerateCV';
import { ISoftSkill } from 'models/ISoftSkillsInterview';

import { SOFT_SKILL_INTERVIEW } from '../utils/constants';

const { TextArea } = Input;

type IProps = {props: { id: string }};

type InputProps = HTMLTextAreaElement & typeof Input & IProps;

export const SoftskillsInterview = () => {
  const dispatch = useAppDispatch();
  const { currentCandidate } = useSelector(candidatesSelector);
  const { softskillsInterview, softSkillsList } = useSelector(
    softSkillInterviewSelector,
  );

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

  const saveDisabled = !isChanged;

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
      <GenerateCV />
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
