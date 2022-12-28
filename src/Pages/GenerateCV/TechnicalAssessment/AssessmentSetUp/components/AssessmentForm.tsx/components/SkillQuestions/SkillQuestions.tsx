import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { AddButton } from 'common-components/AddButton';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  skillGroupIndex: number;
  skillIndex: number;
  setIsAnyQuestionChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SkillQuestions = ({ skillGroupIndex, skillIndex, setIsAnyQuestionChanged }: IProps) => {
  const classes = useStyles({ theme });
  const { control } = useFormContext();

  const { append, remove, fields } = useFieldArray({
    name: `matrix.skillGroups.${skillGroupIndex}.skills.${skillIndex}.questions`,
    control,
    keyName: 'skillQuestionKey',
  });

  return (
    <div className={classes.container}>
      {fields.map((question, questionIndex) => {
        return (
          <div className={classes.questionContainer} key={question.skillQuestionKey}>
            <Controller
              name={`matrix.skillGroups.${skillGroupIndex}.skills.${skillIndex}.questions.${questionIndex}.value`}
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <TextField
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                      setIsAnyQuestionChanged(true);
                    }}
                    label="Question"
                  />
                );
              }}
            />
            <Button
              className={classes.deleteQuestionBtn}
              variant="contained"
              endIcon={<AddRoundedIcon />}
              onClick={() => {
                remove(questionIndex);
                setIsAnyQuestionChanged(true);
              }}
            />
          </div>
        );
      })}
      <AddButton
        sx={{ width: '10rem', justifySelf: 'flex-start' }}
        title="Add question"
        onClick={() => {
          append({ id: uuidv4(), value: '' });
          setIsAnyQuestionChanged(true);
        }}
      />
    </div>
  );
};
