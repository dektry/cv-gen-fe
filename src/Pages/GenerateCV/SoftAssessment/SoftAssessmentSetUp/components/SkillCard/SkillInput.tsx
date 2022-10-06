import React, { useRef, useEffect, useCallback, useState } from 'react';

import { Input } from 'antd';
import { debounce, cloneDeep } from 'lodash';

import { useAppDispatch } from 'store';

import { setSoftAssessment } from 'store/reducers/softSkillAssessment';
import { completeSoftAssessment, editSoftAssessment } from 'store/reducers/softSkillAssessment/thunks';

import { ISoftSkill, ISoftAssessment } from 'models/ISoftAssessment';

import { useStyles } from './styles';

interface IProps {
  id?: string;
  skill: ISoftSkill;
  softskillsInterview: ISoftAssessment;
  softSkillsList: [] | ISoftSkill[];
  employeeId?: string;
}

export const SkillInput = (props: IProps) => {
  const { skill, id, softskillsInterview, softSkillsList, employeeId } = props;

  const [currentSkill, setCurrentSkill] = useState(skill.value);

  const dispatch = useAppDispatch();

  const classes = useStyles();

  const debouncedSkill = useRef(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const softskillsInterviewCopy = cloneDeep(softskillsInterview);
      if (employeeId) {
        softskillsInterviewCopy.employeeId = employeeId;
      }

      const skillAlreadyChosen = softskillsInterviewCopy?.softSkills?.findIndex((el) => el.id === id) !== -1;

      if (skillAlreadyChosen) {
        const processedSkills = softskillsInterviewCopy?.softSkills?.map((el) => {
          if (el.id === e.target.id) {
            el.questions.push({ id: e.target.id, value: e.target.value });
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

      softskillsInterview?.successfullySaved
        ? dispatch(editSoftAssessment(softskillsInterviewCopy))
        : dispatch(completeSoftAssessment(softskillsInterviewCopy));
      dispatch(setSoftAssessment(softskillsInterviewCopy));
    }, 600)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSkill.cancel();
    };
  }, [debouncedSkill]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSkill(e);
      setCurrentSkill(e.target.value);
    },
    [debouncedSkill, dispatch]
  );

  return (
    <Input
      id={id}
      className={classes.skillComment}
      value={currentSkill}
      placeholder="Skill name"
      onChange={handleChange}
    />
  );
};
