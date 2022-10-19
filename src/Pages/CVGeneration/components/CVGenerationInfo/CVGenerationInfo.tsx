import React, { useMemo } from 'react';
import { Input, Select, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { CvInfo } from 'Pages/CVGeneration/CVGenerationPage';
import { useStyles } from 'Pages/CVGeneration/components/CVGenerationInfo/styles';
import { mockSoftSkillsOptions } from 'Pages/CVGeneration/mocks';
import { TagsInput } from 'common-components/TagInput';

const { Title } = Typography;

export type SoftSkills = typeof mockSoftSkillsOptions[number];

interface CVGenerationInfoProps {
  cvInfo: Partial<CvInfo>;
  softSkillsOptions: SoftSkills[];
  updateCvInfo: (fields: Partial<CvInfo>) => void;
}

export const CVGenerationInfo = React.memo((props: CVGenerationInfoProps) => {
  const { updateCvInfo, cvInfo, softSkillsOptions } = props;
  const { firstName, level, position, experience, education, description, softSkills } = cvInfo;

  const classes = useStyles();

  const selectOptions = useMemo(
    () => softSkillsOptions?.map((skill) => ({ label: skill, value: skill })),
    [softSkillsOptions]
  );

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
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Select soft skills"
            options={selectOptions}
            defaultValue={softSkills}
            onChange={(value) => updateCvInfo({ softSkills: value })}
            value={softSkills ? softSkills : []}
          ></Select>
          <TagsInput updateCvInfo={updateCvInfo} />
        </div>
      </div>
    </div>
  );
});
