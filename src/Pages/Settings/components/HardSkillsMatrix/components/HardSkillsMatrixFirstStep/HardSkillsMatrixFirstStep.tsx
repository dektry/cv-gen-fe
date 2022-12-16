import { useState } from 'react';

import { useForm, useFieldArray, FormProvider, useWatch, SubmitHandler } from 'react-hook-form';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material';

import { useAppDispatch } from 'store';
import { setCurrentSkillGroups } from 'store/reducers/hardSkillsMatrix';

import { IFormSkillGroup } from 'models/IHardSkillsMatrix';

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

  const methods = useForm<IProps>({
    defaultValues: { skillGroups },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'skillGroups',
    control: methods.control,
    keyName: 'fieldKey',
  });

  const values = useWatch({ control: methods.control });

  const handleAddSkillGroup = () => {
    append({ value: '', skills: [] });
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
            <Button sx={sxProp} type="submit" className={classes.saveButton} disabled={!values.skillGroups}>
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
