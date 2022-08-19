import { Routes, Route } from 'react-router-dom';
import { PageNotFound } from 'CommonComponents/PageNotFound';

import paths from 'config/routes.json';
import { InterviewResults } from './InterviewResults';
import { InterviewSetUp } from './InterviewSetUP/InterviewSetUp';

export const TechnicalInterview = () => {
  return (
    <Routes>
      <Route path={paths.generateCVtechnicalInterview}>
        <InterviewSetUp />
      </Route>
      <Route path={paths.generateCVtechnicalInterviewResult}>
        <InterviewResults />
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Routes>
  );
};
