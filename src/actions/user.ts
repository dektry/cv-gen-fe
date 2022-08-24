import { message } from 'antd';

import { AppDispatch } from 'store';

import { apiClient } from 'services/apiService';
import Helper from 'helper';
import endpoints from 'config/endpoint.json';
import { CANT_LOGIN, AUTH_OUTDATED } from 'actions/constants';

import { IDBCareer, IDBRole, IDBUser, IUpdatePosition } from 'models/IUser';
import { ICredentials } from 'models/ILogin';

const { headerWithJWT } = Helper;

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
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const updateUser = async (id: string, user: IDBUser & IUpdatePosition) => {
  const updatedUser = {
    ...user,
    position: user.positionId,
    roleId: user.role.id,
  };
  const response = await fetch(`${process.env.REACT_APP_BE_URI}/users/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: headerWithJWT(),
    body: JSON.stringify(updatedUser),
  });
  return response.json();
};

export const createUser = async (data: IDBUser) => {
  const createdUser = {
    ...data,
    roleId: data.role.id,
  };

  const response = await fetch(`${process.env.REACT_APP_BE_URI}/users`, {
    method: 'POST',
    mode: 'cors',
    headers: headerWithJWT(),
    body: JSON.stringify(createdUser),
  });
  return response.json();
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`${process.env.REACT_APP_BE_URI}/users/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: headerWithJWT(),
  });
  return response.json();
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
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const getActualUser = async (
  response: IDBUser,
  setCurrentUser: React.Dispatch<React.SetStateAction<IDBUser | null | undefined>>,
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    return await fetch(`${process.env.REACT_APP_BE_URI}/users/${response.id}`, {
      method: 'GET',
      mode: 'cors',
      headers: headerWithJWT(),
    })
      .then((data) => {
        if (data.status === 404) {
          localStorage.clear();
          message.error(AUTH_OUTDATED);
          setCurrentUser(null);
          return null;
        }
        return data.ok ? data.json() : null;
      })
      .catch((error) => {
        localStorage.clear();
        setIsSuccess(false);
        return error;
      });
  } catch (error) {
    localStorage.clear();
    throw new Error(String(error));
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
    const user: IDBUser | null = await fetch(`${process.env.REACT_APP_BE_URI}/auth/profile`, {
      method: 'GET',
      mode: 'cors',
      headers: headerWithJWT(),
    })
      .then((data) => {
        return data.ok ? data.json() : null;
      })
      .then(async (response: IDBUser | null) => {
        if (response) {
          const actualUserProfile = await getActualUser(response, setCurrentUser, setIsSuccess);
          setIsSuccess(true);
          return transformUsers([actualUserProfile])[0];
        }
        return response;
      })
      .catch((error) => {
        setIsSuccess(false);
        return error;
      });
    setCurrentUser(user);
  };
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

export const getAvatarUrl = (fileName: string | undefined) => {
  return fileName
    ? `${process.env.REACT_APP_BE_URI}/users/avatars/${fileName}`
    : `${process.env.REACT_APP_BE_URI}/users/avatars/default_admin.png`;
};
