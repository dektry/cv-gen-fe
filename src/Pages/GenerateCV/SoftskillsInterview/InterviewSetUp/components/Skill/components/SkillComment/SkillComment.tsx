import React, { useRef, useEffect, useCallback, useState } from 'react';

import { Input } from 'antd';
import { debounce, cloneDeep } from 'lodash';

import { useAppDispatch } from 'store';

import {
  setSoftSkillsInterview,
  saveChangesToSoftSkillsInterview,
  finishSoftSkillInterview,
} from 'store/reducers/softskillsInterview';

import { ISoftSkill, ISoftSkillInterview } from 'models/ISoftSkillsInterview';

import { useStyles } from './styles';

interface IProps {
  id?: string;
  comment?: string;
  softskillsInterview: ISoftSkillInterview;
  softSkillsList: [] | ISoftSkill[];
  candidateId?: string;
}

export const SkillComment = (props: IProps) => {
  const { comment, id, softskillsInterview, softSkillsList, candidateId } = props;

  const [currentComment, setCurrentComment] = useState(comment);

  const dispatch = useAppDispatch();

  const classes = useStyles();

  const debouncedComment = useRef(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const softskillsInterviewCopy = cloneDeep(softskillsInterview);
      softskillsInterviewCopy.candidateId = candidateId;
      
      const skillAlreadyChosen = softskillsInterviewCopy?.softSkills?.findIndex(el => el.id === id) !== -1;
      
      if(skillAlreadyChosen) {
        const processedSkills = softskillsInterviewCopy?.softSkills?.map((el) => {
        if (el.id === e.target.id) {
          el.comment = e.target.value;
        }
          return el;
        });
        softskillsInterviewCopy.softSkills = processedSkills;
      } else {
        const softSkillsListCopy = cloneDeep(softSkillsList);
        const processedSkills = softSkillsListCopy.map((el) => {
          if (el.id === e.target.id) {
            el.comment = e.target.value;
          }
            return el;
          });
        softskillsInterviewCopy.softSkills = processedSkills;
      }
      console.log(softskillsInterview?.successfullySaved);
      
      softskillsInterview?.successfullySaved ?
        dispatch(saveChangesToSoftSkillsInterview(softskillsInterviewCopy)) :
        dispatch(finishSoftSkillInterview(softskillsInterviewCopy));
      dispatch(setSoftSkillsInterview(softskillsInterviewCopy));
    }, 600)
  ).current;

  useEffect(() => {
    return () => {
      debouncedComment.cancel();
    };
  }, [debouncedComment]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedComment(e);
      setCurrentComment(e.target.value);
    },
    [debouncedComment, dispatch]
  );

  return (
    <Input id={id} className={classes.skillComment} value={currentComment} placeholder="Comment" onChange={handleChange} />
  );
};
