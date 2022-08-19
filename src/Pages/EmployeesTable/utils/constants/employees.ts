import { IEmployee } from 'models/IEmployee';

export const EMPLOYEE_TABLE_KEYS = {
  id: 'id',
  fullName: 'fullName',
  position: 'position',
  level: 'level',
  location: 'location',
};

export const defaultEmployee: IEmployee = {
  id: '101010',
  pfId: 101010,
  pfUpdatedAt: '1970-12-31T14:47:14.306Z',
  fullName: 'Say MyName',
  email: null,
  personalEmail: null,
  mobileNumber: null,
  dateOfBirth: null,
  gender: null,
  avatarUrl: null,
  hiredOn: null,
  skypeUsername: null,
  slackUsername: null,
  twitterUsername: null,
  facebookUrl: null,
  linkedinUrl: null,
  department: null,
  position: null,
  level: null,
  location: null,
  timezone: null,
  languages: null,
  formalEducation: null,
  startingPoint: null,
  interests: null,
};

export const defaultPageSize = 10;

export const defaultCurrentPage = 1;
