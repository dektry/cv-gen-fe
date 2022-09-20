import { useEffect, useMemo } from 'react';

import { generatePath, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button, Spin } from 'antd';

import { useAppDispatch } from 'store';
import { candidatesSelector, loadOneCandidate } from 'store/reducers/candidates';
import { loadPositions, positionsSelector } from 'store/reducers/positions';
import { loadInterviewResult, interviewSelector } from 'store/reducers/interview';
import { loadLevels, levelsSelector } from 'store/reducers/levels';

import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { InterviewForm } from 'Pages/GenerateCV/TechnicalInterview/InterviewSetUP/components/InterviewForm';
import { CandidatePopOver } from '../../common-components/PopOver';

import { GenerateCV } from '../../common-components/GenerateCv';

import paths from 'config/routes.json';
import { useStyles } from './styles';

export const InterviewSetUp = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();

  const { currentCandidate, isLoadingOneCandidate } = useSelector(candidatesSelector);
  const { allPositions, skillMatrix } = useSelector(positionsSelector);
  const { allLevels, levelsSchema } = useSelector(levelsSelector);
  const {
    interviewResult,
    isLoading: isLoadingInterviewResult,
    isLoadingInterviewMatrix,
  } = useSelector(interviewSelector);

  const isResultPage = useMemo(() => pathname === paths.interview_result, [pathname]);

  useEffect(() => {
    if (interviewResult && !isResultPage)
      navigate(
        generatePath(paths.generateCVtechnicalInterview, {
          id,
        })
      );
    if (!interviewResult && isResultPage)
      navigate(
        generatePath(paths.generateCVtechnicalInterviewResult, {
          id,
        })
      );
  }, [id, history, interviewResult, isResultPage]);
  useEffect(() => {
    if (id) {
      dispatch(loadOneCandidate(id));
      dispatch(loadInterviewResult(id));

      dispatch(loadPositions());
      dispatch(loadLevels());
    }
  }, [dispatch, id]);

  if (isLoadingOneCandidate || isLoadingInterviewResult) return <Spin size="large" tip={'Loading interview...'} />;

  return (
    <>
      <GenerateCV />
      <GenerateCvHeader backPath={paths.candidate.replace(':id', id ? id : '')}>
        <CandidatePopOver />
      </GenerateCvHeader>
      <InterviewForm
        currentCandidate={currentCandidate}
        allPositions={allPositions}
        allLevels={allLevels}
        skillMatrix={skillMatrix}
        levelsSchema={levelsSchema}
        isLoadingInterviewMatrix={isLoadingInterviewMatrix}
      />
      <Button className={classes.linkToResults} type="primary" disabled={!interviewResult?.answers}>
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
