import { useState, useMemo } from 'react';

import { useFormContext, Controller, useFieldArray, UseFieldArrayRemove } from 'react-hook-form';

import { useSelector } from 'react-redux';
import { levelsSelector } from 'store/reducers/levels';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/DeleteRounded';

import { SkillGroupField } from 'common-components/SkillGroupField';
import { DeleteButton } from 'common-components/DeleteButton';
import { DeleteModal } from 'common-components/DeleteModal';
import { AddButton } from 'common-components/AddButton';
import { CustomTextField } from 'common-components/CustomTextField';
import { AssessmentSkillQuestions } from '../AssessmentSkillQuestions';

import { piskStartLevel } from './utils/helpers/pickStartLevel';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  idx: number;
  removeSection: UseFieldArrayRemove;
}

const startLevel = piskStartLevel();

export const AssessmentSkillGroup = ({ idx, removeSection }: IProps) => {
  const classes = useStyles({ theme });

  const [isDeleteGroupModalOpen, setIsDeleteGroupModalOpen] = useState(false);
  const [isDeleteSkillModalOpen, setIsDeleteSkillModalOpen] = useState(false);
  const [deletingSkillId, setDeletingSkillId] = useState(0);

  const { allLevels } = useSelector(levelsSelector);

  const defaultGrades = useMemo(
    () => allLevels.map((level) => ({ value: startLevel, levelId: level.id })),
    [allLevels]
  );

  const methods = useFormContext();

  const { fields, remove, append } = useFieldArray({
    name: `skillGroups.${idx}.skills`,
    control: methods.control,
    keyName: 'skillKey',
  });

  const handleDeleteGroupModalOpen = () => {
    setIsDeleteGroupModalOpen(true);
  };

  const handleDeleteGroupModalClose = () => {
    setIsDeleteGroupModalOpen(false);
  };

  const handleConfirmGroupDelete = () => {
    removeSection(idx);
    setIsDeleteGroupModalOpen(false);
  };

  const handleDeleteSkillModalOpen = (id: number) => {
    setDeletingSkillId(id);
    setIsDeleteSkillModalOpen(true);
  };

  const handleDeleteSkillModalClose = () => {
    setIsDeleteSkillModalOpen(false);
  };

  const handleConfirmSkillDelete = () => {
    remove(deletingSkillId);
    setIsDeleteSkillModalOpen(false);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <Controller
            name={`skillGroups.${idx}.value`}
            control={methods.control}
            render={({ field: { value, onChange } }) => <SkillGroupField value={value} onChange={onChange} />}
          />
          <DeleteButton title={'Delete section'} onClick={handleDeleteGroupModalOpen} />
        </div>

        {fields.map((skill, skillIndex) => (
          <Box key={skill.skillKey} className={classes.skill}>
            <Controller
              name={`skillGroups.${idx}.skills.${skillIndex}.value`}
              control={methods.control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField fullWidth={true} value={value} onChange={onChange} />
              )}
            />
            <Button
              className={classes.deleteSkillBtn}
              variant="contained"
              endIcon={<AddRoundedIcon />}
              onClick={() => handleDeleteSkillModalOpen(skillIndex)}
            />

            <AssessmentSkillQuestions groupIndex={idx} skillIndex={skillIndex} />
          </Box>
        ))}

        <AddButton
          className={classes.addButton}
          title="Add field"
          onClick={() => append({ value: '', questions: [], grades: defaultGrades })}
        />
      </div>
      <DeleteModal
        isOpen={isDeleteGroupModalOpen}
        onClose={handleDeleteGroupModalClose}
        onSubmit={handleConfirmGroupDelete}
        modalTitle={'DELETE SECTION'}
        modalText={'Are you sure you want to delete this section? All data will be lost'}
      />

      <DeleteModal
        isOpen={isDeleteSkillModalOpen}
        onClose={handleDeleteSkillModalClose}
        onSubmit={handleConfirmSkillDelete}
        modalTitle={'DELETE SKILL'}
        modalText={'Are you sure you want to delete this skill? All data will be lost'}
      />
    </>
  );
};
