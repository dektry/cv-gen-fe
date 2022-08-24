import { Routes, Route } from 'react-router-dom';

import routes from 'config/routes.json';
import { Candidate } from '../ChoosePerson/Candidate';
import { Candidates } from '../ChoosePerson/Candidates';
import { ListOfOptions } from '../ChoosePerson/ListOfOptions';
import { Employees } from '../ChoosePerson/Employees';
import { Employee } from '../ChoosePerson/Employee';

export const ChoosePerson = () => {
  return (
    <Routes>
      <Route path={routes.generateCVchoosePerson} element={<ListOfOptions />} />
      <Route path={routes.generateCVcandidateList} element={<Candidates />} />
      <Route path={routes.candidate} element={<Candidate />}/>
      <Route path={routes.generateCVemployeesList} element={<Employees />} />
      <Route path={routes.employee} element={<Employee />} />
    </Routes>
  );
};
