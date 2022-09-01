import React from 'react';

import LoginContainer from 'Pages/Login';
import { HomePage } from 'Pages/HomePage';
import { Candidates } from 'Pages/GenerateCV/ChoosePerson/Candidates';
import { Candidate } from 'Pages/GenerateCV/ChoosePerson/Candidate';
import { Employees } from 'Pages/GenerateCV/ChoosePerson/Employees';
import { Employee } from 'Pages/GenerateCV/ChoosePerson/Employee';
import { InterviewSetUp } from 'Pages/GenerateCV/TechnicalInterview/InterviewSetUP';
import { SoftskillsInterview } from 'Pages/GenerateCV/SoftskillsInterview';
import { InterviewResults } from 'Pages/GenerateCV/TechnicalInterview/InterviewResults';

import routes from 'config/routes.json';

export interface IRoute {
  path: string;
  component: React.ComponentType;
}

export const publicRoutes: IRoute[] = [{ path: routes.login, component: LoginContainer }];
export const privateRoutes: IRoute[] = [
  { path: routes.home, component: HomePage },
  { path: routes.generateCVcandidateList, component: Candidates },
  { path: routes.candidate, component: Candidate },
  { path: routes.generateCVemployeesList, component: Employees },
  { path: routes.employee, component: Employee },
  { path: routes.generateCVtechnicalInterview, component: InterviewSetUp },
  { path: routes.generateCVtechnicalInterviewResult, component: InterviewResults },
  { path: routes.generateCVsoftskillsInterview, component: SoftskillsInterview },
];
