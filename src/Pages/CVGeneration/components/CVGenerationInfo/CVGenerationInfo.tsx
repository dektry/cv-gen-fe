import { AsyncThunk } from '@reduxjs/toolkit';
import { Typography } from 'antd';
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
  updateCvFields: (fields: Partial<CvInfo>) => void;
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
    updateCvFields,
  } = props;
  const { firstName, level, position, experience, description } = cvInfo;

  const classes = useStyles();

  return (
    <div>
      <div className={classes.row}>
        <TextField
          name="fullName"
          label={'Name'}
          placeholder={'Name'}
          onChange={(e) => updateCvFields({ firstName: e.target.value })}
          value={firstName ? firstName : ''}
        />
        <TextField
          name="experience"
          label={'Experience'}
          placeholder={'years'}
          type="number"
          onChange={(e) => updateCvFields({ experience: Number(e.target.value) })}
          value={experience !== undefined ? experience : ''}
        />
      </div>
      <div className={classes.row}>
        <TextField
          name="position"
          label={'Position'}
          placeholder={'Position'}
          onChange={(e) => updateCvFields({ position: e.target.value })}
          value={position ? position : ''}
        />
        <TextField
          name="level"
          placeholder={'Level'}
          label={'Position'}
          onChange={(e) => updateCvFields({ level: e.target.value })}
          value={level ? level : ''}
        />
      </div>
      <div className={classes.row}>
        <TextField
          name="description"
          multiline={true}
          label={'Description'}
          placeholder={'Description'}
          onChange={(e) => updateCvFields({ description: e.target.value })}
          value={description}
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
