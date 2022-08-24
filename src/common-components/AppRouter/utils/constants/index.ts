import React from 'react';

import LoginContainer from 'Pages/Login';
import { GenerateCV } from 'Pages/GenerateCV/GenerateCV';
import { ListOfOptions } from 'Pages/GenerateCV/ChoosePerson/ListOfOptions';
import { Candidates } from 'Pages/GenerateCV/ChoosePerson/Candidates';
import { Candidate } from 'Pages/GenerateCV/ChoosePerson/Candidate';
import { Employees } from 'Pages/GenerateCV/ChoosePerson/Employees';
import { Employee } from 'Pages/GenerateCV/ChoosePerson/Employee';
import { PageNotFound } from 'common-components/PageNotFound';
import { TechnicalInterview } from 'Pages/GenerateCV/TechnicalInterview';
import { SoftskillsInterview } from 'Pages/GenerateCV/SoftskillsInterview';
import { InterviewResult } from 'Pages//InterviewResult';


import routes from 'config/routes.json';

export interface IRoute {
  path: string;
  component: React.ComponentType;
}

export const publicRoutes: IRoute[] = [
  { path: routes.login, component: LoginContainer },
  { path: '*', component: PageNotFound },
];
export const privateRoutes: IRoute[] = [
  { path: routes.generateCV, component: GenerateCV },
  { path: routes.generateCVchoosePerson, component: ListOfOptions },
  { path: routes.generateCVcandidateList, component: Candidates },
  { path: routes.candidate, component: Candidate },
  { path: routes.generateCVemployeesList, component: Employees },
  { path: routes.employee, component: Employee },
  { path: routes.generateCVtechnicalInterview, component: TechnicalInterview },
  { path: routes.generateCVtechnicalInterviewResult, component: InterviewResult },
  { path: routes.generateCVsoftskillsInterview, component: SoftskillsInterview },
];