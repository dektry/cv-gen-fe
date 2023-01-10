import { useState } from 'react';

import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';

import { useAppDispatch } from 'store';
import { deleteEducation } from 'store/reducers/education/thunks';

import { TextField, FormControl } from '@mui/material';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { ICvEducation } from 'models/ICVGeneration';

import { AddButton } from 'common-components/AddButton';
import { DeleteModal } from 'common-components/DeleteModal';
import { CreateOrEditModal } from './components/CreateOrEditModal';

import theme from 'theme/theme';
import { useStyles } from './styles';

export const Education = () => {
  const classes = useStyles({ theme });
  const dispatch = useAppDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<ICvEducation>({} as ICvEducation);
  const [id, setId] = useState(0);

  const { control } = useFormContext();

  const { append, remove, update } = useFieldArray({
    name: 'education',
    control,
  });

  const { education } = useWatch();

  const handleDeleteModalOpen = (el: ICvEducation, idx: number) => {
    setCurrentEducation(el);
    setId(idx);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setCurrentEducation({} as ICvEducation);
  };

  const onDeleteSubmit = () => {
    remove(id);
    setCurrentEducation({} as ICvEducation);
    dispatch(deleteEducation(currentEducation));
    setId(0);
    setIsDeleteModalOpen(false);
  };

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setCurrentEducation({} as ICvEducation);
  };

  const onAddSubmit = (education: ICvEducation) => {
    append(education);
    setIsAddModalOpen(false);
    setCurrentEducation({} as ICvEducation);
  };

  const handleEditModalOpen = (education: ICvEducation, idx: number) => {
    setCurrentEducation(education);
    setId(idx);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentEducation({} as ICvEducation);
  };

  const onEditSubmit = (education: ICvEducation) => {
    update(id, education);
    setIsEditModalOpen(false);
    setCurrentEducation({} as ICvEducation);
  };

  return (
    <div className={classes.container} style={{ marginTop: '16px' }}>
      <FormControl>
        {education?.map((el: ICvEducation, idx: number) => {
          return (
            <div className={classes.infoContainer} key={el.id}>
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
