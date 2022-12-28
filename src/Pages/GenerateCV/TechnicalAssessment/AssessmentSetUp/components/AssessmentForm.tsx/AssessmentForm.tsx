import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { hardSkillsMatrixSelector } from 'store/reducers/hardSkillsMatrix';
import { editTechAssessment, finishTechAssessment, techAssessmentSelector } from 'store/reducers/techAssessment';
import { editHardSkillsMatrix } from 'store/reducers/hardSkillsMatrix/thunks';

import { useForm, useWatch, useFieldArray, Controller, FormProvider } from 'react-hook-form';
import { SkillGroupField } from 'common-components/SkillGroupField';
import { CustomSelect } from 'common-components/CustomSelect';
import { SkillQuestions } from './components/SkillQuestions';
import { SaveButton } from 'common-components/SaveButton';

import { LevelTypesEnum } from 'models/IInterview';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { IFormHardSkillsMatrix } from 'models/IHardSkillsMatrix';
import { IAssessmentDetailedResult, IAssessmentDetailedSkill, IFormAssessmentResult } from 'models/ITechAssessment';

const levelsOptions = Object.values(LevelTypesEnum).map((level) => ({
  label: level,
  value: level,
}));

export const AssessmentForm = () => {
  const { id, levelId, positionId, assessmentId } = useParams<{
    id: string;
    levelId: string;
    positionId: string;
    assessmentId: string;
  }>();

  const dispatch = useAppDispatch();

  const [isAnyQuestionChanged, setIsAnyQuestionChanged] = useState(false);

  const classes = useStyles({ theme });

  const { currentMatrix } = useSelector(hardSkillsMatrixSelector);
  const { assessmentResult } = useSelector(techAssessmentSelector);

  const methods = useForm({
    // Type cast here used to avoid meaningless convertation hard skills matrix into assessment result interface structure.
    // It is meaningless because we have to add just few empty fields to whole matrix and to the every skill.
    defaultValues: { matrix: currentMatrix as IAssessmentDetailedResult, comment: '' },
  });

  useEffect(() => {
    if (assessmentResult?.position) {
      const defaultValues = { matrix: assessmentResult, comment: assessmentResult.comment };
      methods.reset({ ...defaultValues });
    } else {
      const defaultValues = { matrix: currentMatrix, comment: '' };
      methods.reset({ ...defaultValues });
    }
  }, [currentMatrix, assessmentResult]);

  const values = useWatch({ control: methods.control });

  const { fields } = useFieldArray({
    name: 'matrix.skillGroups',
    control: methods.control,
    keyName: 'skillGroupKey',
  });

  const handleSaveClick = () => {
    const allSkills: IAssessmentDetailedSkill[] = [];
    values.matrix?.skillGroups?.forEach((group) => group.skills?.forEach((skill) => allSkills.push(skill)));
    const grades: { value: string; skillId: string }[] = allSkills.map((skill) => ({
      value: skill.currentSkillLevel?.value || 'None',
      skillId: skill.id || '',
    }));

    const result: IFormAssessmentResult = {
      employeeId: id || '',
      levelId: levelId || '',
      positionId: positionId || '',
      comment: values.comment || '',
      grades,
    };
    if (isAnyQuestionChanged) {
      const requestBody = {
        matrix: values.matrix || ([] as IFormHardSkillsMatrix),
        positionId: values.matrix?.position?.id || '',
        isAssessmentPage: true,
      };
      dispatch(editHardSkillsMatrix(requestBody));
    }
    if (assessmentId) {
      dispatch(editTechAssessment({ assessment: result, id: assessmentId }));
    } else {
      dispatch(finishTechAssessment(result));
    }
  };

  return (
    <FormProvider {...methods}>
      {fields.map((group, groupIndex) => {
        return (
          <div className={classes.container} key={group.skillGroupKey}>
            <SkillGroupField sx={{ marginBottom: '16px' }} value={group.value} />
            {group.skills?.map((skill, skillIndex) => {
              return (
                <Box key={skill.id} className={classes.skill}>
                  <div className={classes.skillUpperContainer}>
                    <Typography className={classes.skillValue} variant="h3">
                      {skill.value}
                    </Typography>
                    <Controller
                      name={`matrix.skillGroups.${groupIndex}.skills.${skillIndex}.currentSkillLevel.value`}
                      control={methods.control}
                      render={({ field: { value, onChange } }) => {
                        return (
                          <CustomSelect
                            value={value || levelsOptions[0].value}
                            options={levelsOptions}
                            sx={{ width: '220px' }}
                            onChange={onChange}
                          />
                        );
                      }}
                    />
                  </div>
                  <SkillQuestions
                    skillGroupIndex={groupIndex}
                    skillIndex={skillIndex}
                    setIsAnyQuestionChanged={setIsAnyQuestionChanged}
                  />
                </Box>
              );
            })}
          </div>
        );
      })}
      <Controller
        name="comment"
        control={methods.control}
        render={({ field: { value, onChange } }) => {
          return <TextField value={value} onChange={onChange} label={'Comment'} />;
        }}
      />
      <div className={classes.buttonsContainer}>
        <Button onClick={() => methods.reset()}>Reset</Button>
        <SaveButton title="Save changes & finish interview" error={false} handleClickOkButton={handleSaveClick} />
      </div>
    </FormProvider>
  );
};
