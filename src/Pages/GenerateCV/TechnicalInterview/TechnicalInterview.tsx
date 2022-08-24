import { Routes, Route } from 'react-router-dom';

import paths from 'config/routes.json';
import { InterviewResults } from './InterviewResults';
import { InterviewSetUp } from './InterviewSetUP';

export const TechnicalInterview = () => {
  return (
    <Routes>
      <Route path={paths.generateCVtechnicalInterview} element={<InterviewSetUp />} />
      <Route path={paths.generateCVtechnicalInterviewResult} element={<InterviewResults />} />
    </Routes>
  );
};
