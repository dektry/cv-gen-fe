import { useState, useEffect } from 'react';

import { useForm, useFieldArray, FormProvider, useWatch } from 'react-hook-form';

import Button from '@mui/material/Button';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { softSkillsMatrixSelector } from 'store/reducers/softSkillsMatrix';

import { SoftSkillLevelsTable } from './components/SoftSkillLevelsTable';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { createSoftSkillsMatrix, editSoftSkillsMatrix } from 'store/reducers/softSkillsMatrix/thunks';
import { IFormSoftSkillsMatrix } from 'models/ISoftSkillsMatrix';

import { SimpleTextModal } from 'common-components/SimpleTextModal';

interface IProps {
  matrix?: IFormSoftSkillsMatrix;
}

export const SoftSkillsMatrixSecondStep = ({ matrix }: IProps) => {
  const classes = useStyles({ theme });
  const dispatch = useAppDispatch();

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const { currentMatrix } = useSelector(softSkillsMatrixSelector);

  const methods = useForm({
    defaultValues: { matrix },
  });

  useEffect(() => {
    const defaultValues = { matrix: currentMatrix };
    methods.reset({ ...defaultValues });
  }, [currentMatrix.id]);

  const values = useWatch({ control: methods.control });

  const { fields } = useFieldArray({
    name: 'matrix.skills',
    control: methods.control,
    keyName: 'skillKey',
  });

  const handleSubmitMatrix = () => {
    const requestBody = {
      matrix: values.matrix || ([] as IFormSoftSkillsMatrix),
      positionId: values.matrix?.position?.id || '',
    };

    if (!currentMatrix.id) {
      dispatch(createSoftSkillsMatrix(requestBody));
    } else {
      dispatch(editSoftSkillsMatrix(requestBody));
    }
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

  const handleSaveModalOpen = () => {
    setIsSaveModalOpen(true);
  };

  const handleSaveModalClose = () => {
    setIsSaveModalOpen(false);
  };

  const handleSaveSubmit = () => {
    handleSubmitMatrix();
    setIsSaveModalOpen(false);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSaveModalOpen)}>
          {fields.map((skill, idx) => (
            <SoftSkillLevelsTable key={skill.skillKey} skill={skill} idx={idx} />
          ))}
          <div className={classes.buttonsContainer}>
            <Button onClick={handleResetModalOpen}>RESET CHANGES</Button>
            <Button type="submit" className={classes.saveButton}>
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

      <SimpleTextModal
        isOpen={isSaveModalOpen}
        onClose={handleSaveModalClose}
        onSubmit={handleSaveSubmit}
        modalTitle={'SAVE CHANGES'}
        modalText={'Do you want to save changes?'}
      />
    </>
  );
};
