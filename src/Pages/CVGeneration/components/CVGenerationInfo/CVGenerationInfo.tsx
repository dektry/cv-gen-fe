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
}

export const CVGenerationInfo = React.memo((props: CVGenerationInfoProps) => {
  const { fullName, level, position, experience, education } = props;

  const classes = useStyles();

  return (
    <div>
      <div className={classes.row}>
        <Input
          name="fullName"
          onChange={() => 1}
          placeholder={'Name'}
          addonBefore="Full Name"
          value={fullName ? fullName : ''}
        />
        <Input
          name="experience"
          onChange={() => 1}
          placeholder={'years'}
          addonBefore="Experience in years"
          value={experience !== undefined ? experience : ''}
        />
      </div>
      <div className={classes.row}>
        <Input
          name="position"
          onChange={() => 1}
          placeholder={'Position'}
          addonBefore="Position"
          value={position ? position : ''}
        />
        <Input name="level" onChange={() => 1} placeholder={'Level'} addonBefore="Level" value={level ? level : ''} />
      </div>
      <div className={classes.row}>
        <TextArea
          className={classes.textArea}
          name="description"
          autoSize={{ minRows: 3 }}
          onChange={() => 1}
          placeholder={'Description'}
          value={
            "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'."
          }
          showCount
          maxLength={270}
        />
      </div>{' '}
      <div className={classes.row}>
        <Input addonBefore="Languages" name="languages" placeholder={'Languages'} value={'English - B2'} />
      </div>
      <Input addonBefore="Education" name="education" placeholder={'Education'} value={education ? education : ''} />
    </div>
  );
});
