import { useState } from 'react';

import { useFormContext, Controller, useFieldArray, UseFieldArrayRemove, useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/DeleteRounded';
import CloseIcon from '@mui/icons-material/Close';

import { ISkillGroup } from 'models/IHardSkillsMatrix';

import { SkillGroupField } from 'common-components/SkillGroupField';
import { DeleteButton } from 'common-components/DeleteButton';
import { DeleteModal } from 'common-components/DeleteModal';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { AddButton } from 'common-components/AddButton';
import { AssessmentSkillQuestions } from './components/AssessmentSkillQuestions';

interface IProps {
  skillGroup: ISkillGroup;
  idx: number;
  removeSection: UseFieldArrayRemove;
}

export const AssessmentSkillGroup = ({ skillGroup, idx, removeSection }: IProps) => {
  const classes = useStyles({ theme });

  const [isDeleteGroupModalOpen, setIsDeleteGroupModalOpen] = useState(false);
  const [isDeleteSkillModalOpen, setIsDeleteSkillModalOpen] = useState(false);
  const [deletingSkillId, setDeletingSkillId] = useState(0);

  const methods = useFormContext();

  const { control } = useForm({
    defaultValues: { skills: skillGroup.skills },
  });

  const { fields, remove, append, update } = useFieldArray({
    name: 'skills',
    control,
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
            <>
              <Controller
                name={`skills.${skillIndex}.value`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField label="Skill" value={value} onChange={onChange} />
                )}
              />
              <Button
                className={classes.deleteSkillBtn}
                variant="contained"
                endIcon={<AddRoundedIcon />}
                onClick={() => handleDeleteSkillModalOpen(skillIndex)}
              />

              <AssessmentSkillQuestions questions={skill.questions} />
            </>
          </Box>
        ))}

        <AddButton title="Add field" onClick={() => append({ value: '', questions: [] })} />
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
