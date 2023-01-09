import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { techAssessmentSelector, setAssessmentsComparison } from 'store/reducers/techAssessment';
import { getTechAssessmentsComparison } from 'store/reducers/techAssessment/thunks';

import Typography from '@mui/material/Typography';

import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { Spinner } from 'common-components/Spinner';
import { AssessmentsComparisonTable } from 'Pages/GenerateCV/common-components/AssessmentsComparisonTable';

import paths from 'config/routes.json';

export const TechAssessmentsComparison = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const { isLoading, assessmentsComparison } = useSelector(techAssessmentSelector);

  useEffect(() => {
    if (id) {
      dispatch(getTechAssessmentsComparison(id));
    }
  }, []);

  useEffect(() => {
    return () => {
      setAssessmentsComparison(null);
    };
  });

  if (isLoading) return <Spinner text={'Assessments comparison information is loading'} />;

  return (
    <>
      <GenerateCvHeader backPath={paths.technicalAssessmentHistory.replace(':id', id as string)} />
      <Typography variant="h2">COMPARISON TABLE</Typography>
      {assessmentsComparison && <AssessmentsComparisonTable assessments={assessmentsComparison} />}
    </>
  );
};
