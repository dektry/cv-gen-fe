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
import { FieldArray } from 'formik';
import { remove } from 'lodash';

const levelsOptions = Object.values(LevelTypesEnum).map((level) => ({
  label: level,
  value: level,
}));

interface IProfSkillGroup {
  name: string;
  skillGroup: TProfSkill;
  groupIndex: number;
  handleChange: {
    (e: React.ChangeEvent<HTMLElement>): void;
    <T = string | React.ChangeEvent<HTMLElement>>(field: T): T extends React.ChangeEvent<HTMLElement>
      ? void
      : (e: string | React.ChangeEvent<HTMLElement>) => void;
  };
}

export const ProfSkillGroup = React.memo((props: IProfSkillGroup) => {
  const { name, skillGroup, groupIndex, handleChange } = props;

  const classes = useStyles({ theme });

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <>
          {skillGroup.skills?.map((skill, skillIndex) => (
            <Box key={skillIndex} className={classes.skill}>
              <TextField label="Skill" value={skill.name} name={`${name}.${skillIndex}.name`} onChange={handleChange} />
              <CustomSelect
                value={skill.level}
                options={levelsOptions}
                sx={{ width: '220px' }}
                name={`${name}.${skillIndex}.level`}
                onChange={handleChange}
              />
              <Button
                className={classes.deleteSkillBtn}
                variant="contained"
                endIcon={<AddRoundedIcon />}
                onClick={() => arrayHelpers.remove(skillIndex)}
              />
            </Box>
          ))}
          <AddButton
            className={classes.addSkillBtn}
            title="Add field"
            onClick={() => arrayHelpers.push({ name: '', level: '' })}
          />
        </>
      )}
    />
  );
});
