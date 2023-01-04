import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useForm, useFieldArray, FormProvider, useWatch, SubmitHandler } from 'react-hook-form';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { softSkillsMatrixSelector, setCurrentSkills } from 'store/reducers/softSkillsMatrix';

import { IFormSkill, IFormLevel } from 'models/ISoftSkillsMatrix';

import { AddButton } from 'common-components/AddButton';
import { SimpleTextModal } from 'common-components/SimpleTextModal';
import { SoftSkillsMatrixSkill } from './components/SoftSkillsMatrixSkill';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  skills?: IFormSkill[];
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

export const SoftSkillsMatrixFirstStep = ({ skills, setActiveStep }: IProps) => {
  const dispatch = useAppDispatch();
  const classes = useStyles({ theme });

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const { currentMatrix } = useSelector(softSkillsMatrixSelector);

  const methods = useForm<IProps>({
    defaultValues: { skills },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'skills',
    control: methods.control,
    keyName: 'fieldKey',
  });

  useEffect(() => {
    const defaultValues = { skills: currentMatrix.skills };
    methods.reset({ ...defaultValues });
  }, [currentMatrix.id]);

  const values = useWatch({ control: methods.control });

  const handleAddSkill = () => {
    append({ id: uuidv4(), value: '', levels: [] });
  };

  const handleSaveMatrix: SubmitHandler<IProps> = (data) => {
    setActiveStep(1);

    dispatch(setCurrentSkills(data));
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
    !values.skills ||
    (values.skills as IFormSkill[])?.some(
      (el) => !el.value || !el.levels?.length || (el.levels as IFormLevel[]).some((level) => !level.value)
    );
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSaveMatrix)} className={classes.container}>
          {fields.map((group, idx) => (
            <SoftSkillsMatrixSkill key={group.fieldKey} idx={idx} removeSection={remove} />
          ))}
          <AddButton title={'Add new section'} onClick={handleAddSkill} />
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
