import React, { useEffect, useState } from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, TextField } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { CvInfo, TProfSkill } from 'Pages/CVGeneration/CVGenerationPage';
import { SkillGroupField } from 'common-components/SkillGroupField';
import { CustomSelect } from 'common-components/CustomSelect';
import { AddButton } from 'common-components/AddButton';
import { DeleteButton } from 'common-components/DeleteButton';
import theme from 'theme/theme';
import { LevelTypesEnum } from 'models/IInterview';
import { useStyles } from './styles';

const levelsOptions = Object.values(LevelTypesEnum).map((level) => ({
  label: level,
  value: level,
}));

interface IProfSkillGroup {
  skillGroup: TProfSkill;
  groupIndex: number;
  profSkills: TProfSkill[];
  updateCvInfo: (fields: Partial<CvInfo>) => void;
  handleDeleteSkillGroup: (groupIndex: number) => void;
}

export const ProfSkillGroup = React.memo((props: IProfSkillGroup) => {
  const { skillGroup, groupIndex, profSkills, updateCvInfo, handleDeleteSkillGroup } = props;

  const classes = useStyles({ theme });

  const [groupState, setGroupState] = useState(skillGroup);

  useEffect(() => {
    setGroupState(skillGroup);
  }, [skillGroup]);

  useEffect(() => {
    const newProfSkills = [...profSkills];
    newProfSkills[groupIndex] = groupState;
    updateCvInfo({ profSkills: newProfSkills });
  }, [groupState]);

  const handleSkillGroupChange = (value: string) => {
    setGroupState((prevState) => ({
      ...prevState,
      groupName: value,
    }));
  };

  const handleSkillChange = (groupIndex: number, skillIndex: number, value: string) => {
    const skills = [...groupState.skills];
    skills[skillIndex].name = value;
    setGroupState((prevState) => ({
      ...prevState,
      skills,
    }));
  };

  const handleSkillLevelChange = (groupIndex: number, skillIndex: number, value: string) => {
    const skills = [...groupState.skills];
    skills[skillIndex] = { ...skills[skillIndex], level: value };
    setGroupState((prevState) => ({
      ...prevState,
      skills,
    }));
  };

  const handleAddSkill = () => {
    const skills = [...groupState.skills];
    skills.push({ name: '', level: '' });
    setGroupState((prevState) => ({
      ...prevState,
      skills,
    }));
  };

  const handleDeleteSkill = (groupIndex: number, skillIndex: number) => {
    const skills = [...groupState.skills];
    skills.splice(skillIndex, 1);
    setGroupState((prevState) => ({
      ...prevState,
      skills,
    }));
  };

  return (
    <Accordion className={classes.accordion} disableGutters TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon className={classes.icon} />}>
        <SkillGroupField value={groupState.groupName} onChange={(e) => handleSkillGroupChange(e.target.value)} />
      </AccordionSummary>
      <AccordionDetails>
        {groupState.skills.map((skill, skillIndex) => (
          <Box key={'skill' + groupIndex + skillIndex} className={classes.skill}>
            <TextField
              label="Skill"
              value={skill.name}
              onChange={(e) => handleSkillChange(groupIndex, skillIndex, e.target.value)}
            />
            <CustomSelect
              value={skill.level}
              options={levelsOptions}
              sx={{ width: '220px' }}
              onChange={(e) => handleSkillLevelChange(groupIndex, skillIndex, e.target.value)}
            />
            <Button
              className={classes.deleteSkillBtn}
              variant="contained"
              endIcon={<AddRoundedIcon />}
              onClick={() => handleDeleteSkill(groupIndex, skillIndex)}
            />
          </Box>
        ))}
      </AccordionDetails>
      <AccordionActions sx={{ justifyContent: 'space-between' }}>
        <AddButton title="Add field" onClick={() => handleAddSkill()} />
        <DeleteButton title="Delete section" onClick={() => handleDeleteSkillGroup(groupIndex)} />
      </AccordionActions>
    </Accordion>
  );
});
