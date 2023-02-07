import React from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, TextField } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { useFieldArray, useFormContext, Controller } from 'react-hook-form';

import { SkillGroupField } from 'common-components/SkillGroupField';
import { CustomSelect } from 'common-components/CustomSelect';
import { AddButton } from 'common-components/AddButton';
import { DeleteButton } from 'common-components/DeleteButton';
import theme from 'theme/theme';
import { useStyles } from './styles';
import { ICvProfSkill } from 'models/ICVGeneration';
import { TSkillLevel } from 'models/IHardSkillsMatrix';

interface IProfSkillGroup {
  skillGroup: ICvProfSkill;
  groupIndex: number;
  handleDeleteSkillGroup: (groupIndex: number) => void;
  skillLevels: TSkillLevel[];
}

export const ProfSkillGroup = React.memo((props: IProfSkillGroup) => {
  const { groupIndex, handleDeleteSkillGroup, skillLevels } = props;

  const classes = useStyles({ theme });
  const { control } = useFormContext();
  const { fields, remove, append } = useFieldArray({
    name: `profSkills.${groupIndex}.skills`,
    control,
    keyName: 'skillKey',
  });

  return (
    <Accordion className={classes.accordion} disableGutters TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon className={classes.icon} />}>
        <Controller
          name={`profSkills.${groupIndex}.groupName`}
          control={control}
          render={({ field: { value, onChange } }) => <SkillGroupField value={value} onChange={onChange} />}
        />
      </AccordionSummary>
      <AccordionDetails>
        {fields?.map((skill, skillIndex) => (
          <Box key={skill.skillKey} className={classes.skill}>
            <Controller
              name={`profSkills.${groupIndex}.skills.${skillIndex}.name`}
              control={control}
              render={({ field: { value, onChange } }) => {
                return <TextField label="Skill" value={value} onChange={onChange} />;
              }}
            />
            <Controller
              name={`profSkills.${groupIndex}.skills.${skillIndex}.level`}
              control={control}
              render={({ field: { value, onChange } }) => {
                return <CustomSelect value={value} options={skillLevels} sx={{ width: '220px' }} onChange={onChange} />;
              }}
            />

            <Button
              className={classes.deleteSkillBtn}
              variant="contained"
              endIcon={<AddRoundedIcon />}
              onClick={() => remove(skillIndex)}
            />
          </Box>
        ))}
      </AccordionDetails>
      <AccordionActions sx={{ justifyContent: 'space-between' }}>
        <AddButton title="Add field" onClick={() => append({ name: '', level: '' })} />
        <DeleteButton title="Delete section" onClick={() => handleDeleteSkillGroup(groupIndex)} />
      </AccordionActions>
    </Accordion>
  );
});
