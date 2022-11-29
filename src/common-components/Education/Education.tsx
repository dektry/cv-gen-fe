import { useState, useEffect } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';

import { useForm, useFieldArray } from 'react-hook-form';

import { TextField, FormControl } from '@mui/material';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { IEducation } from 'models/IEducation';

import { AddButton } from 'common-components/AddButton';
import { DeleteModal } from 'common-components/DeleteModal';
import { CreateOrEditModal } from './components/CreateOrEditModal';

import theme from 'theme/theme';
import { useStyles } from './styles';

interface IProps {
  education: IEducation[];
  handleUpdateEducation?: (
    dispatcher: AsyncThunk<void, IEducation, Record<string, never>>,
    currEducation: IEducation
  ) => void;
  handleAddToState?: (project: IEducation) => void;
  handleDeleteFromState?: (project: IEducation) => void;
  handleEditInState?: (project: IEducation) => void;
}

interface FormValues {
  education: IEducation[];
}

export const Education = ({
  education,
  handleUpdateEducation,
  handleAddToState,
  handleDeleteFromState,
  handleEditInState,
}: IProps) => {
  const classes = useStyles({ theme });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<IEducation>({} as IEducation);
  const [id, setId] = useState(0);

  const { control, reset } = useForm<FormValues>({ defaultValues: { education } });

  const { fields, append, remove, update } = useFieldArray({
    name: 'education',
    keyName: 'fieldKey',
    control,
  });

  useEffect(() => {
    const defaultValues = { education };
    reset({ ...defaultValues });
  }, [education]);

  const handleDeleteModalOpen = (el: IEducation, idx: number) => {
    setCurrentEducation(el);
    setId(idx);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setCurrentEducation({} as IEducation);
  };

  const onDeleteSubmit = () => {
    if (handleUpdateEducation) {
      remove(id);
      // handleUpdateEducation(deleteEducation, currentEducation);
    } else if (handleDeleteFromState) {
      handleDeleteFromState(currentEducation);
      remove(id);
    }
    setCurrentEducation({} as IEducation);
    setId(0);
    setIsDeleteModalOpen(false);
  };

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setCurrentEducation({} as IEducation);
  };

  const onAddSubmit = (education: IEducation) => {
    if (handleUpdateEducation) {
      append(education);
      // handleUpdateEducation(createEducation, currentEducation);
    } else if (handleAddToState) {
      append(education);
      handleAddToState(education);
    }
    setIsAddModalOpen(false);
    setCurrentEducation({} as IEducation);
  };

  const handleEditModalOpen = (education: IEducation, idx: number) => {
    setCurrentEducation(education);
    setId(idx);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentEducation({} as IEducation);
  };

  const onEditSubmit = (education: IEducation) => {
    if (handleUpdateEducation) {
      update(id, education);
      // handleUpdateEducation(editEducation, currentEducation);
    } else if (handleEditInState) {
      handleEditInState(education);
      update(id, education);
    }
    setIsEditModalOpen(false);
    setCurrentEducation({} as IEducation);
  };

  return (
    <div className={classes.container} style={{ marginTop: '16px' }}>
      <FormControl>
        {fields?.map((el, idx) => {
          return (
            <div className={classes.infoContainer} key={el.fieldKey}>
              <TextField
                value={`${el.university} - ${el.specialization} - ${el.startYear}-${el.endYear}`}
                label={'Education'}
                name="education"
              />
              <Button className={classes.button} endIcon={<EditIcon />} onClick={() => handleEditModalOpen(el, idx)} />
              {idx > 0 && (
                <Button
                  className={classes.button}
                  endIcon={<DeleteIcon />}
                  onClick={() => handleDeleteModalOpen(el, idx)}
                />
              )}
            </div>
          );
        })}
        <AddButton className={classes.addButton} title={'Add education'} onClick={handleAddModalOpen} />
      </FormControl>

      <CreateOrEditModal
        modalTitle={'ADD EDUCATION'}
        isOpen={isAddModalOpen}
        submitText={'ADD EDUCATION'}
        onClose={handleCloseAddModal}
        onSubmit={onAddSubmit}
        education={currentEducation}
      />

      <CreateOrEditModal
        modalTitle={'EDIT EDUCATION'}
        isOpen={isEditModalOpen}
        submitText={'SAVE CHANGES'}
        onClose={handleCloseEditModal}
        onSubmit={onEditSubmit}
        education={currentEducation}
      />

      <DeleteModal
        onSubmit={onDeleteSubmit}
        onClose={handleDeleteModalClose}
        isOpen={isDeleteModalOpen}
        modalTitle={'DELETE EDUCATION'}
        modalText={'Are you sure you want to delete this education? All data will be lost'}
      />
    </div>
  );
};
