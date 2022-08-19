import { Routes, Route } from 'react-router-dom';

import { PageNotFound } from 'CommonComponents/PageNotFound';

import paths from 'config/routes.json';
import { Candidate } from '../ChoosePerson/Candidate';
import { Candidates } from '../ChoosePerson/Candidates';
import { ListOfOptions } from './ListOfOptions';
import { Employees } from './Employees/Employees';
import { Employee } from './Employee/Employee';

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
