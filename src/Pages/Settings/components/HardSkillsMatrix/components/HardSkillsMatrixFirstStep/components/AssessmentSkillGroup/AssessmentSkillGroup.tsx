import { useState, useMemo } from 'react';
import { useFormContext, Controller, useFieldArray, UseFieldArrayRemove, useWatch } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { range } from 'lodash';

import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { useSelector } from 'react-redux';
import { hardSkillsMatrixSelector } from 'store/reducers/hardSkillsMatrix';
import { levelsSelector } from 'store/reducers/levels';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/DeleteRounded';
import DragHandleIcon from '@mui/icons-material/DragHandle';

import { SkillGroupField } from 'common-components/SkillGroupField';
import { DeleteButton } from 'common-components/DeleteButton';
import { DeleteModal } from 'common-components/DeleteModal';
import { AddButton } from 'common-components/AddButton';
import { CustomTextField } from 'common-components/CustomTextField';
import { AssessmentSkillQuestions } from '../AssessmentSkillQuestions';

import { pickStartLevel } from 'Pages/Settings/utils/helpers/pickStartLevel';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { IFormSkill, IFormSkillGroup } from 'models/IHardSkillsMatrix';

interface IProps {
  idx: number;
  id: string;
  removeSection: UseFieldArrayRemove;
  setIsModified: React.Dispatch<React.SetStateAction<boolean>>;
}

const startLevel = pickStartLevel();

export const AssessmentSkillGroup = ({ idx, id, removeSection, setIsModified }: IProps) => {
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

  const values = useWatch({ control: methods.control });

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
    ? {
        value: '',
        id: uuidv4(),
        levels: defaultLevels,
        questions: [],
        order: values.skillGroups[idx].skills.length || 0,
      }
    : { value: '', questions: [], grades: defaultGrades, order: values.skillGroups[idx].skills.length || 0 };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const directionOfDrag = destination.index > source.index ? 'GREATER' : 'LESS';
    let affectedRange: number[];

    if (directionOfDrag === 'GREATER') {
      affectedRange = range(source.index, destination.index + 1);
    } else if (directionOfDrag === 'LESS') {
      affectedRange = range(destination.index, source.index);
    }

    const reOrderedSkillsList = values.skillGroups[idx]?.skills?.map((skill: IFormSkill) => {
      if (skill.id === result.draggableId) {
        skill.order = result.destination?.index;
        return skill;
      } else if (affectedRange.includes(Number(skill.order))) {
        if (directionOfDrag === 'GREATER') {
          skill.order = (skill.order as number) - 1;

          return skill;
        } else if (directionOfDrag === 'LESS') {
          skill.order = (skill.order as number) + 1;
          return skill;
        }
      } else {
        return skill;
      }
    });

    (reOrderedSkillsList as IFormSkill[]).sort((a, b) => Number(a.order) - Number(b.order));

    const newSkillGroups = values.skillGroups?.map((group: IFormSkillGroup, id: number) => {
      if (id === idx) {
        group.skills = reOrderedSkillsList;
        return group;
      } else {
        return group;
      }
    });

    const defaultValues = { skillGroups: newSkillGroups };
    methods.reset({ ...defaultValues });
    setIsModified(true);
  };

  return (
    <>
      <Draggable draggableId={id} index={idx} key={idx}>
        {(provided) => (
          <div className={classes.container} {...provided.draggableProps} ref={provided.innerRef}>
            <div {...provided.dragHandleProps} className={classes.dragNDropIcon}>
              <div className={classes.line}></div>
              <div className={classes.line}></div>
            </div>

            <div className={classes.header}>
              <Controller
                name={`skillGroups.${idx}.value`}
                control={methods.control}
                render={({ field: { value, onChange } }) => <SkillGroupField value={value} onChange={onChange} />}
              />
              <DeleteButton title={'Delete section'} onClick={handleDeleteGroupModalOpen} />
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="AssessmentSkillGroup">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {fields.map((skill, skillIndex) => (
                      <Draggable draggableId={skill.skillKey} index={skillIndex} key={skill.skillKey}>
                        {(provided) => (
                          <Box
                            key={skill.skillKey}
                            className={classes.skill}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                          >
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
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <AddButton className={classes.addButton} title="Add field" onClick={() => append(appendSkillValue)} />
          </div>
        )}
      </Draggable>
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
