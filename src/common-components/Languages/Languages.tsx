import { useState, useEffect } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';

import { useForm, useFieldArray } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

interface FormValues {
  languages: ILanguage[];
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
  const [id, setId] = useState(0);

  const { control, reset } = useForm<FormValues>({ defaultValues: { languages } });

  const { fields, append, remove, update } = useFieldArray({
    name: 'languages',
    keyName: 'fieldKey',
    control,
  });

  useEffect(() => {
    const defaultValues = { languages };
    reset({ ...defaultValues });
  }, [languages]);

  const handleDeleteModalOpen = (el: ILanguage, idx: number) => {
    setCurrentLanguage(el);
    setId(idx);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setCurrentLanguage({} as ILanguage);
  };

  const onDeleteSubmit = () => {
    if (handleUpdateLanguage) {
      remove(id);
      // handleUpdateLanguage(deleteLanguage, currentLanguage);
    } else if (handleDeleteFromState) {
      remove(id);
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
      append(language);
      // handleUpdateLanguage(createLanguage, currentLanguage);
    } else if (handleAddToState) {
      append(language);
      handleAddToState(currentLanguage);
    }
    setIsAddModalOpen(false);
    setCurrentLanguage({} as ILanguage);
  };

  const handleEditModalOpen = (language: ILanguage, idx: number) => {
    setCurrentLanguage(language);
    setId(idx);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentLanguage({} as ILanguage);
  };

  const onEditSubmit = (language: ILanguage) => {
    if (handleUpdateLanguage) {
      update(id, language);
      // handleUpdateLanguage(editLanguage, currentLanguage);
    } else if (handleEditInState) {
      update(id, language);
      handleEditInState(currentLanguage);
    }
    setIsEditModalOpen(false);
    setCurrentLanguage({} as ILanguage);
  };

  return (
    <div className={classes.container}>
      <FormControl>
        {fields?.map((el, idx) => {
          return (
            <div className={classes.infoContainer} key={el.fieldKey}>
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
      </FormControl>

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
