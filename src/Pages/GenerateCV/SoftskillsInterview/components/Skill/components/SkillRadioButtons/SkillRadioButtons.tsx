import { useState, useCallback } from 'react';

import type { RadioChangeEvent } from 'antd';
import { Radio, Tooltip } from 'antd';

import { cloneDeep } from 'lodash';

import { useAppDispatch } from 'store';

import { 
  setSoftSkillsInterview, 
  setSoftSkillsList, 
  saveChangesToSoftSkillsInterview
 } from 'store/reducers/softskillsInterview';

import { ISoftSkill, ISoftSkillInterview } from 'models/ISoftSkillsInterview';


interface IProps {
  id?: string;
  score?: number;
  softskillsInterview: ISoftSkillInterview;
  softSkillsList: [] | ISoftSkill[];
}

export const SkillRadioButtons = (props: IProps) => {
  const { softskillsInterview, softSkillsList, id, score } = props;
  const [value, setValue] = useState(score ?? 1);

  const dispatch = useAppDispatch();


  const handleChange = useCallback((e: RadioChangeEvent) => {
    
    if (softskillsInterview?.softSkills?.length) {
      const softskillsInterviewCopy = cloneDeep(softskillsInterview);
      const processedSkills = softskillsInterviewCopy?.softSkills?.map((el) => {
        if (el.id === e.target.id) {
          el.score = e.target.value;
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
          el.score = e.target.value;
        }
        return el;
      });
      dispatch(setSoftSkillsList(processedSkills));
    }
    setValue(e.target.value);
  }, [dispatch, softSkillsList, softskillsInterview, value])

  return (
    <Radio.Group value={value} onChange={handleChange}>
      <Tooltip title='There will be score explanation'>
        <Radio id={id} value={1}>1</Radio>
      </Tooltip>
      <Tooltip title='There will be score explanation'>
        <Radio id={id} value={2}>2</Radio>
      </Tooltip>
      <Tooltip title='There will be score explanation'>
        <Radio id={id} value={3}>3</Radio>
      </Tooltip>
      <Tooltip title='There will be score explanation'>
        <Radio id={id} value={4}>4</Radio>
      </Tooltip>
      <Tooltip title='There will be score explanation'>
        <Radio id={id} value={5}>5</Radio>
      </Tooltip>
    </Radio.Group>
  );
}