import { Typography } from 'antd';
import { TextField } from '@mui/material';

import { useFormContext, Controller } from 'react-hook-form';

import { useStyles } from 'Pages/CVGeneration/components/CVGenerationInfo/styles';
import { TagsInput } from 'common-components/TagsInput';
import { Education } from 'common-components/Education';
import { Languages } from 'common-components/Languages';
import { NullableField } from 'models/TNullableField';

const { Title } = Typography;

export interface ICvEducation {
  id?: string;
  university?: string;
  specialization?: string;
  startYear?: number;
  endYear?: number;
  employeeId?: string;
}

export interface IProfSkill {
  name?: string;
  level?: string;
}

export interface ICvProfSkill {
  groupName?: string;
  skills?: IProfSkill[];
}

export interface ICvLanguage {
  id?: string;
  value?: string;
  level?: string;
  employeeId?: string;
}

export interface ICvProject {
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
}

export interface CvInfoForm {
  description?: string;
  education?: ICvEducation[];
  languages?: ICvLanguage[];
  softSkills?: string[];
  level?: NullableField<string>;
  position?: NullableField<string>;
  yearsOfExperience?: NullableField<number>;
  avatarUrl?: NullableField<string>;
  male?: boolean;
  firstName?: string;
  profSkills?: ICvProfSkill[];
  projects?: ICvProject[];
}

interface CVGenerationInfoProps {
  softSkillsOptions: string[];
  softSkillsSearch: (value: string) => void;
  updateCvSoftSkills: (tags: string[]) => void;
  softSkillsOfEmployee: string[];
}

export const CVGenerationInfo = (props: CVGenerationInfoProps) => {
  const { softSkillsOptions, softSkillsSearch, updateCvSoftSkills, softSkillsOfEmployee } = props;

  const methods = useFormContext();

  const classes = useStyles();

  return (
    <div>
      <div className={classes.row}>
        <Controller
          name="firstName"
          control={methods.control}
          render={({ field: { value, onChange } }) => (
            <TextField label={'Name'} placeholder={'Name'} onChange={onChange} value={value} />
          )}
        />
        <Controller
          name="yearsOfExperience"
          control={methods.control}
          render={({ field: { value, onChange } }) => (
            <TextField label={'Experience'} placeholder={'years'} type="number" onChange={onChange} value={value} />
          )}
        />
      </div>
      <div className={classes.row}>
        <Controller
          name="position"
          control={methods.control}
          render={({ field: { value, onChange } }) => (
            <TextField label={'Position'} placeholder={'Position'} onChange={onChange} value={value} />
          )}
        />
        <Controller
          name="level"
          control={methods.control}
          render={({ field: { value, onChange } }) => (
            <TextField placeholder={'Level'} label={'Level'} onChange={onChange} value={value} />
          )}
        />
      </div>
      <div className={classes.row}>
        <Controller
          name="description"
          control={methods.control}
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
        <Languages />
      </div>
      <div className={classes.row}>
        <Education />
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
    </div>
  );
};
