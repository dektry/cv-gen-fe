import { IEducation } from 'models/IEducation';
import { ICreateEmployee } from 'models/IEmployee';
import { ILanguage } from 'models/ILanguage';
import { IProject } from 'models/IProject';
import { NullableField } from 'models/TNullableField';

interface IFormEmployee {
  id?: NullableField<string> | undefined;
  pfId?: number | undefined;
  pfUpdatedAt?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: NullableField<string> | undefined;
  personalEmail?: NullableField<string> | undefined;
  mobileNumber?: NullableField<string> | undefined;
  dateOfBirth?: NullableField<string> | undefined;
  gender?: NullableField<string> | undefined;
  avatarUrl?: NullableField<string> | undefined;
  hiredOn?: NullableField<string> | undefined;
  skypeUsername?: NullableField<string> | undefined;
  slackUsername?: NullableField<string> | undefined;
  twitterUsername?: NullableField<string> | undefined;
  facebookUrl?: NullableField<string> | undefined;
  linkedinUrl?: NullableField<string> | undefined;
  department?:
    | {
        id?: string;
        name?: string;
      }
    | null
    | undefined;
  position?: NullableField<string> | undefined;
  level?: NullableField<string> | undefined;
  location?: NullableField<string> | undefined;
  timezone?: NullableField<string> | undefined;
  languages?:
    | {
        id?: string;
        value?: string;
        level?: string;
        employeeId?: string;
      }[]
    | null
    | undefined;
  educations?:
    | {
        id?: string;
        university?: string;
        specialization?: string;
        startYear?: number;
        endYear?: number;
        employeeId?: string;
      }[]
    | undefined;
  projects?:
    | {
        id?: string;
        team_size?: string;
        employeeId?: string;
        name?: string;
        duration?: string;
        position?: string;
        teamSize?: number;
        description?: string;
        responsibilities?: string[];
        tools?: string[];
      }[]
    | undefined;
  formalEducation?: NullableField<string> | undefined;
  startingPoint?: NullableField<string> | undefined;
  interests?: NullableField<string> | undefined;
  description?: NullableField<string> | undefined;
  softSkillsToCv?: string[] | undefined;
  yearsOfExperience?: NullableField<number> | undefined;
}

export function formatEmployeeBeforeSave(employee: IFormEmployee) {
  const educationsToSave: IEducation[] = employee.educations
    ? employee.educations.map((el) => ({
        id: el.id || '',
        university: el.university || '',
        specialization: el.specialization || '',
        startYear: el.startYear || 1900,
        endYear: el.endYear || 1900,
        employeeId: el.employeeId || '',
      }))
    : [];

  const languagesToSave: ILanguage[] = employee.languages
    ? employee.languages.map((el) => ({
        id: el.id || '',
        value: el.value || '',
        level: el.level || '',
        employeeId: el.employeeId || '',
      }))
    : [];

  const projectsToSave: IProject[] = employee.projects
    ? employee.projects.map((el) => ({
        id: el.id || '',
        team_size: el.team_size || '',
        employeeId: el.employeeId || '',
        name: el.name || '',
        duration: el.duration || '',
        position: el.position || '',
        teamSize: el.teamSize || 0,
        description: el.description || '',
        responsibilities: el.responsibilities || [],
        tools: el.tools || [],
      }))
    : [];
  const employeeToSave: ICreateEmployee = {
    id: null,
    pfId: 0,
    pfUpdatedAt: '',
    department: null,
    formalEducation: null,
    startingPoint: null,
    interests: null,
    description: null,
    firstName: employee.firstName || '',
    lastName: employee.lastName || '',
    email: employee.email || '',
    personalEmail: employee.personalEmail || '',
    mobileNumber: employee.mobileNumber || '',
    dateOfBirth: employee.dateOfBirth || '',
    gender: employee.gender || '',
    avatarUrl: employee.avatarUrl || '',
    hiredOn: employee.hiredOn || '',
    skypeUsername: employee.skypeUsername || '',
    slackUsername: employee.slackUsername || '',
    twitterUsername: employee.twitterUsername || '',
    facebookUrl: employee.facebookUrl || '',
    linkedinUrl: employee.linkedinUrl || '',
    position: employee.position || '',
    level: employee.level || '',
    location: employee.location || '',
    timezone: employee.timezone || '',
    languages: languagesToSave,
    softSkillsToCv: employee.softSkillsToCv || [],
    yearsOfExperience: employee.yearsOfExperience || null,
    educations: educationsToSave,
    projects: projectsToSave,
  };

  return employeeToSave;
}
