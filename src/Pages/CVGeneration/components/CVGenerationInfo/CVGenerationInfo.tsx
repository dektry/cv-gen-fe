import { AsyncThunk } from '@reduxjs/toolkit';
import { Input, Typography } from 'antd';
import { TextField } from '@mui/material';

import { CvInfo } from 'Pages/CVGeneration/CVGenerationPage';
import { useStyles } from 'Pages/CVGeneration/components/CVGenerationInfo/styles';
import { TagsInput } from 'common-components/TagsInput';
import { Education } from 'common-components/Education';
import { Languages } from 'common-components/Languages';
import { IEducation } from 'models/IEducation';
import { ILanguage } from 'models/ILanguage';

const { Title } = Typography;

interface CVGenerationInfoProps {
  cvInfo: Partial<CvInfo>;
  softSkillsOptions: string[];
  updateCvInfo: (fields: Partial<CvInfo>) => void;
  softSkillsSearch: (value: string) => void;
  updateCvSoftSkills: (tags: string[]) => void;
  updateCvDescription: (value: string) => void;
  softSkillsOfEmployee: string[];
  employeeDescription: string;
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
}

export const CVGenerationInfo = (props: CVGenerationInfoProps) => {
  const {
    updateCvInfo,
    cvInfo,
    softSkillsOptions,
    softSkillsSearch,
    updateCvSoftSkills,
    softSkillsOfEmployee,
    updateCvDescription,
    employeeDescription,
    handleUpdateEducation,
    handleUpdateLanguage,
    languages,
    education,
  } = props;
  const { firstName, level, position, experience } = cvInfo;

  const classes = useStyles();

  return (
    <div>
      <div className={classes.row}>
        <Input
          name="fullName"
          placeholder={'Name'}
          addonBefore="First Name"
          onChange={(e) => updateCvInfo({ firstName: e.target.value })}
          value={firstName ? firstName : ''}
        />
        <Input
          name="experience"
          placeholder={'years'}
          addonBefore="Experience in years"
          onChange={(e) => (isNaN(Number(e.target.value)) ? '' : updateCvInfo({ experience: Number(e.target.value) }))}
          value={experience !== undefined ? experience : ''}
        />
      </div>
      <div className={classes.row}>
        <Input
          name="position"
          placeholder={'Position'}
          addonBefore="Position"
          onChange={(e) => updateCvInfo({ position: e.target.value })}
          value={position ? position : ''}
        />
        <Input
          name="level"
          placeholder={'Level'}
          addonBefore="Level"
          onChange={(e) => updateCvInfo({ level: e.target.value })}
          value={level ? level : ''}
        />
      </div>
      <div className={classes.row}>
        <TextField
          name="description"
          multiline={true}
          label={'Description'}
          placeholder={'Description'}
          onChange={(e) => updateCvDescription(e.target.value)}
          value={employeeDescription ? employeeDescription : ''}
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
    </div>
  );
};
