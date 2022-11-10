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
}

const levelsOptions = Object.values(LevelTypesEnum).map((level) => ({
  label: level,
  value: level,
}));

export const ProfSkills = React.memo((props: IProfSkills) => {
  const { profSkills } = props;

  const classes = useStyles({ theme });

  const { isLoading } = useSelector(profSkillsSelector);

  const deferredLoading = useDeferredLoading(isLoading);

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
            return (
              <Form>
                <FieldArray
                  name="skillGroups"
                  render={(arrayHelpers) => (
                    <div>
                      {values &&
                        values.skillGroups.map((skillGroup, groupIndex) => (
                          <Accordion
                            className={classes.accordion}
                            disableGutters
                            TransitionProps={{ unmountOnExit: true }}
                            key={`skillGroups.${groupIndex}`}
                          >
                            <AccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon className={classes.icon} />}>
                              <SkillGroupField
                                value={skillGroup.groupName}
                                name={`skillGroups.${groupIndex}.groupName`}
                                onChange={handleChange}
                              />
                            </AccordionSummary>
                            <AccordionDetails>
                              <ProfSkillGroup
                                name={`skillGroups.${groupIndex}.skills`}
                                skillGroup={skillGroup}
                                groupIndex={groupIndex}
                                handleChange={handleChange}
                              />
                            </AccordionDetails>
                            <AccordionActions sx={{ justifyContent: 'space-between' }}>
                              <DeleteButton title="Delete section" onClick={() => arrayHelpers.remove(groupIndex)} />
                            </AccordionActions>
                          </Accordion>
                        ))}
                      <AddButton
                        title="Add new section"
                        sx={{ marginTop: '24px' }}
                        onClick={() => arrayHelpers.push({ groupName: '', skills: [] })}
                        disabled={deferredLoading}
                      />
                    </div>
                  )}
                />
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
