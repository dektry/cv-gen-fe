import React from 'react';

import LoginContainer from 'Pages/Login';
import { HomePage } from 'Pages/HomePage';
import { Candidates } from 'Pages/GenerateCV/ChoosePerson/Candidates';
import { Candidate } from 'Pages/GenerateCV/ChoosePerson/Candidate';
import { Employees } from 'Pages/GenerateCV/ChoosePerson/Employees';
import { Employee } from 'Pages/GenerateCV/ChoosePerson/Employee';
import { InterviewSetUp } from 'Pages/GenerateCV/TechnicalInterview/InterviewSetUP';
import { SoftskillsInterview } from 'Pages/GenerateCV/SoftskillsInterview/InterviewSetUp';
import { InterviewResults } from 'Pages/GenerateCV/TechnicalInterview/InterviewResults';
import { SoftSkillsInterviewResults } from 'Pages/GenerateCV/SoftskillsInterview/InterviewResults';
import { AssessmentSetUp } from 'Pages/GenerateCV/TechnicalAssessment/AssessmentSetUp';
import { AssessmentHistory } from 'Pages/GenerateCV/TechnicalAssessment/AssessmentHistory';
import { CVGenerationPage } from 'Pages/CVGeneration';
import { SoftAssessmentHistory } from 'Pages/GenerateCV/SoftAssessment/SoftAssessmentHistory';
import { SoftAssessmentSetUp } from 'Pages/GenerateCV/SoftAssessment/SoftAssessmentSetUp';
import { UIElements } from 'Pages/UIElements';
import { CreateEmployee } from 'Pages/CreateEmployee';
import { HardSkillsMatrix } from 'Pages/Settings/components/HardSkillsMatrix';
import { Settings } from 'Pages/Settings';
import { HardSkillsMatrixList } from 'Pages/Settings/components/HardSkillsMatrixList';
import { SoftSkillsMatrixList } from 'Pages/Settings/components/SoftSkillsMatrixList';
import { TechAssessmentsComparison } from 'Pages/GenerateCV/TechnicalAssessment/TechAssessmentsComparison';

import routes from 'config/routes.json';
import { SoftSkillsMatrix } from 'Pages/Settings/components/SoftSkillsMatrix';

export interface IRoute {
  path: string;
  component: React.ComponentType;
}

export const publicRoutes: IRoute[] = [{ path: routes.home, component: LoginContainer }];
export const privateRoutes: IRoute[] = [
  { path: routes.home, component: HomePage },
  { path: routes.candidateList, component: Candidates },
  { path: routes.candidate, component: Candidate },
  { path: routes.employeesList, component: Employees },
  { path: routes.employee, component: Employee },
  { path: routes.technicalInterview, component: InterviewSetUp },
  { path: routes.technicalInterviewResult, component: InterviewResults },
  { path: routes.softSkillsInterview, component: SoftskillsInterview },
  { path: routes.softSkillsInterviewResult, component: SoftSkillsInterviewResults },
  { path: routes.technicalAssessment, component: AssessmentSetUp },
  { path: routes.technicalAssessmentHistory, component: AssessmentHistory },
  { path: routes.prevTechnicalAssessment, component: AssessmentSetUp },
  { path: routes.techAssessmentsComparison, component: TechAssessmentsComparison },
  { path: routes.generateCV, component: CVGenerationPage },
  { path: routes.softSkillAssessmentHistory, component: SoftAssessmentHistory },
  { path: routes.prevSoftSkillsAssessment, component: SoftAssessmentSetUp },
  { path: routes.softAssessment, component: SoftAssessmentSetUp },
  { path: routes.createEmployee, component: CreateEmployee },
  { path: routes.hardSkillsMatrixSetUp, component: HardSkillsMatrix },
  { path: routes.hardSkillsMatrixDetails, component: HardSkillsMatrix },
  { path: routes.settingsLevelsPositions, component: Settings },
  { path: routes.settingsHardSkillsMatrixList, component: HardSkillsMatrixList },
  { path: routes.settingsSoftSkillsMatrixList, component: SoftSkillsMatrixList },
  { path: routes.softSkillsMatrixSetUp, component: SoftSkillsMatrix },
  { path: routes.softSkillsMatrixDetails, component: SoftSkillsMatrix },
];

if (process.env.REACT_APP_ENV === 'development') {
  privateRoutes.push({ path: routes.uiElements, component: UIElements });
}
