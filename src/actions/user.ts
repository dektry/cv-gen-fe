import { message } from 'antd';

import { AppDispatch } from 'store';

import { apiClient } from 'services/apiService';
import endpoints from 'config/endpoint.json';
import { CANT_LOGIN, AUTH_OUTDATED } from 'actions/constants';

import { IDBCareer, IDBRole, IDBUser, IUpdatePosition } from 'models/IUser';
import { ICredentials } from 'models/ILogin';

interface IResponse {
  statusText: string;
  json: () => object;
}

export const getAuthCheckedResponse = (data: IResponse) => {
  if (data.statusText === 'Unauthorized') {
    throw new Error(CANT_LOGIN);
  }
  return data.json();
};

export const getAvatarUrl = (fileName: string | undefined) => {
  return fileName
    ? `${process.env.REACT_APP_BE_URI}/users/avatars/${fileName}`
    : `${process.env.REACT_APP_BE_URI}/users/avatars/default_admin.png`;
};

export const transformUsers = (users: IDBUser[]) => {
  return users.map((user: IDBUser) => {
    const userPermissions = user.role.permissions.map((permission: Partial<IDBRole>) => permission.name);
    const sortedCareer = user.career.sort((a: IDBCareer, b: IDBCareer) => {
      if (a.to === null) {
        return -1;
      }
      if (b.to === null) {
        return 1;
      }
      return new Date(b.to).getTime() - new Date(a.to).getTime();
    });
    return {
      ...user,
      career: sortedCareer,
      permissions: userPermissions,
      position: sortedCareer[0]?.position,
    };
  });
};

export const getAllRoles = async () => {
  try {
    const { data } = await apiClient.get(endpoints.getAllRoles);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_ALL_ROLES_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const updateUser = async (id: string, user: IDBUser & IUpdatePosition) => {
  try {
    const updatedUser = {
      ...user,
      position: user.positionId,
      roleId: user.role.id,
    };
    const { data } = await apiClient.put(`${endpoints.users}/${id}`, updatedUser);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_UPDATE_USER_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const createUser = async (request: IDBUser) => {
  try {
    const createdUser = {
      ...request,
      roleId: request.role.id,
    };
    const { data } = await apiClient.post(endpoints.users, createdUser);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_CREATE_USER_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const login = async (credentials: ICredentials) => {
  try {
    const { data } = await apiClient.post(endpoints.login, credentials);
    if (data) {
      localStorage.setItem('jwt', data.jwt.access_token);
      return transformUsers([data.user])[0];
    }
    return data;
  } catch (error) {
    console.error('[API_CLIENT_LOGIN_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const getActualUser = async (
  request: IDBUser,
  setCurrentUser: React.Dispatch<React.SetStateAction<IDBUser | null | undefined>>,
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await apiClient.get(`${endpoints.users}/${request.id}`);
    if (response.status === 404) {
      localStorage.clear();
      message.error(AUTH_OUTDATED);
      setCurrentUser(null);
      return null;
    }
    return response.data;
  } catch (error) {
    localStorage.clear();
    setIsSuccess(false);
    console.error('[API_GET_ACTUAL_USER_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const loginFromJwt = async (
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentUser: React.Dispatch<React.SetStateAction<IDBUser | null | undefined>>,
  dispatch: AppDispatch,
  currentUser: IDBUser | null | undefined
) => {
  const jwtFromStorage = localStorage.getItem('jwt') || undefined;
  const getUser = async () => {
    try {
      const { data } = await apiClient.get(endpoints.auth);
      const response = data || null;
      if (response) {
        const actualUserProfile = await getActualUser(response, setCurrentUser, setIsSuccess);
        setIsSuccess(true);
        setCurrentUser(response);
        return transformUsers([actualUserProfile])[0];
      }
      return response;
    } catch (error) {
      console.error('[API_LOGIN_FROM_JWT_ERROR]', error);
      message.error(`Server error. Please contact admin`);
    }
  };
  //
  if (currentUser !== undefined) {
    setCurrentUser(currentUser);
    if (jwtFromStorage && currentUser === null) {
      localStorage.clear();
      message.error(AUTH_OUTDATED);
    }
  } else if (jwtFromStorage) {
    getUser();
  } else {
    setCurrentUser(null);
  }
};

export const auth = async () => {
  try {
    const { data } = await apiClient.get(endpoints.auth);
    return data;
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
  }
};
