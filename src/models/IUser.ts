export interface IDBPermissions {
  id: string;
  name: string;
}

export interface IDBPosition {
  duties: string;
  id: string;
  name: string;
  requirements: string;
  level: string;
  salaryMaxLimit: number;
  salaryMinLimit: number;
  group: IDBPositionGroup;
  from: string;
  to: string | null;
}

export interface IDBLevels {
  level: string;
  id: string;
  name: string;
  requirements: string;
  group: IDBLevelGroup;
  from: string;
  to: string | null;
}

export interface IDBPositionGroup {
  name: string;
  color: string;
}

export interface IDBLevelGroup {
  name: string;
  color: string;
}

export interface IDBCareer {
  id: string;
  from: string;
  to: string | null;
  salary: number;
  position?: IDBPosition;
  tempId?: string;
  level: IDBLevels;
}

export interface IDBUser {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  avatarFileName: string;
  birthday: string;
  role: {
    id: string;
    name: string;
    permissions: IDBPermissions[];
  };
  career: IDBCareer[];
  position?: IDBPosition;
  level: IDBLevels;
  isActive: boolean;
  permissions?: string[];
  templatesRead?: any[];
  templatesWrite?: any[];
  currentPositions?: IDBPosition[];
  balance: number;
}

export interface IDBRole {
  id: string;
  name: string;
  permission: IDBPermission;
}

export interface IDBPermission {
  permission_type: string;
  R: boolean;
  W: boolean;
}

export interface Action {
  type: string;
  payload?: any;
}
export interface IRolesColors {
  admin: string;
  user: string;
  sudo: string;
}

export interface ILevelsSchema {
  id: string;
  name: string;
  value: string;
}

export interface IQuestion {
  uuid: string;
  value: string;
}

export interface ISkill {
  uuid: string;
  value: string;
  levels: Array<ILevelsSchema>;
  questions: Array<IQuestion>;
}

export interface ISkillGroup {
  uuid: string;
  position_id: string;
  value: string;
  skills: Array<ISkill>;
}

export type IMatrix = ISkillGroup[];

export interface IMatrixUpdate {
  matrixTree: IMatrix;
  position_id: string;
}

export interface IUsersContext {
  users: IDBUser[];
  chosenUser: IDBUser;
  isEditProfile: boolean;
  selectedCareer: string;
  allPositions: IDBPosition[];
  allLevels: IDBLevels[];
  isValidForm: boolean;
  isLoading: boolean;
  onPageCount: number;
  usersCount: number;
  currentPage: number;
}

export interface IPositionsState {
  chosenPosition: IDBPosition;
  isEditPosition: boolean;
  allPositions: IDBPosition[];
  isValidForm: boolean;
  isLoading: boolean;
  skillMatrix: IMatrix;
  skillId?: string;
}

export interface IUpdatePosition {
  positionId: string;
  position: Omit<IDBPosition, 'id'>;
}

export interface ILevelsState {
  chosenLevel: IDBLevels;
  isEditLevel: boolean;
  allLevels: IDBLevels[];
  levelsSchema: ILevelsSchema[];
  isValidForm: boolean;
  isLoading: boolean;
}

export interface IUpdateLevel {
  levelId: string;
  level: Omit<IDBLevels, 'id'>;
}
