import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
  FormControl,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { useForm, Controller, useWatch, useFieldArray, UseFieldArrayRemove } from 'react-hook-form';

import { TProfSkill } from 'Pages/CVGeneration/CVGenerationPage';
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
  removeSkillGroup: UseFieldArrayRemove;
}

export const ProfSkillGroup = React.memo((props: IProfSkillGroup) => {
  const { skillGroup, groupIndex, removeSkillGroup } = props;

  const classes = useStyles({ theme });

  const { control, reset, register, setValue } = useForm<TProfSkill>({
    defaultValues: skillGroup,
  });

  const values = useWatch<TProfSkill>({
    control,
  });

  const { fields, append, remove } = useFieldArray({
    name: 'skills',
    keyName: 'fieldKey',
    control,
  });

  useEffect(() => {
    const defaultValues = { ...skillGroup };
    reset({ ...defaultValues });
  }, [skillGroup]);

  return (
    <FormControl className={classes.skillsContainer}>
      <Accordion className={classes.accordion} disableGutters TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon className={classes.icon} />}>
          <SkillGroupField
            value={values.groupName}
            {...register('groupName')}
            onChange={(e) => setValue('groupName', e.target.value)}
          />
        </AccordionSummary>
        <AccordionDetails>
          {fields.map((skill, skillIndex) => (
            <Box key={skill.fieldKey} className={classes.skill}>
              <Controller
                name={`skills.${skillIndex}.name`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField label="Skill" value={value} onChange={onChange} />
                )}
              />
              <Controller
                name={`skills.${skillIndex}.level`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomSelect value={value} options={levelsOptions} sx={{ width: '220px' }} onChange={onChange} />
                )}
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
          <DeleteButton title="Delete section" onClick={() => removeSkillGroup(groupIndex)} />
        </AccordionActions>
      </Accordion>
    </FormControl>
  );
});
