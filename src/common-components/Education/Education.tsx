import React, { useState } from 'react';

import { TextField } from '@mui/material';
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
  education?: IEducation[];
  handleConfirmDelete: (id: string) => void;
  handleConfirmAddEducation: (education: IEducation) => void;
  handleConfirmEditEducation: (education: IEducation) => void;
}

export const Education = ({
  education,
  handleConfirmDelete,
  handleConfirmAddEducation,
  handleConfirmEditEducation,
}: IProps) => {
  const classes = useStyles({ theme });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [educationId, setEducationId] = useState('');
  const [currentEducation, setCurrentEducation] = useState<IEducation>({} as IEducation);

  const handleDeleteModalOpen = (id: string) => {
    setEducationId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setEducationId('');
  };

  const onDeleteSubmit = () => {
    handleConfirmDelete(educationId);
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
    handleConfirmAddEducation(currentEducation);
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
    handleConfirmEditEducation(currentEducation);
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
              <Button
                className={classes.button}
                endIcon={<DeleteIcon />}
                onClick={() => handleDeleteModalOpen(String(el.id))}
              />
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
        submitText={'ADD EDUCATION'}
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