import { Typography } from 'antd';
import { TextField } from '@mui/material';

import { useFormContext, Controller } from 'react-hook-form';

import { useStyles } from 'Pages/CVGeneration/components/CVGenerationInfo/styles';
import { TagsInput } from 'common-components/TagsInput';
import { Education } from 'common-components/Education';
import { Languages } from 'common-components/Languages';

const { Title } = Typography;

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
      </div>
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
          />
        </div>
      </div>
    </div>
  );
};
