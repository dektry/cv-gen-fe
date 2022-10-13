import React, { useState } from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, TextField } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { SkillGroupField } from 'common-components/SkillGroupField';
import { CvInfo } from 'Pages/CVGeneration/CVGenerationPage';
import { AddButton } from 'common-components/AddButton';
import theme from 'theme/theme';
import { useStyles } from './styles';
import { DeleteButton } from 'common-components/DeleteButton';
import { CustomSelect } from 'common-components/CustomSelect';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

interface IProfSkills {
  cvInfo: Partial<CvInfo>;
  updateCvInfo: (fields: Partial<CvInfo>) => void;
}

export const ProfSkills = React.memo((props: IProfSkills) => {
  const { cvInfo, updateCvInfo } = props;

  const classes = useStyles({ theme });

  const [value, setValue] = useState('');

  return (
    <>
      {cvInfo?.profSkills?.map((skillGroup, index) => (
        <Accordion className={classes.accordion} disableGutters TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon className={classes.icon} />}>
            <SkillGroupField value={skillGroup.groupName} onChange={(e) => setValue(e.target.value)} />
          </AccordionSummary>
          <AccordionDetails>
            {skillGroup.skills.map((skill, index) => (
              <Box key={skill.name + index} className={classes.skill}>
                <TextField label="Skill" value={skill.name} />
                <CustomSelect value={skill.level} options={mockLevels} />
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

const mockLevels = [
  { value: '0', label: 'Beginner' },
  { value: '1', label: 'Advanced' },
  { value: '2', label: 'Expert' },
  { value: '3', label: 'Master' },
];
