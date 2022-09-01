import { ITableExtension } from './ICommon';
import { NullableField } from './TNullableField';

interface IEmployeeDepartment {
  id: string;
  name: string;
}

export interface IEmployee {
  id: NullableField<string>;
  pfId: number;
  pfUpdatedAt: string;
  fullName: string;
  email: NullableField<string>;
  personalEmail: NullableField<string>;
  mobileNumber: NullableField<string>;
  dateOfBirth: NullableField<string>;
  gender: NullableField<string>;
  avatarUrl: NullableField<string>;
  hiredOn: NullableField<string>;
  skypeUsername: NullableField<string>;
  slackUsername: NullableField<string>;
  twitterUsername: NullableField<string>;
  facebookUrl: NullableField<string>;
  linkedinUrl: NullableField<string>;
  department: NullableField<IEmployeeDepartment>;
  position: NullableField<string>;
  level: NullableField<string>;
  location: NullableField<string>;
  timezone: NullableField<string>;
  languages: NullableField<string>;
  formalEducation: NullableField<string>;
  startingPoint: NullableField<string>;
  interests: NullableField<string>;
}

export interface IEmployeesState extends ITableExtension {
  currentEmployee: IEmployee;
  chosenEmployee: NullableField<IEmployee>;
  employees: IEmployee[];
  isLoading: boolean;
  isLoadingOneEmployee: boolean;
  query?: string;
}
