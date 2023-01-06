import { useState, useMemo } from 'react';

import { useFormContext, Controller, useFieldArray, UseFieldArrayRemove } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { useSelector } from 'react-redux';
import { hardSkillsMatrixSelector } from 'store/reducers/hardSkillsMatrix';
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

import { pickStartLevel } from 'Pages/Settings/utils/helpers/pickStartLevel';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  idx: number;
  removeSection: UseFieldArrayRemove;
}

const startLevel = pickStartLevel();

export const AssessmentSkillGroup = ({ idx, removeSection }: IProps) => {
  const classes = useStyles({ theme });

  const [isDeleteGroupModalOpen, setIsDeleteGroupModalOpen] = useState(false);
  const [isDeleteSkillModalOpen, setIsDeleteSkillModalOpen] = useState(false);
  const [deletingSkillId, setDeletingSkillId] = useState(0);

  const { allLevels } = useSelector(levelsSelector);
  const { currentMatrix } = useSelector(hardSkillsMatrixSelector);

  const defaultGrades = useMemo(
    () => allLevels.map((level) => ({ value: startLevel, levelId: level.id })),
    [allLevels]
  );

  const defaultLevels = useMemo(
    () =>
      allLevels.map((level) => ({
        id: uuidv4(),
        value: startLevel,
        level_id: {
          id: level.id,
          name: level.name,
        },
      })),
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

  const appendSkillValue = currentMatrix.id
    ? { value: '', id: uuidv4(), levels: defaultLevels, questions: [] }
    : { value: '', questions: [], grades: defaultGrades };

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

        <AddButton className={classes.addButton} title="Add field" onClick={() => append(appendSkillValue)} />
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
