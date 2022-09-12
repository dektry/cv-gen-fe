// eslint-disable-next-line no-shadow
export enum navigationKeys {
  '/articles' = 'articles',
  '/article' = 'articles.article',
  '/positions' = 'positions',
  '/levels' = 'levels',
  '/users' = 'users',
  '/logout' = 'logout',
  '/login' = 'login',
  '/projects' = 'projects',
  '/onboarding-templates' = 'onboarding-templates',
  '/' = 'home',
  '/vacations' = 'vacations',
  '/candidates' = 'candidates',
  '/interview' = 'interview',
  '/employees' = 'employees',
  '/generate-cv' = 'generate-cv',
  '/cv-list' = 'cv-list',
  '/settings' = 'settings',
}

/* eslint-disable no-shadow */

export const roles = {
  ADMIN: 'admin',
  USER: 'user',
};

export const permissions = {
  deleteUsers: 'DELETE_USERS',
  createUser: 'CREATE_USER',
  getUser: 'GET_USER',
  getAllUsers: 'GET_ALL_USERS',

  getCareer: 'GET_USER_CAREER',
  createCareer: 'CREATE_CAREER',
  deleteCareer: 'DELETE_CAREER',

  getAllRoles: 'GET_ALL_ROLES',
  getRoleByName: 'GET_ROLE_BY_NAME',
  createRole: 'CREATE_ROLE',
  updateRole: 'UPDATE_ROLE',
  deleteRole: 'DELETE_ROLE',

  getPermissionByName: 'GET_PERMISSION_BY_NAME',
  getAllPermissions: 'GET_ALL_PERMISSIONS',
  createPermission: 'CREATE_PERMISSION',

  getAllPositions: 'GET_ALL_POSITIONS',
  createPosition: 'CREATE_POSITION',
  updatePosition: 'UPDATE_POSITION',
  deletePosition: 'DELETE_POSITION',

  getAllLevels: 'GET_ALL_LEVELS',
  createLevel: 'CREATE_LEVEL',
  updateLevel: 'UPDATE_LEVEL',
  deleteLevel: 'DELETE_LEVEL',

  ARTICLE: {
    CREATE: 'CREATE_ARTICLE',
    UPDATE: 'UPDATE_ARTICLE',
    DELETE: 'DELETE_ARTICLE',
    READ: 'READ_ARTICLE',
    FULL_ACCESS: 'FULL_ACCESS_ARTICLE',
  },
  workWithOnBoardingTemplates: 'ONBOARDING_TEMPLATES',

  PROJECT: {
    CREATE: 'CREATE_PROJECT',
  },

  VACATIONS: {
    FULL_ACCESS: 'FULL_ACCESS_VACATIONS',
  },
};

export const mainPath = /^\/[\dA-z-]*/;

export const LIST_OF_CV = 'List of CVs';
export const CANDIDATES = 'Candidates';
export const EMPLOYEES = 'Employees';
export const SETTINGS = 'Settings';
