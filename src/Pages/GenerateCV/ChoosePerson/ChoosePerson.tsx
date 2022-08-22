import { Routes, Route } from 'react-router-dom';

import { PageNotFound } from 'common-components/PageNotFound';

import paths from 'config/routes.json';
import { Candidate } from '../ChoosePerson/Candidate';
import { Candidates } from '../ChoosePerson/Candidates';
import { ListOfOptions } from '../ChoosePerson/ListOfOptions';
import { Employees } from '../ChoosePerson/Employees';
import { Employee } from '../ChoosePerson/Employee';

export const ChoosePerson = () => {
  return (
    <Routes>
      <Route path={paths.generateCVchoosePerson}>
        <ListOfOptions />
      </Route>
      <Route path={paths.generateCVcandidateList}>
        <Candidates />
      </Route>
      <Route path={paths.candidate}>
        <Candidate />
      </Route>
      <Route path={paths.generateCVemployeesList}>
        <Employees />
      </Route>
      <Route path={paths.employee}>
        <Employee />
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Routes>
  );
};
