import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, LinearProgress, Typography } from '@mui/material';

import { useForm, useFieldArray } from 'react-hook-form';

import FormControl from '@mui/material/FormControl';

import { TProfSkill } from 'Pages/CVGeneration/CVGenerationPage';
import { AddButton } from 'common-components/AddButton';
import { profSkillsSelector } from 'store/reducers/cvGeneration';
import { useDeferredLoading } from 'hooks/useDeferredLoading';
import { ProfSkillGroup } from 'Pages/CVGeneration/components/ProfSkiils/ProfSkillGroup';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface FormValues {
  profSkills: TProfSkill[];
}

export const ProfSkills = React.memo(() => {
  const classes = useStyles({ theme });

  const { isLoading, data } = useSelector(profSkillsSelector);

  const { control, reset } = useForm<FormValues>({ defaultValues: { profSkills: data } });

  const { fields, append, remove } = useFieldArray({
    name: 'profSkills',
    keyName: 'fieldKey',
    control,
  });

  useEffect(() => {
    const defaultValues = { profSkills: data };
    reset({ ...defaultValues });
  }, [data]);

  const deferredLoading = useDeferredLoading(isLoading);

  const handleAddSkillGroup = () => {
    append({ groupName: '', skills: [] });
  };

  return (
    <Box>
      <Typography variant="h2" sx={{ marginBottom: '24px' }}>
        PROFESSIONAL SKILLS
      </Typography>
      {deferredLoading ? (
        <LinearProgress></LinearProgress>
      ) : (
        <FormControl className={classes.skillsContainer}>
          {fields?.map((skillGroup, groupIndex) => (
            <ProfSkillGroup
              key={skillGroup.fieldKey}
              skillGroup={skillGroup}
              groupIndex={groupIndex}
              removeSkillGroup={remove}
            />
          ))}
        </FormControl>
      )}
      <AddButton
        title="Add new section"
        sx={{ marginTop: '24px' }}
        onClick={handleAddSkillGroup}
        disabled={deferredLoading}
      />
    </Box>
  );
});
