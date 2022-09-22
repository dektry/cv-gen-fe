import React from 'react';
import { Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { useStyles } from './styles';

interface CVGenerationInfoProps {
  fullName?: string;
  position?: string | null;
  level?: string | null;
  experience?: number;
  education?: string | null;
  description?: string;
  updateCvInfo: (fields: Partial<CVGenerationInfoProps>) => void;
}

export const CVGenerationInfo = React.memo((props: CVGenerationInfoProps) => {
  const { fullName, level, position, experience, education, description, updateCvInfo } = props;

  const classes = useStyles();

  return (
    <div>
      <div className={classes.row}>
        <Input
          name="fullName"
          placeholder={'Name'}
          addonBefore="Full Name"
          onChange={(e) => updateCvInfo({ fullName: e.target.value })}
          value={fullName ? fullName : ''}
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
          value={
            description
              ? description
              : "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'."
          }
        />
      </div>{' '}
      <div className={classes.row}>
        <Input addonBefore="Languages" name="languages" placeholder={'Languages'} value={'English - B2'} />
      </div>
      <Input
        addonBefore="Education"
        name="education"
        placeholder={'Education'}
        onChange={(e) => updateCvInfo({ education: e.target.value })}
        value={education ? education : ''}
      />
    </div>
  );
});
