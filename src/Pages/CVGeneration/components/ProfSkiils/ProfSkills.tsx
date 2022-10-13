import React from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, TextField } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { SkillGroupField } from 'common-components/SkillGroupField';
import { CvInfo, TProfSkill } from 'Pages/CVGeneration/CVGenerationPage';
import { AddButton } from 'common-components/AddButton';
import theme from 'theme/theme';
import { DeleteButton } from 'common-components/DeleteButton';
import { CustomSelect } from 'common-components/CustomSelect';
import { mockLevels } from 'Pages/CVGeneration/mocks';
import { useStyles } from './styles';

interface IProfSkills {
  profSkills: TProfSkill[];
  updateCvInfo: (fields: Partial<CvInfo>) => void;
}

export const ProfSkills = React.memo((props: IProfSkills) => {
  const { profSkills, updateCvInfo } = props;

  const classes = useStyles({ theme });

  const handleSkillGroupChange = (index: number, value: string) => {
    const newProfSkills = [...profSkills];
    newProfSkills[index].groupName = value;
    updateCvInfo({ profSkills: newProfSkills });
  };

  const handleSkillChange = (groupIndex: number, skillIndex: number, value: string) => {
    const newProfSkills = [...profSkills];
    newProfSkills[groupIndex].skills[skillIndex].name = value;
    updateCvInfo({ profSkills: newProfSkills });
  };

  const handleSkillLevelChange = (groupIndex: number, skillIndex: number, value: string) => {
    const newProfSkills = [...profSkills];
    newProfSkills[groupIndex].skills[skillIndex].level = value;
    updateCvInfo({ profSkills: newProfSkills });
  };

  return (
    <>
      {profSkills?.map((skillGroup, groupIndex) => (
        <Accordion
          key={'group' + groupIndex}
          className={classes.accordion}
          disableGutters
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon className={classes.icon} />}>
            <SkillGroupField
              value={skillGroup.groupName}
              onChange={(e) => handleSkillGroupChange(groupIndex, e.target.value)}
            />
          </AccordionSummary>
          <AccordionDetails>
            {skillGroup.skills.map((skill, skillIndex) => (
              <Box key={'skill' + groupIndex + skillIndex} className={classes.skill}>
                <TextField
                  label="Skill"
                  value={skill.name}
                  onChange={(e) => handleSkillChange(groupIndex, skillIndex, e.target.value)}
                />
                <CustomSelect
                  value={skill.level}
                  options={mockLevels}
                  sx={{ width: 180 }}
                  onChange={(e) => handleSkillLevelChange(groupIndex, skillIndex, e.target.value)}
                />
                <Button className={classes.deleteSkillBtn} variant="contained" endIcon={<AddRoundedIcon />} />
              </Box>
            ))}
          </AccordionDetails>
          <AccordionActions sx={{ justifyContent: 'space-between' }}>
            <AddButton title="Add field" />
            <DeleteButton title="Delete section" />
          </AccordionActions>
        </Accordion>
      ))}
    </>
  );
});
