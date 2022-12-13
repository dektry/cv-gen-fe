import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

import { IFormQuestion } from 'models/IHardSkillsMatrix';

import { useForm, useFieldArray, Controller } from 'react-hook-form';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  questions: IFormQuestion[];
}

export const AssessmentSkillQuestions = ({ questions }: IProps) => {
  const classes = useStyles({ theme });

  const { control } = useForm({
    defaultValues: { questions },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'questions',
    control,
    keyName: 'questionKey',
  });

  return (
    <>
      {fields.map((question, questionId) => {
        return (
          <Box key={question.questionKey}>
            <Controller
              name={`questions.${questionId}.value`}
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

      <Button onClick={() => append({ value: '' })}>Add question</Button>
    </>
  );
};
