import { IDBLevels, IDBPosition, IDBUser } from 'models/IUser';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const INIT = 'INIT';
export const ACCESS_TOKEN = 'access-token';

export const defaultGroup = {
  id: '',
  name: '',
  color: '',
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
  permissions: ['']
};

