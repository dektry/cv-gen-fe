import { useState, useCallback } from 'react';

import type { RadioChangeEvent } from 'antd';
import { Radio, Tooltip } from 'antd';

import { cloneDeep } from 'lodash';

import { useAppDispatch } from 'store';

import { editSoftAssessment, completeSoftAssessment } from 'store/reducers/softSkillAssessment/thunks';

import { ISoftSkillScore } from 'models/ISoftSkillsInterview';
import { ISoftAssessment, ISoftSkill } from 'models/ISoftAssessment';
import { NullableField } from 'models/TNullableField';

interface IProps {
  id?: string;
  scores?: ISoftSkillScore[];
  softskillsInterview: NullableField<ISoftAssessment>;
  softSkillsList: [] | ISoftSkill[];
  employeeId: string;
  softSkillScoreId?: string;
}

export const SkillRadioButtons = (props: IProps) => {
  const { softskillsInterview, softSkillsList, id, scores, employeeId, softSkillScoreId } = props;

  const currentScore = scores?.find((el) => el.id === softSkillScoreId);

  const [score, setScore] = useState<number>(Number(currentScore?.value));

  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: RadioChangeEvent) => {
      if (softskillsInterview) {
        const softskillsInterviewCopy = cloneDeep(softskillsInterview);
        softskillsInterviewCopy.employeeId = employeeId;
        const skillAlreadyChosen = softskillsInterviewCopy?.softSkills?.findIndex((el) => el.id === id) !== -1;

        if (skillAlreadyChosen) {
          const processedSkills = softskillsInterviewCopy?.softSkills?.map((el) => {
            if (el.id === e.target.id) {
              el.score = e.target.value;
            }
            return el;
          });
          softskillsInterviewCopy.softSkills = processedSkills;
        } else {
          const softSkillsListCopy = cloneDeep(softSkillsList);
          const processedSkills = softSkillsListCopy.map((el) => {
            if (el.id === e.target.id) {
              el.score = e.target.value;
            }
            return el;
          });
          softskillsInterviewCopy.softSkills = processedSkills;
        }
        softskillsInterview?.successfullySaved
          ? dispatch(editSoftAssessment(softskillsInterviewCopy))
          : dispatch(completeSoftAssessment(softskillsInterviewCopy));
        setScore(e.target.value);
      }
    },
    [dispatch, softSkillsList, softskillsInterview, score]
  );

  return (
    <Radio.Group value={score} onChange={handleChange}>
      {scores?.length &&
        scores?.map((score) => {
          return (
            <Tooltip key={score.id} title={score.title}>
              <Radio id={id} value={score}>
                {Number(score.value)}
              </Radio>
            </Tooltip>
          );
        })}
    </Radio.Group>
  );
};
