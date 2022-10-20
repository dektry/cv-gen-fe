import React from 'react';
import { Input, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { CvInfo } from 'Pages/CVGeneration/CVGenerationPage';
import { useStyles } from 'Pages/CVGeneration/components/CVGenerationInfo/styles';
import { TagsInput } from 'common-components/TagsInput';

const { Title } = Typography;

interface CVGenerationInfoProps {
  cvInfo: Partial<CvInfo>;
  softSkillsOptions: string[];
  updateCvInfo: (fields: Partial<CvInfo>) => void;
  softSkillsSearch: (value: string) => void;
  updateCvSoftSkills: (tags: string[]) => void;
  softSkillsOfEmployee: string[];
}

export const CVGenerationInfo = React.memo((props: CVGenerationInfoProps) => {
  const { updateCvInfo, cvInfo, softSkillsOptions, softSkillsSearch, updateCvSoftSkills, softSkillsOfEmployee } = props;
  const { firstName, level, position, experience, education, description } = cvInfo;

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
        <TextArea
          className={classes.textArea}
          name="description"
          autoSize={{ minRows: 3 }}
          placeholder={'Description'}
          maxLength={270}
          showCount
          onChange={(e) => updateCvInfo({ description: e.target.value })}
          value={description ? description : ''}
        />
      </div>{' '}
      <div className={classes.row}>
        <Input addonBefore="Languages" name="languages" placeholder={'Languages'} value={'English - B2'} />
      </div>
      <div className={classes.row}>
        <Input
          addonBefore="Education"
          name="education"
          placeholder={'Education'}
          onChange={(e) => updateCvInfo({ education: e.target.value })}
          value={education ? education : ''}
        />
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
});
