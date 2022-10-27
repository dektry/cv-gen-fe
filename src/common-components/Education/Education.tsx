import { useState } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';

import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { deleteEducation, createEducation, editEducation } from 'store/reducers/education/thunks';

import { IEducation } from 'models/IEducation';

import { AddButton } from 'common-components/AddButton';
import { DeleteModal } from 'common-components/DeleteModal';
import { CreateOrEditModal } from './components/CreateOrEditModal';

import theme from 'theme/theme';
import { useStyles } from './styles';

interface IProps {
  education?: IEducation[];
  handleUpdateEducation?: (
    dispatcher: AsyncThunk<void, IEducation, Record<string, never>>,
    currEducation: IEducation
  ) => void;
  handleAddToState?: (project: IEducation) => void;
  handleDeleteFromState?: (project: IEducation) => void;
  handleEditInState?: (project: IEducation) => void;
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

  const handleDeleteModalOpen = (el: IEducation) => {
    setCurrentEducation(el);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setCurrentEducation({} as IEducation);
  };

  const onDeleteSubmit = () => {
    if (handleUpdateEducation) {
      handleUpdateEducation(deleteEducation, currentEducation);
    } else if (handleDeleteFromState) {
      handleDeleteFromState(currentEducation);
    }
    setCurrentEducation({} as IEducation);
    setIsDeleteModalOpen(false);
  };

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setCurrentEducation({} as IEducation);
  };

  const onAddSubmit = () => {
    if (handleUpdateEducation) {
      handleUpdateEducation(createEducation, currentEducation);
    } else if (handleAddToState) {
      handleAddToState(currentEducation);
    }
    setIsAddModalOpen(false);
    setCurrentEducation({} as IEducation);
  };

  const handleEditModalOpen = (education: IEducation) => {
    setCurrentEducation(education);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentEducation({} as IEducation);
  };

  const onEditSubmit = () => {
    if (handleUpdateEducation) {
      handleUpdateEducation(editEducation, currentEducation);
    } else if (handleEditInState) {
      handleEditInState(currentEducation);
    }
    setIsEditModalOpen(false);
    setCurrentEducation({} as IEducation);
  };

  return (
    <div className={classes.container}>
      {education?.map((el, idx) => {
        return (
          <div className={classes.infoContainer} key={el.id}>
            <TextField
              value={`${el.university} - ${el.specialization} - ${el.startYear}-${el.endYear}`}
              label={'Education'}
              name="education"
            />
            <Button className={classes.button} endIcon={<EditIcon />} onClick={() => handleEditModalOpen(el)} />
            {idx > 0 && (
              <Button className={classes.button} endIcon={<DeleteIcon />} onClick={() => handleDeleteModalOpen(el)} />
            )}
          </div>
        );
      })}
      <AddButton className={classes.addButton} title={'Add education'} onClick={handleAddModalOpen} />

      <CreateOrEditModal
        modalTitle={'ADD EDUCATION'}
        isOpen={isAddModalOpen}
        submitText={'ADD EDUCATION'}
        onClose={handleCloseAddModal}
        onSubmit={onAddSubmit}
        education={currentEducation}
        setCurrentEducation={setCurrentEducation}
      />

      <CreateOrEditModal
        modalTitle={'EDIT EDUCATION'}
        isOpen={isEditModalOpen}
        submitText={'SAVE CHANGES'}
        onClose={handleCloseEditModal}
        onSubmit={onEditSubmit}
        education={currentEducation}
        setCurrentEducation={setCurrentEducation}
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
