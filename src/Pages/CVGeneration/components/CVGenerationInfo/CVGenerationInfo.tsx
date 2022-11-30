import { AsyncThunk } from '@reduxjs/toolkit';
import { Typography } from 'antd';
import { TextField, FormControl } from '@mui/material';

import { useForm, Controller, useWatch } from 'react-hook-form';

import { CvInfo } from 'Pages/CVGeneration/CVGenerationPage';
import { useStyles } from 'Pages/CVGeneration/components/CVGenerationInfo/styles';
import { TagsInput } from 'common-components/TagsInput';
import { Education } from 'common-components/Education';
import { Languages } from 'common-components/Languages';
import { IEducation } from 'models/IEducation';
import { ILanguage } from 'models/ILanguage';
import { useEffect } from 'react';
import { NullableField } from 'models/TNullableField';

const { Title } = Typography;

interface CvInfoForm {
  description?: string;
  education?: {
    id?: string;
    university?: string;
    specialization?: string;
    startYear?: number;
    endYear?: number;
    employeeId?: string;
  }[];
  languages?: string[];
  softSkills?: string[];
  level?: NullableField<string>;
  position?: NullableField<string>;
  yearsOfExperience?: NullableField<number>;
  avatarUrl?: NullableField<string>;
  male?: boolean;
  firstName?: string;
  profSkills?: {
    groupName?: string;
    skills?: { name?: string; level?: string }[];
  }[];
  projects?: {
    id?: string;
    team_size?: string;
    employeeId?: string;
    name?: string;
    duration?: string;
    position?: string;
    teamSize?: number;
    description?: string;
    responsibilities?: string[];
    tools?: string[];
  }[];
}

interface CVGenerationInfoProps {
  cvInfo: CvInfoForm;
  softSkillsOptions: string[];
  softSkillsSearch: (value: string) => void;
  updateCvSoftSkills: (tags: string[]) => void;
  softSkillsOfEmployee: string[];
  handleUpdateEducation: (
    dispatcher: AsyncThunk<void, IEducation, Record<string, never>>,
    currEducation: IEducation
  ) => void;
  handleUpdateLanguage: (
    dispatcher: AsyncThunk<void, ILanguage, Record<string, never>>,
    currentLanguage: ILanguage
  ) => void;
  languages: ILanguage[] | [];
  education: IEducation[] | [];
  updateCvInfo: (fields: Partial<CvInfo>) => void;
}

export const CVGenerationInfo = (props: CVGenerationInfoProps) => {
  const {
    cvInfo,
    softSkillsOptions,
    softSkillsSearch,
    updateCvSoftSkills,
    softSkillsOfEmployee,
    handleUpdateEducation,
    handleUpdateLanguage,
    languages,
    education,
  } = props;

  const { control, reset } = useForm({
    defaultValues: cvInfo,
  });

  const values = useWatch({ control });
  console.log(values.description);

  const classes = useStyles();

  return (
    <FormControl className={classes.container}>
      <div className={classes.row}>
        <Controller
          name="firstName"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField label={'Name'} placeholder={'Name'} onChange={onChange} value={value} />
          )}
        />
        <Controller
          name="yearsOfExperience"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField label={'Experience'} placeholder={'years'} type="number" onChange={onChange} value={value} />
          )}
        />
      </div>
      <div className={classes.row}>
        <Controller
          name="position"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField label={'Position'} placeholder={'Position'} onChange={onChange} value={value} />
          )}
        />
        <Controller
          name="level"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField placeholder={'Level'} label={'Level'} onChange={onChange} value={value} />
          )}
        />
      </div>
      <div className={classes.row}>
        <Controller
          name="description"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              multiline={true}
              label={'Description'}
              placeholder={'Description'}
              onChange={onChange}
              value={value}
            />
          )}
        />
      </div>{' '}
      <div className={classes.row}>
        <Languages handleUpdateLanguage={handleUpdateLanguage} languages={languages} />
      </div>
      <div className={classes.row}>
        <Education education={education} handleUpdateEducation={handleUpdateEducation} />
      </div>
      <div className={classes.row}>
        <div className={classes.softSkillsSelect}>
          <Title level={5}>Soft skills</Title>
          <TagsInput
            updateTags={updateCvSoftSkills}
            value={softSkillsOptions}
            skills={softSkillsOfEmployee}
            onSearch={softSkillsSearch}
            key={JSON.stringify(softSkillsOfEmployee)}
          />
        </div>
      </div>
    </FormControl>
  );
};
