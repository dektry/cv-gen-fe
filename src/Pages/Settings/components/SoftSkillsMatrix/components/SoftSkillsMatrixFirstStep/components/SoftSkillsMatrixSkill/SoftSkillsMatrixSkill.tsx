import { useState, useMemo } from 'react';

import { useFormContext, Controller, useFieldArray, UseFieldArrayRemove } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/DeleteRounded';

import { SoftLevelTypesEnum } from 'models/ISoftSkillsMatrix';

import { SkillGroupField } from 'common-components/SkillGroupField';
import { DeleteButton } from 'common-components/DeleteButton';
import { DeleteModal } from 'common-components/DeleteModal';
import { AddButton } from 'common-components/AddButton';
import { CustomTextField } from 'common-components/CustomTextField';
import { CustomSelect } from 'common-components/CustomSelect';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  idx: number;
  removeSection: UseFieldArrayRemove;
}

const skillLevelsOptions = Object.values(SoftLevelTypesEnum).map((el) => ({ value: el, label: el }));

export const SoftSkillsMatrixSkill = ({ idx, removeSection }: IProps) => {
  const classes = useStyles({ theme });

  const [isDeleteSkillModalOpen, setIsDeleteSkillModalOpen] = useState(false);
  const [deletingSkillId, setDeletingSkillId] = useState(0);

  const defaultLevels = useMemo(
    () =>
      skillLevelsOptions.map((level) => ({
        id: uuidv4(),
        value: level.value,
        level_id: {
          // TODO: replace levels data with soft skill levels from DB (needed to be implementedon the backend)
          id: '',
          name: level.value,
        },
      })),
    [skillLevelsOptions]
  );

  const methods = useFormContext();

  const { fields, remove, append } = useFieldArray({
    name: `skills.${idx}.levels`,
    control: methods.control,
    keyName: 'levelKey',
  });

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

  const appendLevelValue = { value: '', id: uuidv4(), levels: defaultLevels, questions: [] };

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
                return <CustomSelect options={skillLevelsOptions} value={value} onChange={onChange} />;
              }}
            />
            <Controller
              name={`skills.${idx}.levels.${levelIndex}.description`}
              control={methods.control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField fullWidth={true} value={value} onChange={onChange} />
              )}
            />
            <Button
              className={classes.deleteSkillBtn}
              variant="contained"
              endIcon={<AddRoundedIcon />}
              onClick={() => remove(levelIndex)}
            />
          </Box>
        ))}

        <AddButton className={classes.addButton} title="Add field" onClick={() => append(appendLevelValue)} />
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
