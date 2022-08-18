import { message } from 'antd';

import { AppDispatch } from 'store';

import { apiClient } from 'services/apiService';
import Helper from '../helper';
import endpoints from '../config/endpoint.json';
import { CANT_LOGIN, AUTH_OUTDATED } from './constants';

import { IDBUser } from 'models/IUser';
import { ICredentials, ILoginResponse } from 'models/ILogin';

const { headerWithJWT } = Helper;

export const getAuthCheckedResponse = (data: any) => {
  if (data.statusText === 'Unauthorized') {
    throw new Error(CANT_LOGIN);
  }
  return data.json();
};

export const transformUsers = (users: IDBUser[]) => {
  return users.map((user: IDBUser) => {
    const userPermissions = user.role.permissions.map(
      (permission: any) => permission.name,
    );
    const sortedCareer = user.career.sort((a: any, b: any) => {
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

export const updateUser = async (id: string, user: any) => {
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

export const createUser = async (data: any) => {
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
  const response: ILoginResponse | undefined = await fetch(
    `${process.env.REACT_APP_BE_URI}/auth/login`,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    },
  ).then(
    data => (data.ok ? data.json() : null),
    () => undefined,
  );
  if (response) {
    localStorage.setItem('jwt', response.jwt.access_token);
    return transformUsers([response.user])[0];
  }
  return response;
};

export const getActualUser = async (
  response: IDBUser,
  setCurrentUser: React.Dispatch<
    React.SetStateAction<IDBUser | null | undefined>
  >,
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    return await fetch(`${process.env.REACT_APP_BE_URI}/users/${response.id}`, {
      method: 'GET',
      mode: 'cors',
      headers: headerWithJWT(),
    })
      .then(data => {
        if (data.status === 404) {
          localStorage.clear();
          message.error(AUTH_OUTDATED);
          setCurrentUser(null);
          return null;
        }
        return data.ok ? data.json() : null;
      })
      .catch(error => {
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
  setCurrentUser: React.Dispatch<
    React.SetStateAction<IDBUser | null | undefined>
  >,
  dispatch: AppDispatch,
  currentUser: IDBUser | null | undefined,
) => {
  const jwtFromStorage = localStorage.getItem('jwt') || undefined;
  const getUser = async () => {
    const user: IDBUser | null = await fetch(
      `${process.env.REACT_APP_BE_URI}/auth/profile`,
      {
        method: 'GET',
        mode: 'cors',
        headers: headerWithJWT(),
      },
    )
      .then(data => {
        return data.ok ? data.json() : null;
      })
      .then(async (response: IDBUser | null) => {
        if (response) {
          const actualUserProfile = await getActualUser(
            response,
            setCurrentUser,
            setIsSuccess,
          );
          setIsSuccess(true);
          return transformUsers([actualUserProfile])[0];
        }
        return response;
      })
      .catch(error => {
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

export const handleCorrectUserSubmit = async (
  chosenUser: IDBUser,
  dispatch: React.Dispatch<any>,
  setIsUpdatingUser: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  update: () => void,
) => {
  setIsUpdatingUser(true);

  let response;
  if (!chosenUser.id) {
    const newUser = omit(chosenUser, ['id']);
    response = await createUser(newUser);
  } else {
    response = await updateUser(chosenUser.id, chosenUser);
  }

  if (!response.error) {
    await update();
    setOpenModal(false);
    dispatch({ type: EDIT_PROFILE, payload: false });
    dispatch({
      type: CHOOSE_USER,
      payload: defaultUser,
    });
  }

  if (response.email) {
    message.success({
      content: chosenUser.id ? USER_UPDATED : USER_CREATED,
      duration: 1.5,
    });
  } else {
    const messages = isArray(response.message)
      ? response.message
      : [response.message];
    messages.map((mes: string) =>
      message.error({
        content: mes,
        duration: 2,
      }),
    );
  }
  setIsUpdatingUser(false);
};

export const getAvatarUrl = (fileName: string | undefined) => {
  return fileName
    ? `${process.env.REACT_APP_BE_URI}/users/avatars/${fileName}`
    : `${process.env.REACT_APP_BE_URI}/users/avatars/default_admin.png`;
};