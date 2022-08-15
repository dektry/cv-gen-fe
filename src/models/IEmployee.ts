import { ITableExtension } from './ICommon';

interface IEmployeeDepartment {
  id: string;
  name: string;
}

export interface IEmployee {
  id: string | null;
  pfId: number;
  pfUpdatedAt: string;
  fullName: string;
  email: string | null;
  personalEmail: string | null;
  mobileNumber: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  avatarUrl: string | null;
  hiredOn: string | null;
  skypeUsername: string | null;
  slackUsername: string | null;
  twitterUsername: string | null;
  facebookUrl: string | null;
  linkedinUrl: string | null;
  department: IEmployeeDepartment | null;
  position: string | null;
  level: string | null;
  location: string | null;
  timezone: string | null;
  languages: string | null;
  formalEducation: string | null;
  startingPoint: string | null;
  interests: string | null;
}

//     department: employee.department,

export interface IEmployeesState extends ITableExtension {
  currentEmployee: IEmployee;
  chosenEmployee: IEmployee | null;
  employees: IEmployee[];
  isLoading: boolean;
  query?: string;
}
