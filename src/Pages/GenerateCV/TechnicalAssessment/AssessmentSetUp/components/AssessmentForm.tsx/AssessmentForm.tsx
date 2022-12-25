import { useEffect } from 'react';
import { useNavigate, generatePath, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { hardSkillsMatrixSelector } from 'store/reducers/hardSkillsMatrix';
import { finishTechAssessment } from 'store/reducers/techAssessment';

import { useForm, useWatch, useFieldArray, Controller, FormProvider } from 'react-hook-form';
import { SkillGroupField } from 'common-components/SkillGroupField';
import { CustomSelect } from 'common-components/CustomSelect';
import { SkillQuestions } from './components/SkillQuestions';
import { SaveButton } from 'common-components/SaveButton';

import { LevelTypesEnum } from 'models/IInterview';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { IFormSkill } from 'models/IHardSkillsMatrix';
import { IFormAssessmentResult } from 'models/ITechAssessment';
import paths from 'config/routes.json';

const levelsOptions = Object.values(LevelTypesEnum).map((level) => ({
  label: level,
  value: level,
}));

export const AssessmentForm = () => {
  const { id, levelId, positionId } = useParams<{
    id: string;
    levelId: string;
    positionId: string;
  }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const classes = useStyles({ theme });

  const { currentMatrix } = useSelector(hardSkillsMatrixSelector);

  const methods = useForm({
    defaultValues: { matrix: currentMatrix, comment: '' },
  });

  useEffect(() => {
    const defaultValues = { matrix: currentMatrix, comment: '' };
    methods.reset({ ...defaultValues });
  }, [currentMatrix]);

  const values = useWatch({ control: methods.control });

  const { fields } = useFieldArray({
    name: 'matrix.skillGroups',
    control: methods.control,
    keyName: 'skillGroupKey',
  });

  const handleSaveClick = () => {
    const allSkills: IFormSkill[] = [];
    values.matrix?.skillGroups?.forEach((group) => group.skills?.forEach((skill) => allSkills.push(skill)));
    const grades: { value: string; skillId: string }[] = allSkills.map((skill) => ({
      value: skill.currentLevel || '',
      skillId: skill.id || '',
    }));

    const result: IFormAssessmentResult = {
      employeeId: id || '',
      levelId: levelId || '',
      positionId: positionId || '',
      comment: values.comment || '',
      grades,
    };

    dispatch(finishTechAssessment(result));
    navigate(generatePath(paths.technicalAssessmentHistory, { id }));
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
                      name={`matrix.skillGroups.${groupIndex}.skills.${skillIndex}.currentLevel`}
                      control={methods.control}
                      render={({ field: { value, onChange } }) => {
                        return (
                          <CustomSelect
                            value={value}
                            options={levelsOptions}
                            sx={{ width: '220px' }}
                            onChange={onChange}
                          />
                        );
                      }}
                    />
                  </div>
                  <SkillQuestions skillGroupIndex={groupIndex} skillIndex={skillIndex} />
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
