import { useFormContext, Controller, useFieldArray } from 'react-hook-form';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';

import { SkillGroupField } from 'common-components/SkillGroupField';
import { IFormSkill } from 'models/ISoftSkillsMatrix';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  idx: number;
  handleSkillLevelChange: (idx: number, value: string) => void;
  skill: IFormSkill | undefined;
}

export const SoftAssessmentSkill = ({ idx, handleSkillLevelChange, skill }: IProps) => {
  const classes = useStyles({ theme });

  const { control } = useFormContext();

  const { fields } = useFieldArray({
    name: `matrix.skills.${idx}.levels`,
    control: control,
    keyName: 'levelKey',
  });

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Controller
          name={`matrix.skills.${idx}.value`}
          control={control}
          render={({ field: { value } }) => <SkillGroupField value={value} />}
        />
      </div>

      {fields.map((level, levelIndex) => (
        <Box key={level.levelKey} className={classes.skill}>
          <Controller
            name={`matrix.skills.${idx}.levels.${levelIndex}.value`}
            control={control}
            render={({ field: { value } }) => {
              return (
                <Radio
                  checked={skill?.currentLevel === value}
                  value={value}
                  onChange={() => handleSkillLevelChange(idx, value)}
                />
              );
            }}
          />
          <Controller
            name={`matrix.skills.${idx}.levels.${levelIndex}.description`}
            control={control}
            render={({ field: { value } }) => (
              <TextField multiline={true} sx={{ width: '90%' }} fullWidth={true} value={value} />
            )}
          />
        </Box>
      ))}
      <Controller
        name={`matrix.skills.${idx}.comment`}
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextField
            multiline={true}
            sx={{ background: theme.palette.background.default }}
            fullWidth={true}
            value={value}
            onChange={onChange}
          />
        )}
      />
    </div>
  );
};
