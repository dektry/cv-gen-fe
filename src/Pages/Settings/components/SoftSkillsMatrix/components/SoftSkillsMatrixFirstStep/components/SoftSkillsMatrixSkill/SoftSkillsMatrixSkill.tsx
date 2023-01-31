import { useState } from 'react';

import { useFormContext, Controller, useFieldArray, UseFieldArrayRemove, useWatch } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

import { SoftLevelTypesEnum } from 'models/ISoftSkillsMatrix';

import { SkillGroupField } from 'common-components/SkillGroupField';
import { DeleteButton } from 'common-components/DeleteButton';
import { DeleteModal } from 'common-components/DeleteModal';
import { AddButton } from 'common-components/AddButton';
import { CustomSelect } from 'common-components/CustomSelect';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  idx: number;
  removeSection: UseFieldArrayRemove;
}

const skillLevelsOptions = Object.values(SoftLevelTypesEnum).map((el) => ({ value: el, label: el }));
const skillLevelsOptionsLength = Object.values(SoftLevelTypesEnum).length;

export const SoftSkillsMatrixSkill = ({ idx, removeSection }: IProps) => {
  const classes = useStyles({ theme });

  const [isDeleteSkillModalOpen, setIsDeleteSkillModalOpen] = useState(false);

  const methods = useFormContext();

  const { fields, remove, append } = useFieldArray({
    name: `skills.${idx}.levels`,
    control: methods.control,
    keyName: 'levelKey',
  });

  const values = useWatch({ control: methods.control });

  const handleDeleteSkillModalOpen = () => {
    setIsDeleteSkillModalOpen(true);
  };

  const handleDeleteSkillModalClose = () => {
    setIsDeleteSkillModalOpen(false);
  };

  const handleConfirmSkillDelete = () => {
    removeSection(idx);
    setIsDeleteSkillModalOpen(false);
  };

  const appendLevelValue = {
    id: uuidv4(),
    value: '',
    description: '',
    level_id: { id: '' },
    order: values.skills[idx].levels.length || 0,
  };

  const disabled = fields.length >= skillLevelsOptionsLength;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <Controller
            name={`skills.${idx}.value`}
            control={methods.control}
            render={({ field: { value, onChange } }) => <SkillGroupField value={value} onChange={onChange} />}
          />
          <DeleteButton title={'Delete section'} onClick={handleDeleteSkillModalOpen} />
        </div>

        {fields.map((level, levelIndex) => (
          <Box key={level.levelKey} className={classes.skill}>
            <Controller
              name={`skills.${idx}.levels.${levelIndex}.value`}
              control={methods.control}
              render={({ field: { value, onChange } }) => {
                return (
                  <CustomSelect sx={{ width: '5%' }} options={skillLevelsOptions} value={value} onChange={onChange} />
                );
              }}
            />
            <Controller
              name={`skills.${idx}.levels.${levelIndex}.description`}
              control={methods.control}
              render={({ field: { value, onChange } }) => (
                <TextField multiline={true} sx={{ width: '90%' }} fullWidth={true} value={value} onChange={onChange} />
              )}
            />
            <Button
              className={classes.deleteSkillBtn}
              variant="contained"
              endIcon={<CloseIcon />}
              onClick={() => remove(levelIndex)}
            />
          </Box>
        ))}

        <AddButton
          disabled={disabled}
          className={classes.addButton}
          title="Add description"
          onClick={() => append(appendLevelValue)}
        />
      </div>
      <DeleteModal
        isOpen={isDeleteSkillModalOpen}
        onClose={handleDeleteSkillModalClose}
        onSubmit={handleConfirmSkillDelete}
        modalTitle={'DELETE SECTION'}
        modalText={'Are you sure you want to delete this section? All data will be lost'}
      />
    </>
  );
};
