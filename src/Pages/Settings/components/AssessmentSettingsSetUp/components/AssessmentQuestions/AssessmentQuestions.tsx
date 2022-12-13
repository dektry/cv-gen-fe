import { useForm, useFieldArray, FormProvider, useWatch, SubmitHandler } from 'react-hook-form';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material';

import { useAppDispatch } from 'store';
import { createHardSkillsMatrix, editHardSkillsMatrix } from 'store/reducers/hardSkillsMatrix/thunks';

import { ISkill, ISkillGroup } from 'models/IHardSkillsMatrix';

import { AssessmentSkillGroup } from './components/AssessmentSkillGroup';
import { AddButton } from 'common-components/AddButton';
import { SaveButton } from 'common-components/SaveButton';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  id?: string;
  skillGroups: ISkillGroup[];
}

const sxProp: SxProps = [
  {
    background: () => theme.palette.primary.main,
    height: '56px',
    minWidth: '94px',
    maxWwidth: '185px',
    marginLeft: '8px',
    borderRadius: '100px',
    color: () => theme.palette.background.default,

    '&:hover': {
      cursor: 'pointer',
      background: () => theme.palette.primary.main,
      boxShadow:
        '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
    },
  },
];

export const AssessmentQuestions = ({ skillGroups, id }: IProps) => {
  const dispatch = useAppDispatch();
  const classes = useStyles({ theme });

  const methods = useForm<IProps>({
    defaultValues: { skillGroups },
  });

  const { fields, append, remove, update } = useFieldArray({
    name: 'skillGroups',
    control: methods.control,
    keyName: 'fieldKey',
  });

  const values = useWatch({ control: methods.control });

  const handleAddSkillGroup = () => {
    append({ value: '', skills: [] as ISkill[] });
  };

  const handleSaveMatrix: SubmitHandler<IProps> = (data, e) => {
    id ? dispatch(editHardSkillsMatrix(data)) : dispatch(createHardSkillsMatrix(data));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSaveMatrix)} className={classes.container}>
        {fields.map((group, idx) => (
          <AssessmentSkillGroup key={group.fieldKey} skillGroup={group} idx={idx} removeSection={remove} />
        ))}
        <AddButton title={'Add new section'} onClick={handleAddSkillGroup} />
        <div className={classes.buttonsContainer}>
          <Button onClick={() => methods.reset()}>RESET CHANGES</Button>
          <Button sx={sxProp} type="submit" className={classes.saveButton} disabled={!values.skillGroups}>
            Save changes
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
