import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loginFromJwt } from 'actions/user';

import { appSelector } from 'store/reducers/app';
import { useAppDispatch } from 'store';

import { IDBUser } from 'models/IUser';
import {
  AWAIT_AUTH,
  OOPS,
  USER_AUTH_SERVER_NOT_FOUND,
} from './utils/constants';


import { PreLoader } from 'CommonComponents/PreLoader';
import { FetchApiGate } from 'CommonComponents/FetchApiGate';

interface IProps {
  children: React.ReactChild | React.ReactChild[];
}

export const AuthCheck = ({ children }: IProps) => {
  const { user } = useSelector(appSelector);
  const dispatch = useAppDispatch();

  const [currentUser, setCurrentUser] = useState<IDBUser | undefined | null>(
    undefined,
  );
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    loginFromJwt(setIsSuccess, setCurrentUser, dispatch, currentUser);

  }, [currentUser]);

  if (user === undefined) {
    return <PreLoader status={AWAIT_AUTH} />;
  }

  if (user?.password) {
    return <>{children}</>;
  }

  return (
    <>
      <FetchApiGate
        isSuccess={isSuccess || currentUser === null}
        message={USER_AUTH_SERVER_NOT_FOUND}
        title={OOPS}
      >
        {children}
      </FetchApiGate>
    </>
  );
};
