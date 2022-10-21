import { IDBUser, IDBPosition, IDBLevels } from 'models/IUser';
import { ICandidate } from 'models/ICandidate';
import { IEmployee } from 'models/IEmployee';

export const defaultGroup = {
  name: '',
  color: '',
  id: '',
};

export const defaultPosition: IDBPosition = {
  level: '',
  from: '',
  to: '',
  duties: '',
  id: '',
  name: 'undefined',
  requirements: '',
  salaryMaxLimit: 2000,
  salaryMinLimit: 500,
  group: defaultGroup,
};

export const defaultLevel: IDBLevels = {
  id: '',
  name: 'undefined',
  requirements: '',
  from: '',
  to: '',
  level: '',
  group: defaultGroup,
};

export const defaultUser: IDBUser = {
  id: '',
  password: '',
  email: '',
  firstName: '',
  lastName: '',
  birthday: '1997-01-01T22:00:00.000Z',
  role: {
    id: '',
    name: '',
    permissions: [{ name: '', id: '' }],
  },
  career: [],
  avatarFileName: 'default_admin.png',
  position: defaultPosition,
  level: defaultLevel,
  isActive: true,
  balance: 160,
  permissions: [],
};

export const defaultCandidate: ICandidate = {
  id: '1111',
  pfId: 0,
  pfUpdatedAt: '1970-12-31T14:47:14.306Z',
  fullName: '',
  position: null,
  level: null,
  location: null,
  timezone: null,
  languages: [
    {
      id: null,
      code: '',
      level: '',
    },
  ],
  education: [
    {
      id: null,
      pfId: 0,
      school: '',
      name: '',
      from_year: 0,
      to_year: null,
      subject: '',
      description: '',
    },
  ],
  experience: [
    {
      id: null,
      pfId: 0,
      title: '',
      company: '',
      starts_on: '1970-12-31T00:00:00.000Z',
      ends_on: null,
      location: '',
      description: '',
    },
  ],
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
  description: null,
};

export const defaultPageSize = 10;
export const defaultCurrentPage = 1;

export const DELETED_LEVELS = 'Deleted level';
export const DELETED_POSITION = 'Deleted position';
