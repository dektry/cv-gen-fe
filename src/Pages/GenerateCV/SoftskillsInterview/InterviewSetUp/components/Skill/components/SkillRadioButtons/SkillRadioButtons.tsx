import { useState, useCallback } from 'react';

import type { RadioChangeEvent } from 'antd';
import { Radio, Tooltip } from 'antd';

import { cloneDeep } from 'lodash';

import { useAppDispatch } from 'store';

import { 
  setSoftSkillsInterview, 
  saveChangesToSoftSkillsInterview,
  finishSoftSkillInterview
 } from 'store/reducers/softskillsInterview';

import { ISoftSkill, ISoftSkillInterview, ISoftSkillScore } from 'models/ISoftSkillsInterview';


interface IProps {
  id?: string;
  scores?: ISoftSkillScore[];
  softskillsInterview: ISoftSkillInterview;
  softSkillsList: [] | ISoftSkill[];
  candidateId?: string;
  softSkillScoreId?: string;
}

export const SkillRadioButtons = (props: IProps) => {
  const { softskillsInterview, softSkillsList, id, scores, candidateId, softSkillScoreId } = props;
  
  const currentScore = scores?.find(el => el.id === softSkillScoreId);

  
  const [score, setScore] = useState<number>(Number(currentScore?.value));

  const dispatch = useAppDispatch();

  const handleChange = useCallback((e: RadioChangeEvent) => {
    const softskillsInterviewCopy = cloneDeep(softskillsInterview);
    softskillsInterviewCopy.candidateId = candidateId;
    const skillAlreadyChosen = softskillsInterviewCopy?.softSkills?.findIndex(el => el.id === id) !== -1;
    
    if(skillAlreadyChosen) {
      const processedSkills = softskillsInterviewCopy?.softSkills?.map((el) => {        
      if (el.id === e.target.id) {
        el.softSkillScoreId = e.target.value.id;
        el.score = e.target.value;
      }
        return el;
      });
      softskillsInterviewCopy.softSkills = processedSkills;
    } else {
      const softSkillsListCopy = cloneDeep(softSkillsList);
      const processedSkills = softSkillsListCopy.map((el) => {
        if (el.id === e.target.id) {
          el.softSkillScoreId = e.target.value.id;
          el.score = e.target.value;
        }
          return el;
        });
      softskillsInterviewCopy.softSkills = processedSkills;
    }
    (softskillsInterview?.softSkills?.length || softskillsInterview?.comment) ?
      dispatch(saveChangesToSoftSkillsInterview(softskillsInterviewCopy)) :
      dispatch(finishSoftSkillInterview(softskillsInterviewCopy));
    dispatch(setSoftSkillsInterview(softskillsInterviewCopy));
    setScore(e.target.value);
  }, [dispatch, softSkillsList, softskillsInterview, score])

  return (
    <Radio.Group value={score} onChange={handleChange}>
        {scores?.length && scores?.map(score => {
          return (
            <Tooltip key={score.id} title={score.title}>
              <Radio id={id} value={score}>{Number(score.value)}</Radio>
            </Tooltip>
          );
        })}
    </Radio.Group>
  );
}