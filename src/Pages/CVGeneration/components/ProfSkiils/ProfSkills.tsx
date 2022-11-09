import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Box, LinearProgress, Typography } from '@mui/material';
import { throttle } from 'lodash';

import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, TextField } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { SkillGroupField } from 'common-components/SkillGroupField';
import { CustomSelect } from 'common-components/CustomSelect';
import { DeleteButton } from 'common-components/DeleteButton';

import { Formik, FieldArray, Form } from 'formik';

import { CvInfo, TProfSkill } from 'Pages/CVGeneration/CVGenerationPage';
import { AddButton } from 'common-components/AddButton';
import { profSkillsSelector } from 'store/reducers/cvGeneration';
import { useDeferredLoading } from 'hooks/useDeferredLoading';
import { ProfSkillGroup } from 'Pages/CVGeneration/components/ProfSkiils/ProfSkillGroup';
import { LevelTypesEnum } from 'models/IInterview';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProfSkills {
  profSkills: TProfSkill[];
  updateCvInfo: (fields: Partial<CvInfo>) => void;
}

const levelsOptions = Object.values(LevelTypesEnum).map((level) => ({
  label: level,
  value: level,
}));

export const ProfSkills = React.memo((props: IProfSkills) => {
  const { profSkills, updateCvInfo } = props;

  const classes = useStyles({ theme });

  const { isLoading } = useSelector(profSkillsSelector);

  const deferredLoading = useDeferredLoading(isLoading);

  const handleAddSkillGroup = () => {
    const newProfSkills = [...profSkills];
    newProfSkills.push({ groupName: '', skills: [] });
    updateCvInfo({ profSkills: newProfSkills });
  };

  const handleDeleteSkillGroup = (groupIndex: number) => {
    const newProfSkills = [...profSkills];
    newProfSkills.splice(groupIndex, 1);
    updateCvInfo({ profSkills: newProfSkills });
  };

  const updateCvInfoThrottled = useCallback(throttle(updateCvInfo, 700), [updateCvInfo]);

  return (
    <Box>
      <Typography variant="h2" sx={{ marginBottom: '24px' }}>
        PROFESSIONAL SKILLS
      </Typography>
      {deferredLoading ? (
        <LinearProgress></LinearProgress>
      ) : profSkills && profSkills.length ? (
        <Formik initialValues={{ skillGroups: profSkills }} onSubmit={(values) => console.log(values)}>
          {({ values, handleChange }) => {
            console.log(values);

            return (
              <Form>
                <FieldArray name="skillGroups">
                  {({ insert, remove, push }) => (
                    <div>
                      {values &&
                        values.skillGroups.map((skillGroup, groupIndex) => (
                          <Accordion
                            className={classes.accordion}
                            disableGutters
                            TransitionProps={{ unmountOnExit: true }}
                          >
                            <AccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon className={classes.icon} />}>
                              <SkillGroupField
                                name={`skillGroups.${groupIndex}.groupName`}
                                value={skillGroup.groupName}
                                onChange={handleChange}
                              />
                            </AccordionSummary>
                            <AccordionDetails>
                              <FieldArray name="skillGroup">
                                {({ insert, remove, push }) => (
                                  <>
                                    {skillGroup.skills.map((skill, skillIndex) => (
                                      <Box key={'skill' + groupIndex + skillIndex} className={classes.skill}>
                                        <TextField
                                          label="Skill"
                                          name={`skillGroup.${skillIndex}.name`}
                                          value={skill.name}
                                          onChange={handleChange}
                                        />
                                        <CustomSelect
                                          value={skill.level}
                                          options={levelsOptions}
                                          sx={{ width: '220px' }}
                                          onChange={handleChange}
                                          name={`skillGroup.${skillIndex}.level`}
                                        />
                                        <Button
                                          className={classes.deleteSkillBtn}
                                          variant="contained"
                                          endIcon={<AddRoundedIcon />}
                                          onClick={() => remove(skillIndex)}
                                        />
                                      </Box>
                                    ))}
                                    <AddButton title="Add field" onClick={() => push({ name: '', level: '' })} />
                                  </>
                                )}
                              </FieldArray>
                            </AccordionDetails>
                            <AccordionActions sx={{ justifyContent: 'space-between' }}>
                              <DeleteButton title="Delete section" onClick={() => remove(groupIndex)} />
                            </AccordionActions>
                          </Accordion>
                        ))}
                      <AddButton
                        title="Add new section"
                        sx={{ marginTop: '24px' }}
                        onClick={() => push({ groupName: '', skills: [] })}
                        disabled={deferredLoading}
                      />
                    </div>
                  )}
                </FieldArray>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <div></div>
      )}
    </Box>
  );
});
