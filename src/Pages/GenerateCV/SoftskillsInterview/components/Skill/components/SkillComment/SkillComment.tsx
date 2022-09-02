import React, { useRef, useEffect, useCallback } from 'react';

import { Input } from 'antd';
import { debounce, cloneDeep } from 'lodash';

import { useAppDispatch } from 'store';

import { 
  setSoftSkillsInterview, 
  setSoftSkillsList, 
  saveChangesToSoftSkillsInterview
 } from 'store/reducers/softskillsInterview';

import { ISoftSkill, ISoftSkillInterview } from 'models/ISoftSkillsInterview';

import { useStyles } from './styles';

interface IProps {
  id?: string;
  comment?: string;
  softskillsInterview: ISoftSkillInterview;
  softSkillsList: [] | ISoftSkill[];
}
export const SkillComment = (props: IProps) => {

  const { comment, id, softskillsInterview, softSkillsList } = props;

  const dispatch = useAppDispatch();

  const classes = useStyles();

  const debouncedComment = useRef(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      if (softskillsInterview?.softSkills?.length) {
        const softskillsInterviewCopy = cloneDeep(softskillsInterview);
        const processedSkills = softskillsInterviewCopy?.softSkills?.map((el) => {
          if (el.id === e.target.id) {
            el.comment = e.target.value;
          }
          return el;
        });
        softskillsInterviewCopy.softSkills = processedSkills;
        dispatch(setSoftSkillsInterview(softskillsInterviewCopy));
        dispatch(saveChangesToSoftSkillsInterview(softskillsInterviewCopy));
      } else {
        const softSkillsListCopy = cloneDeep(softSkillsList);
        const processedSkills = softSkillsListCopy.map((el: ISoftSkill) => {
          if (el.id === e.target.id) {
            el.comment = e.target.value;
          }
          return el;
        });
        dispatch(setSoftSkillsList(processedSkills));
      }
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
    }, [debouncedComment, dispatch]
  );

  return <Input
    id={id}
    className={classes.skillComment}
    value={comment} 
    placeholder='Comment'
    onChange={handleChange}
  />;
}