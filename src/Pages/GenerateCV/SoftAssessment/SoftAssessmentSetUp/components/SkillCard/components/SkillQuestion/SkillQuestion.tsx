import React, { useRef, useEffect, useCallback, useState } from 'react';

import { Input } from 'antd';
import { CloseSquareOutlined } from '@ant-design/icons';
import { debounce, cloneDeep } from 'lodash';

import { useAppDispatch } from 'store';

import { completeSoftAssessment, editSoftAssessment } from 'store/reducers/softSkillAssessment/thunks';

import { ISoftSkill, ISoftAssessment } from 'models/ISoftAssessment';
import { NullableField } from 'models/TNullableField';

import { useStyles } from './styles';

interface IProps {
  id?: string;
  question?: string;
  softskillsInterview: NullableField<ISoftAssessment>;
  softSkillsList: [] | ISoftSkill[];
  employeeId?: string;
}

export const SkillQuestion = (props: IProps) => {
  const { question, id, softskillsInterview, softSkillsList, employeeId } = props;

  const [currentQuestion, setCurrentQuestion] = useState(question);

  const dispatch = useAppDispatch();

  const classes = useStyles();

  const debouncedQuestion = useRef(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      if (softskillsInterview) {
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
      }
    }, 600)
  ).current;

  useEffect(() => {
    return () => {
      debouncedQuestion.cancel();
    };
  }, [debouncedQuestion]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedQuestion(e);
      setCurrentQuestion(e.target.value);
    },
    [debouncedQuestion, dispatch]
  );

  return (
    <div className={classes.container}>
      <Input
        id={id}
        className={classes.skillComment}
        value={currentQuestion}
        placeholder="Question"
        onChange={handleChange}
      />
      <CloseSquareOutlined type="large" />
    </div>
  );
};
