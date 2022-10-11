import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { generatePath, useParams } from 'react-router-dom';
import { Input } from 'antd';

import { debounce, cloneDeep } from 'lodash';

import { Spin } from 'antd';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { employeesSelector, loadEmployee } from 'store/reducers/employees';
import { softSkillAssessmentSelector } from 'store/reducers/softSkillAssessment';
import { getOneSoftAssessment, loadSoftSkillsList } from 'store/reducers/softSkillAssessment/thunks';
import { positionsSelector, loadPositions } from 'store/reducers/positions';
import { levelsSelector, loadLevels } from 'store/reducers/levels';
import { editSoftAssessment, completeSoftAssessment, softSkillScores } from 'store/reducers/softSkillAssessment/thunks';

import paths from 'config/routes.json';

import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';
import { AssessmentPositions } from 'Pages/GenerateCV/common-components/AssessmentPositions';
import { ISoftAssessment } from 'models/ISoftAssessment';

import { SkillCard } from './components/SkillCard';

import { useStyles } from './styles';

const { TextArea } = Input;

export const SoftAssessmentSetUp = () => {
  const dispatch = useAppDispatch();

  const { id, levelId, positionId, assessmentId } = useParams<{
    id: string;
    levelId: string;
    positionId: string;
    assessmentId: string;
  }>();

  const classes = useStyles();

  const { currentEmployee } = useSelector(employeesSelector);
  const { allPositions, positionsLoading } = useSelector(positionsSelector);
  const { allLevels, levelsLoading } = useSelector(levelsSelector);
  const { assessmentResult, isLoading, softSkillsList } = useSelector(softSkillAssessmentSelector);

  const [position, setPosition] = useState('');
  const [level, setLevel] = useState('');

  const [currentAssessment, setCurrentAssessment] = useState({} as ISoftAssessment);
  const [comment, setComment] = useState(assessmentResult?.comment || '');

  const currentPosition = useMemo(
    () => allPositions.filter((el) => el.id === positionId)[0],
    [allPositions, positionId]
  );
  const currentLevel = useMemo(() => allLevels.filter((el) => el.id === levelId)[0], [allLevels, levelId]);

  useEffect(() => {
    if (assessmentResult) {
      setCurrentAssessment(assessmentResult);
    }
  }, [assessmentResult]);

  useEffect(() => {
    if (positionId && levelId) {
      setPosition(positionId);
      setLevel(levelId);
    }

    if (assessmentResult?.position?.id && assessmentResult?.level?.id) {
      setPosition(assessmentResult.position.id);
      setLevel(assessmentResult.level.id);
    }
  }, [positionId, levelId, assessmentResult]);

  useEffect(() => {
    if (id) {
      dispatch(loadEmployee(id));
      dispatch(loadPositions());
      dispatch(loadLevels());
      dispatch(loadSoftSkillsList());
      dispatch(softSkillScores());
    }

    if (assessmentId) {
      dispatch(getOneSoftAssessment(assessmentId));
    }
  }, [id, level, position, assessmentId]);

  useEffect(() => {
    if (currentLevel) {
      setCurrentAssessment({
        ...currentAssessment,
        level: currentLevel,
      });
    }

    if (currentPosition) {
      setCurrentAssessment({
        ...currentAssessment,
        position: currentPosition,
      });
    }

    if (softSkillsList.length) {
      setCurrentAssessment({
        ...currentAssessment,
        softSkills: softSkillsList,
      });
    }
  }, [currentLevel, currentPosition, softSkillsList.length]);

  const debouncedFeedback = useRef(
    debounce((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      const softskillsInterviewCopy = cloneDeep(currentAssessment);
      softskillsInterviewCopy.comment = value;
      if (id) {
        softskillsInterviewCopy.employeeId = id;
      }
      currentAssessment?.successfullySaved
        ? dispatch(editSoftAssessment(softskillsInterviewCopy))
        : dispatch(completeSoftAssessment(softskillsInterviewCopy));
    }, 600)
  ).current;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
      debouncedFeedback(e);
    },
    [debouncedFeedback]
  );

  const personalData = useMemo(() => {
    return {
      fullName: currentEmployee.fullName,
      location: currentEmployee.location,
      position: currentEmployee.position,
      level: currentEmployee.level,
    };
  }, [currentEmployee]);

  const backPath = generatePath(paths.generateCVsoftSkillAssessmentHistory, { id });

  if (isLoading || levelsLoading || positionsLoading) return <Spin size="large" tip={'Loading page content...'} />;

  return (
    <>
      <EmployeeHeader personalData={personalData} backPath={backPath} />
      <AssessmentPositions
        position={currentPosition || assessmentResult?.position}
        level={currentLevel || assessmentResult?.level}
      />
      {currentAssessment.softSkills?.map((skill) => (
        <SkillCard
          skill={skill}
          currentAssessment={currentAssessment}
          employeeId={String(id)}
          setCurrentAssessment={setCurrentAssessment}
        />
      ))}
      <TextArea
        id="comment"
        rows={2}
        placeholder="Feedback field"
        className={classes.textArea}
        onChange={handleChange}
        value={comment}
      />
    </>
  );
};
