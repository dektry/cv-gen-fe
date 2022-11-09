import { useState } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';

import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { createLanguage, editLanguage, deleteLanguage } from 'store/reducers/languages/thunks';

import { ILanguage } from 'models/ILanguage';

import { AddButton } from 'common-components/AddButton';
import { DeleteModal } from 'common-components/DeleteModal';
import { CreateOrEditModal } from './components/CreateOrEditModal';

import theme from 'theme/theme';
import { useStyles } from './styles';

interface IProps {
  languages?: ILanguage[];
  handleUpdateLanguage?: (
    dispatcher: AsyncThunk<void, ILanguage, Record<string, never>>,
    currentLanguage: ILanguage
  ) => void;
  handleAddToState?: (project: ILanguage) => void;
  handleDeleteFromState?: (project: ILanguage) => void;
  handleEditInState?: (project: ILanguage) => void;
}

export const Languages = ({
  languages,
  handleUpdateLanguage,
  handleAddToState,
  handleDeleteFromState,
  handleEditInState,
}: IProps) => {
  const classes = useStyles({ theme });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<ILanguage>({} as ILanguage);

  const handleDeleteModalOpen = (el: ILanguage) => {
    setCurrentLanguage(el);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setCurrentLanguage({} as ILanguage);
  };

  const onDeleteSubmit = () => {
    if (handleUpdateLanguage) {
      handleUpdateLanguage(deleteLanguage, currentLanguage);
    } else if (handleDeleteFromState) {
      handleDeleteFromState(currentLanguage);
    }
    setCurrentLanguage({} as ILanguage);
    setIsDeleteModalOpen(false);
  };

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setCurrentLanguage({} as ILanguage);
  };

  const onAddSubmit = (language: ILanguage) => {
    if (handleUpdateLanguage) {
      handleUpdateLanguage(createLanguage, language);
    } else if (handleAddToState) {
      handleAddToState(language);
    }
    setIsAddModalOpen(false);
    setCurrentLanguage({} as ILanguage);
  };

  const handleEditModalOpen = (language: ILanguage) => {
    setCurrentLanguage(language);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentLanguage({} as ILanguage);
  };

  const onEditSubmit = (language: ILanguage) => {
    if (handleUpdateLanguage) {
      handleUpdateLanguage(editLanguage, language);
    } else if (handleEditInState) {
      handleEditInState(language);
    }
    setIsEditModalOpen(false);
    setCurrentLanguage({} as ILanguage);
  };

  return (
    <div className={classes.container}>
      {languages?.map((el, idx) => {
        return (
          <div className={classes.infoContainer} key={el.id}>
            <TextField value={`${el.value} - ${el.level}`} label={'Languages'} name="languages" />
            <Button className={classes.button} endIcon={<EditIcon />} onClick={() => handleEditModalOpen(el)} />
            {idx > 0 && (
              <Button className={classes.button} endIcon={<DeleteIcon />} onClick={() => handleDeleteModalOpen(el)} />
            )}
          </div>
        );
      })}
      <AddButton className={classes.addButton} title={'Add language'} onClick={handleAddModalOpen} />

      <CreateOrEditModal
        modalTitle={'ADD LANGUAGE'}
        isOpen={isAddModalOpen}
        submitText={'ADD LANGUAGE'}
        onClose={handleCloseAddModal}
        onSubmit={onAddSubmit}
        language={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
      />

      <CreateOrEditModal
        modalTitle={'EDIT LANGUAGE'}
        isOpen={isEditModalOpen}
        submitText={'SAVE CHANGES'}
        onClose={handleCloseEditModal}
        onSubmit={onEditSubmit}
        language={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
      />

      <DeleteModal
        onSubmit={onDeleteSubmit}
        onClose={handleDeleteModalClose}
        isOpen={isDeleteModalOpen}
        modalTitle={'DELETE LANGUAGE'}
        modalText={'Are you sure you want to delete this language? All data will be lost'}
      />
    </div>
  );
};
