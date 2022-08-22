import { useEffect, useMemo } from 'react';
import {
  generatePath,
  Link,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import paths from 'config/routes.json';
import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { useSelector } from 'react-redux';
import { interviewSelector } from 'store/reducers/interview';
import { candidatesSelector } from 'store/reducers/candidates';
import { InterviewForm } from 'pages/InterviewForm';
import { Button } from 'antd';
import { CandidatePopOver } from 'pages/GenerateCV/ChoosePerson/Candidate';
import { useStyles } from './styles';

export const InterviewSetUp = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentCandidate } = useSelector(candidatesSelector);
  const { id } = useParams<{ id: string }>();
  const { interviewResult } = useSelector(interviewSelector);

  const isResultPage = useMemo(
    () => pathname === paths.interview_result,
    [pathname],
  );

  useEffect(() => {
    if (interviewResult && !isResultPage)
    navigate(
        generatePath(paths.generateCVtechnicalInterview, {
          id,
        }),
      );
    if (!interviewResult && isResultPage)
    navigate(
        generatePath(paths.generateCVtechnicalInterviewResult, {
          id,
        }),
      );
  }, [id, history, interviewResult, isResultPage]);

  return (
    <>
      <GenerateCvHeader backPath={paths.candidate.replace(':id', id ? id : '')}>
        <CandidatePopOver />
      </GenerateCvHeader>
      <InterviewForm />
      <Button
        className={classes.linkToResults}
        type="primary"
        disabled={!interviewResult?.answers}
      >
        <Link
          to={generatePath(paths.generateCVtechnicalInterviewResult, {
            candidateId: currentCandidate.id,
          })}
        >
          See results
        </Link>
      </Button>
    </>
  );
};
