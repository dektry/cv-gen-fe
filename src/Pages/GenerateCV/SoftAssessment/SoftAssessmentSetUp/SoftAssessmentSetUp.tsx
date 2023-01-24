import { useEffect, useState, useMemo } from 'react';
import { useParams, generatePath } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useForm, useFieldArray, FormProvider, SubmitHandler, useWatch } from 'react-hook-form';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { softSkillsMatrixSelector, setIsAssessmentPage } from 'store/reducers/softSkillsMatrix';
import { softSkillAssessmentSelector } from 'store/reducers/softSkillAssessment';
import {
  getOneSoftAssessment,
  editSoftAssessment,
  completeSoftAssessment,
} from 'store/reducers/softSkillAssessment/thunks';
import { getOneSoftSkillsMatrix } from 'store/reducers/softSkillsMatrix/thunks';
import { employeesSelector } from 'store/reducers/employees';
import { loadEmployee } from 'store/reducers/employees/thunks';
import { levelsSelector, loadLevels } from 'store/reducers/levels';

import { IFormSoftSkillsMatrix } from 'models/ISoftSkillsMatrix';
import { ISoftAssessment, IFormSoftAssessmentResult, IFormSoftSkill } from 'models/ISoftAssessment';
import { IDBPosition, IDBLevels } from 'models/IUser';

import { SimpleTextModal } from 'common-components/SimpleTextModal';
import { SoftAssessmentSkill } from './components/SoftAssessmentSkill';
import { Spinner } from 'common-components/Spinner';
import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';
import { DatePositionLevelInfo } from 'common-components/DatePositionLevelInfo';

import { useStyles } from './styles';
import theme from 'theme/theme';
import paths from 'config/routes.json';

const sxProp: SxProps = [
  {
    background: () => theme.palette.primary.main,
    height: '56px',
    minWidth: '94px',
    maxWwidth: '185px',
    marginLeft: '8px',
    borderRadius: '100px',
    color: () => theme.palette.background.default,

    '&:hover': {
      cursor: 'pointer',
      background: () => theme.palette.primary.main,
      boxShadow:
        '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
    },
  },
];

export const SoftAssessmentSetUp = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles({ theme });

  const { id, levelId, positionId, assessmentId, matrixId } = useParams<{
    id: string;
    levelId: string;
    positionId: string;
    assessmentId: string;
    matrixId: string;
  }>();

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const { currentEmployee } = useSelector(employeesSelector);
  const { allLevels, levelsLoading } = useSelector(levelsSelector);
  const { assessmentResult, isLoading } = useSelector(softSkillAssessmentSelector);
  const { currentMatrix } = useSelector(softSkillsMatrixSelector);

  const [position, setPosition] = useState<IDBPosition>({} as IDBPosition);
  const [level, setLevel] = useState<IDBLevels>({} as IDBLevels);

  const defaultValues = assessmentResult?.id ? assessmentResult : currentMatrix;

  const methods = useForm({
    defaultValues: { matrix: defaultValues },
  });

  const values = useWatch({ control: methods.control });

  const isModified = methods.formState.isDirty;

  const { fields, update } = useFieldArray({
    name: 'matrix.skills',
    control: methods.control,
    keyName: 'fieldKey',
  });

  useEffect(() => {
    if (id) {
      dispatch(loadEmployee(id));
    }

    if (assessmentId) {
      dispatch(getOneSoftAssessment(assessmentId));
    }

    if (!allLevels.length && !assessmentId) {
      dispatch(loadLevels());
    }
  }, []);

  useEffect(() => {
    if (matrixId) {
      dispatch(getOneSoftSkillsMatrix(matrixId));
    }
    dispatch(setIsAssessmentPage(true));
  }, []);

  useEffect(() => {
    if (positionId && currentMatrix) {
      const currentLevel = allLevels.find((el) => el.id === levelId) as IDBLevels;

      setPosition(currentMatrix.position as IDBPosition);
      setLevel(currentLevel);
    }

    if (assessmentResult && assessmentResult.position && assessmentResult.level) {
      setPosition(assessmentResult.position);
      setLevel(assessmentResult.level);
    }
  }, [assessmentResult, allLevels.length, currentMatrix]);

  useEffect(() => {
    if (assessmentResult?.id) {
      const updatedValues = { matrix: assessmentResult };

      methods.reset({ ...updatedValues });
    } else {
      const updatedValues = { matrix: currentMatrix };
      methods.reset({ ...updatedValues });
    }
  }, [currentMatrix, assessmentResult]);

  const handleSaveMatrix: SubmitHandler<{ matrix: IFormSoftSkillsMatrix | ISoftAssessment }> = () => {
    const grades: { value: string; skillId: string; gradeId: string; comment: string }[] | undefined =
      values.matrix?.skills?.map((skill: IFormSoftSkill) => {
        return {
          gradeId: skill.currentSkillLevel?.id || uuidv4(),
          value: skill.currentLevel || skill.currentSkillLevel?.value || 'None',
          skillId: skill.id || '',
          comment: skill.currentSkillLevel?.comment || '',
        };
      });

    const result: IFormSoftAssessmentResult = {
      employeeId: id || '',
      levelId: levelId || assessmentResult?.level?.id || '',
      positionId: positionId || assessmentResult?.position?.id || '',
      grades,
    };
    if (assessmentId) {
      dispatch(editSoftAssessment({ assessment: result, assessmentId }));
    } else {
      dispatch(completeSoftAssessment(result));
    }
  };

  const handleResetModalOpen = () => {
    setIsResetModalOpen(true);
  };

  const handleResetModalClose = () => {
    setIsResetModalOpen(false);
  };

  const handleResetSubmit = () => {
    methods.reset();
    setIsResetModalOpen(false);
  };

  const handleSkillLevelChange = (idx: number, value: string) => {
    const currentSkill = fields[idx];
    update(idx, { ...currentSkill, currentLevel: value });
  };

  const personalData = useMemo(() => {
    return {
      firstName: currentEmployee.firstName,
      lastName: currentEmployee.lastName,
      location: currentEmployee.location,
      position: currentEmployee.position,
      level: currentEmployee.level,
    };
  }, [currentEmployee]);

  const backPath = generatePath(paths.softSkillAssessmentHistory, { id });

  if (isLoading || levelsLoading) return <Spinner text={'Loading page content...'} />;

  return (
    <>
      <EmployeeHeader personalData={personalData} backPath={backPath} />
      <DatePositionLevelInfo
        title={'SOFT ASSESSMENT'}
        date={assessmentResult?.created}
        position={position?.name}
        level={level?.name}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSaveMatrix)} className={classes.container}>
          {fields.map((skill, idx) => {
            return (
              <SoftAssessmentSkill
                skill={skill}
                key={skill.fieldKey}
                idx={idx}
                handleSkillLevelChange={handleSkillLevelChange}
              />
            );
          })}
          <div className={classes.buttonsContainer}>
            <Button onClick={handleResetModalOpen}>RESET CHANGES</Button>
            <Button sx={sxProp} type="submit" className={classes.saveButton} disabled={!isModified}>
              Save changes
            </Button>
          </div>
        </form>
      </FormProvider>

      <SimpleTextModal
        isOpen={isResetModalOpen}
        onClose={handleResetModalClose}
        onSubmit={handleResetSubmit}
        modalTitle={'RESET CHANGES'}
        modalText={'Are you sure you want to reset all changes made? All data will be lost.'}
      />
    </>
  );
};
