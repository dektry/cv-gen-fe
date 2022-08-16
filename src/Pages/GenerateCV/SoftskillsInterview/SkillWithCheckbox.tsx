import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import { ISoftSkill } from 'interfaces/softskillsInterview.interface';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/store';
import {
  softSkillInterviewSelector,
  setSoftSkillsInterview,
  setSoftSkillsList,
} from 'store/softskillsInterview';

import Checkbox from 'antd/lib/checkbox';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { useStyles } from './styles';

interface IProps {
  skill: ISoftSkill;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
}

export const SkillWithCheckbox = (props: IProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { softskillsInterview, softSkillsList } = useSelector(
    softSkillInterviewSelector,
  );
  const {
    skill: { id, value, isActive },
    setIsChanged,
    disabled,
  } = props;

  const [checked, setChecked] = useState(isActive);

  const handleChange = useCallback(
    (e: CheckboxChangeEvent) => {
      setChecked(e.target.checked);
      if (softskillsInterview?.softSkills?.length) {
        const softskillsInterviewCopy = cloneDeep(softskillsInterview);
        const processedSkills = softskillsInterviewCopy?.softSkills?.map(el => {
          if (el.id === e.target.id) {
            el.isActive = e.target.checked;
          }
          return el;
        });
        softskillsInterviewCopy.softSkills = processedSkills;
        dispatch(setSoftSkillsInterview(softskillsInterviewCopy));
      } else {
        const softSkillsListCopy = cloneDeep(softSkillsList);
        const processedSkills = softSkillsListCopy.map((el: ISoftSkill) => {
          if (el.id === e.target.id) {
            el.isActive = e.target.checked;
          }
          return el;
        });
        dispatch(setSoftSkillsList(processedSkills));
      }
      setIsChanged(true);
    },
    [dispatch, softskillsInterview, setIsChanged, softSkillsList],
  );

  return (
    <div className={classes.skillContainer}>
      <div>{value}</div>
      <Checkbox
        id={id}
        onChange={handleChange}
        checked={checked}
        disabled={disabled}
      />
    </div>
  );
};
