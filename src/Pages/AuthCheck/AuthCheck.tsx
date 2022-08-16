/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { PreLoader } from 'components/Molecules/PreLoader/PreLoader';
import { IDBUser } from 'interfaces/users.interface';
import { loginFromJwt } from 'api/utils';
import { FetchApiGate } from 'components/Atoms/FetchApiGate/FetchApiGate';
import {
  AWAIT_AUTH,
  OOPS,
  USER_AUTH_SERVER_NOT_FOUND,
} from 'constants/messages';
import { useSelector } from 'react-redux';
import { appSelector, loadPermissions } from 'store/app';
import { useAppDispatch } from 'store/store';

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

    if (currentUser?.id) {
      dispatch(loadPermissions());
    }
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
