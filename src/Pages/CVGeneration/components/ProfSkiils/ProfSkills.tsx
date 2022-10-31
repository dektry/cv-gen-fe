import React from 'react';
import { useSelector } from 'react-redux';
import { Box, LinearProgress, Typography } from '@mui/material';

import { CvInfo, TProfSkill } from 'Pages/CVGeneration/CVGenerationPage';
import { AddButton } from 'common-components/AddButton';
import { profSkillsSelector } from 'store/reducers/cvGeneration';
import { useDeferredLoading } from 'hooks/useDeferredLoading';
import { ProfSkillGroup } from 'Pages/CVGeneration/components/ProfSkiils/ProfSkillGroup';

interface IProfSkills {
  profSkills: TProfSkill[];
  updateCvInfo: (fields: Partial<CvInfo>) => void;
}

export const ProfSkills = React.memo((props: IProfSkills) => {
  const { profSkills, updateCvInfo } = props;

  const { isLoading } = useSelector(profSkillsSelector);

  const deferredLoading = useDeferredLoading(isLoading);

  const handleAddSkillGroup = () => {
    const newProfSkills = [...profSkills];
    newProfSkills.push({ groupName: '', skills: [] });
    updateCvInfo({ profSkills: newProfSkills });
  };

  const handleDeleteSkillGroup = (groupIndex: number) => {
    const newProfSkills = [...profSkills];
    newProfSkills.splice(groupIndex, 1);
    updateCvInfo({ profSkills: newProfSkills });
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
          {profSkills?.map((skillGroup, groupIndex) => (
            <ProfSkillGroup
              key={'group' + groupIndex}
              profSkills={profSkills}
              skillGroup={skillGroup}
              groupIndex={groupIndex}
              updateCvInfo={updateCvInfo}
              handleDeleteSkillGroup={handleDeleteSkillGroup}
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
});
