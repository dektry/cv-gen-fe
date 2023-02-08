import React from 'react';
import { useSelector } from 'react-redux';
import { Box, LinearProgress, Typography } from '@mui/material';

import { useFormContext, useFieldArray } from 'react-hook-form';

import { AddButton } from 'common-components/AddButton';
import { profSkillsSelector } from 'store/reducers/cvGeneration';
import { useDeferredLoading } from 'hooks/useDeferredLoading';
import { ProfSkillGroup } from 'Pages/CVGeneration/components/ProfSkiils/ProfSkillGroup';
import { ICvProfSkill } from 'models/ICVGeneration';
import { hardSkillLevelsSelector } from 'store/reducers/hardSkillsMatrix';

type TProfSkillGroupForm = ICvProfSkill & { profSkillGroupKey: string };

export const ProfSkills = () => {
  const { isLoading } = useSelector(profSkillsSelector);
  const skillLevels = useSelector(hardSkillLevelsSelector);

  const { control } = useFormContext();

  const { remove, append, fields } = useFieldArray({
    name: 'profSkills',
    control,
    keyName: 'profSkillGroupKey',
  });

  const deferredLoading = useDeferredLoading(isLoading);

  const handleAddSkillGroup = () => {
    append({ groupName: '', skills: [] });
  };

  const handleDeleteSkillGroup = (groupIndex: number) => {
    remove(groupIndex);
  };

  return (
    <Box>
      <Typography variant="h2" sx={{ marginBottom: '24px' }}>
        PROFESSIONAL SKILLS
      </Typography>
      {deferredLoading ? (
        <LinearProgress></LinearProgress>
      ) : (
        <>
          {(fields as TProfSkillGroupForm[])?.map((skillGroup: TProfSkillGroupForm, groupIndex: number) => (
            <ProfSkillGroup
              key={skillGroup.profSkillGroupKey}
              skillGroup={skillGroup}
              groupIndex={groupIndex}
              handleDeleteSkillGroup={handleDeleteSkillGroup}
              skillLevels={skillLevels}
            />
          ))}
        </>
      )}
      <AddButton
        title="Add new section"
        sx={{ marginTop: '24px' }}
        onClick={handleAddSkillGroup}
        disabled={deferredLoading}
      />
    </Box>
  );
};
