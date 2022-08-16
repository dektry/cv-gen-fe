import { IDBLevelGroup, IDBPositionGroup, IDBUser } from './IUser';

export interface IDBPermissions {
  id: string;
  name: string;
}

export interface ICredentials {
  username: string;
  password: string;
}

export interface ILoginResponse {
  jwt: {
    ['access_token']: string;
  };
  user: IDBUser;
}

export interface IAppState {
  user?: IDBUser | null;
  isHaveTemplates?: boolean | null;
  positionGroups: IDBPositionGroup[];
  levelGroups: IDBLevelGroup[];
  access?: any[];
  isHavePermissionToOT?: boolean;
}
