import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

import { AddButton } from 'common-components/AddButton';
import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  groupIndex: number;
  skillIndex: number;
}

export const AssessmentSkillQuestions = ({ groupIndex, skillIndex }: IProps) => {
  const classes = useStyles({ theme });

  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: `skillGroups.${groupIndex}.skills.${skillIndex}.questions`,
    control,
    keyName: 'questionKey',
  });

  return (
    <>
      {fields.map((question, questionId) => {
        return (
          <Box key={question.questionKey} className={classes.question}>
            <Controller
              name={`skillGroups.${groupIndex}.skills.${skillIndex}.questions.${questionId}.value`}
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField label="Question" value={value} onChange={onChange} />
              )}
            />
            <Button
              className={classes.deleteSkillBtn}
              variant="contained"
              endIcon={<CloseIcon />}
              onClick={() => remove(questionId)}
            />
          </Box>
        );
      })}

      <AddButton onClick={() => append({ id: uuidv4(), value: '' })} title={'Add question'} />
    </>
  );
};
