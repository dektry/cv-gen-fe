import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { useForm, useFieldArray, FormProvider, useWatch, SubmitHandler } from 'react-hook-form';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { hardSkillsMatrixSelector, setCurrentSkillGroups } from 'store/reducers/hardSkillsMatrix';

import { IFormSkill, IFormSkillGroup } from 'models/IHardSkillsMatrix';

import { AssessmentSkillGroup } from './components/AssessmentSkillGroup';
import { AddButton } from 'common-components/AddButton';
import { SimpleTextModal } from 'common-components/SimpleTextModal';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  skillGroups?: IFormSkillGroup[];
  setActiveStep: (value: React.SetStateAction<number>) => void;
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

export const HardSkillsMatrixFirstStep = ({ skillGroups, setActiveStep }: IProps) => {
  const dispatch = useAppDispatch();
  const classes = useStyles({ theme });

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const { currentMatrix } = useSelector(hardSkillsMatrixSelector);

  const methods = useForm<IProps>({
    defaultValues: { skillGroups },
  });

  const isModified = methods.formState.isDirty;

  const { fields, append, remove } = useFieldArray({
    name: 'skillGroups',
    control: methods.control,
    keyName: 'fieldKey',
  });

  useEffect(() => {
    const defaultValues = { skillGroups: currentMatrix.skillGroups };
    methods.reset({ ...defaultValues });
  }, [currentMatrix.id]);

  const values = useWatch({ control: methods.control });

  const handleAddSkillGroup = () => {
    append({ id: uuidv4(), value: '', skills: [], order: values.skillGroups?.length || 0 });
  };

  const handleSaveMatrix: SubmitHandler<IProps> = (data) => {
    setActiveStep(1);

    dispatch(setCurrentSkillGroups(data));
  };

  const handleResetModalOpen = () => {
    setIsResetModalOpen(true);
  };

  const handleResetModalClose = () => {
    setIsResetModalOpen(false);
  };

  const handleResetSubmit = () => {
    methods.reset();
    setIsResetModalOpen(false);
  };

  const disabled =
    !values.skillGroups ||
    (values.skillGroups as IFormSkillGroup[])?.some(
      (el) => !el.value || !el.skills?.length || (el.skills as IFormSkill[]).some((skill) => !skill.value)
    ) ||
    !isModified;

  //TODO: remove submit event on enter pressed
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSaveMatrix)} className={classes.container}>
          {fields.map((group, idx) => (
            <AssessmentSkillGroup key={group.fieldKey} idx={idx} removeSection={remove} />
          ))}
          <AddButton title={'Add new section'} onClick={handleAddSkillGroup} />
          <div className={classes.buttonsContainer}>
            <Button onClick={handleResetModalOpen}>RESET CHANGES</Button>
            <Button sx={sxProp} type="submit" className={classes.saveButton} disabled={disabled}>
              Save changes
            </Button>
          </div>
        </form>
      </FormProvider>

      <SimpleTextModal
        isOpen={isResetModalOpen}
        onClose={handleResetModalClose}
        onSubmit={handleResetSubmit}
        modalTitle={'RESET CHANGES'}
        modalText={'Are you sure you want to reset all changes made? All data will be lost.'}
      />
    </>
  );
};
