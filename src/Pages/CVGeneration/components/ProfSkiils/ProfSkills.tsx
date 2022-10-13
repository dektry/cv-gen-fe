import React, { useState } from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
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
    <Accordion className={classes.accordion} disableGutters>
      <AccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon className={classes.icon} />}>
        <SkillGroupField value={value} onChange={(e) => setValue(e.target.value)} />
      </AccordionSummary>
      <AccordionDetails>
        {skills.map((skill, index) => (
          <Box key={skill.name + index} className={classes.skill}>
            <TextField label="Skill" value={skill.name} />
            <CustomSelect value={skill.level} options={levels} />
            <Button className={classes.deleteSkillBtn} variant="contained" endIcon={<AddRoundedIcon />} />
          </Box>
        ))}
      </AccordionDetails>
      <AccordionActions sx={{ justifyContent: 'space-between' }}>
        <AddButton title="Add field" />
        <DeleteButton title="Delete section" />
      </AccordionActions>
    </Accordion>
  );
});

const skills = [
  { name: 'HTML', level: '0' },
  { name: 'CSS', level: '2' },
  { name: 'JavaScript', level: '1' },
  { name: 'React', level: '0' },
];

const levels = [
  { value: '0', label: 'Beginner' },
  { value: '1', label: 'Advanced' },
  { value: '2', label: 'Expert' },
];
