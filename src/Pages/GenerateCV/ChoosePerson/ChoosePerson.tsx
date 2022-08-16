import { Switch, Route } from 'react-router-dom';

import { PageNotFound } from 'components/Atoms/PageNotFound/PageNotFound';

import { paths } from 'routes/paths';
import { Candidate } from 'scenes/generateCV/ChoosePerson/Candidate/Candidate';
import { Candidates } from 'scenes/generateCV/ChoosePerson/Candidates/Candidates';
import { ListOfOptions } from 'scenes/generateCV/ChoosePerson/ListOfOptions/ListOfOptions';
import { Employees } from './Employees/Employees';
import { Employee } from './Employee/Employee';

export const ChoosePerson = () => {
  return (
    <Switch>
      <Route exact path={paths.generateCVchoosePerson}>
        <ListOfOptions />
      </Route>
      <Route exact path={paths.generateCVcandidateList}>
        <Candidates />
      </Route>
      <Route exact path={paths.candidate}>
        <Candidate />
      </Route>
      <Route exact path={paths.generateCVemployeesList}>
        <Employees />
      </Route>
      <Route exact path={paths.employee}>
        <Employee />
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
};
