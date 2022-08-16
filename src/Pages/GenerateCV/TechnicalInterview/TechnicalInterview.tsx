import { PageNotFound } from 'components/Atoms/PageNotFound/PageNotFound';
import { Switch, Route } from 'react-router-dom';

import { paths } from 'routes/paths';
import { InterviewResults } from 'scenes/generateCV/TechnicalInterview/InterviewResults/InterviewResults';
import { InterviewSetUp } from 'scenes/generateCV/TechnicalInterview/InterviewSetUP/InterviewSetUp';

export const TechnicalInterview = () => {
  return (
    <Switch>
      <Route exact path={paths.generateCVtechnicalInterview}>
        <InterviewSetUp />
      </Route>
      <Route exact path={paths.generateCVtechnicalInterviewResult}>
        <InterviewResults />
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
};
