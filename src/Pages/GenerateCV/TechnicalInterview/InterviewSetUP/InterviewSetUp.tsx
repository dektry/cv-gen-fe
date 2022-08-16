import { useEffect, useMemo } from 'react';
import {
  generatePath,
  Link,
  matchPath,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import { paths } from 'routes/paths';
import { GenerateCvHeader } from 'components/Molecules/GenerateCVHeader/CvHeader';
import { useSelector } from 'react-redux';
import { interviewSelector } from 'store/interview';
import { candidatesSelector } from 'store/candidates';
import { useStyles } from './styles';
import { InterviewForm } from 'components/Molecules/InterviewForm/InterviewForm';
import { Button } from 'antd';
import { CandidatePopOver } from 'scenes/generateCV/ChoosePerson/Candidate/CandidatePopOver';

export const InterviewSetUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const { currentCandidate } = useSelector(candidatesSelector);
  const { id } = useParams<{ id: string }>();
  const { interviewResult } = useSelector(interviewSelector);

  const isResultPage = useMemo(
    () => matchPath(pathname, paths.interview_result)?.isExact,
    [pathname],
  );

  useEffect(() => {
    if (interviewResult && !isResultPage)
      history.push(
        generatePath(paths.generateCVtechnicalInterview, {
          id,
        }),
      );
    if (!interviewResult && isResultPage)
      history.push(
        generatePath(paths.generateCVtechnicalInterviewResult, {
          id,
        }),
      );
  }, [id, history, interviewResult, isResultPage]);

  return (
    <>
      <GenerateCvHeader backPath={paths.candidate.replace(':id', id)}>
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
