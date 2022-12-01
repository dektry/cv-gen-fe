import { useState } from 'react';

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { useAppDispatch } from 'store';
import { deleteLanguage } from 'store/reducers/languages/thunks';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { ICvLanguage } from 'Pages/CVGeneration/components/CVGenerationInfo';

import { AddButton } from 'common-components/AddButton';
import { DeleteModal } from 'common-components/DeleteModal';
import { CreateOrEditModal } from './components/CreateOrEditModal';

import theme from 'theme/theme';
import { useStyles } from './styles';

export const Languages = () => {
  const classes = useStyles({ theme });
  const dispatch = useAppDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<ICvLanguage>({} as ICvLanguage);
  const [id, setId] = useState(0);

  const { control } = useFormContext();

  const { append, remove, update } = useFieldArray({
    name: 'languages',
    control,
  });
  const { languages } = useWatch({ control });

  const handleDeleteModalOpen = (el: ICvLanguage, idx: number) => {
    setCurrentLanguage(el);
    setId(idx);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setCurrentLanguage({} as ICvLanguage);
  };

  const onDeleteSubmit = () => {
    remove(id);
    if (currentLanguage.id) {
      dispatch(deleteLanguage(currentLanguage));
    }
    setId(0);
    setCurrentLanguage({} as ICvLanguage);
    setIsDeleteModalOpen(false);
  };

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setCurrentLanguage({} as ICvLanguage);
  };

  const onAddSubmit = (language: ICvLanguage) => {
    append(language);
    setIsAddModalOpen(false);
    setCurrentLanguage({} as ICvLanguage);
  };

  const handleEditModalOpen = (language: ICvLanguage, idx: number) => {
    setCurrentLanguage(language);
    setId(idx);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentLanguage({} as ICvLanguage);
  };

  const onEditSubmit = (language: ICvLanguage) => {
    update(id, language);
    setIsEditModalOpen(false);
    setCurrentLanguage({} as ICvLanguage);
  };

  return (
    <div className={classes.container}>
      <div>
        {languages?.map((el: ICvLanguage, idx: number) => {
          return (
            <div className={classes.infoContainer} key={el.value}>
              <TextField value={`${el.value} - ${el.level}`} label={'Languages'} name="languages" />
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
        <AddButton className={classes.addButton} title={'Add language'} onClick={handleAddModalOpen} />
      </div>

      <CreateOrEditModal
        modalTitle={'ADD LANGUAGE'}
        isOpen={isAddModalOpen}
        submitText={'ADD LANGUAGE'}
        onClose={handleCloseAddModal}
        onSubmit={onAddSubmit}
        language={currentLanguage}
      />

      <CreateOrEditModal
        modalTitle={'EDIT LANGUAGE'}
        isOpen={isEditModalOpen}
        submitText={'SAVE CHANGES'}
        onClose={handleCloseEditModal}
        onSubmit={onEditSubmit}
        language={currentLanguage}
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
