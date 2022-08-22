import { Routes, Route } from 'react-router-dom';
import { PageNotFound } from 'common-components/PageNotFound';

import paths from 'config/routes.json';
import { InterviewResults } from './InterviewResults';
import { InterviewSetUp } from './InterviewSetUP';

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
