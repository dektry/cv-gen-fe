import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { softSkillAssessmentSelector, setAssessmentsComparison } from 'store/reducers/softSkillAssessment';
import { getSoftAssessmentsComparison } from 'store/reducers/softSkillAssessment/thunks';

import Typography from '@mui/material/Typography';

import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { Spinner } from 'common-components/Spinner';
import { AssessmentsComparisonTable } from 'Pages/GenerateCV/common-components/AssessmentsComparisonTable';

import paths from 'config/routes.json';

export const SoftAssessmentsComparison = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const { isLoading, assessmentsComparison } = useSelector(softSkillAssessmentSelector);

  useEffect(() => {
    if (id) {
      dispatch(getSoftAssessmentsComparison(id));
    }
  }, []);

  useEffect(() => {
    return () => {
      setAssessmentsComparison(null);
    };
  }, []);

  if (isLoading) return <Spinner text={'Assessments comparison information is loading'} />;

  return (
    <>
      <GenerateCvHeader backPath={paths.softSkillAssessmentHistory.replace(':id', id as string)} />
      <Typography variant="h2">COMPARISON TABLE</Typography>
      {assessmentsComparison && (
        <AssessmentsComparisonTable assessments={assessmentsComparison} showGroupName={false} />
      )}
    </>
  );
};
