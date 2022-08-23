import React, { useState } from 'react';

import { message } from 'antd';

import { LoginUI } from './LoginUI';

import { useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';

import {
  FILL_FORM,
  GET_ACCOUNT,
  INVALID_CRED,
  AUTH_SUCCESS,
  API_UNAVAILABLE,
  FORM_PASSWORD,
  FORM_EMAIL,
} from './utils/constants';
import routes from 'config/routes.json';

import { useLoggedInState } from 'hooks/useLoggedInState';
import { getFieldValidState } from './utils/helpers/getFieldValidState';

import { useAppDispatch } from 'store';
import { logIn } from 'store/reducers/app';

export interface LoginFormFields extends FieldValues {
  email: string;
  password: string;
}

export const LoginContainer = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  //   const isUser = useLoggedInState();
  const [isSubmit, setIsSubmit] = useState(false);
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<LoginFormFields>({
    mode: 'onChange',
  });
  const { password, email } = watch();

  const emailValidateStatus = getFieldValidState(email, errors[FORM_EMAIL]);
  const passwordValidateStatus = getFieldValidState(password, errors[FORM_PASSWORD]);

  const onFailedSubmit = () => {
    message.error({
      content: FILL_FORM,
    });
  };

  const onSubmit = async (data: LoginFormFields) => {
    const key = 'updatable';
    const credentials = {
      username: data.email,
      password: data.password,
    };

    setIsSubmit(true);
    message.loading({
      content: GET_ACCOUNT,
      key,
    });

    const user = await dispatch(logIn(credentials)).unwrap();

    if (user === undefined) {
      message.error({
        content: API_UNAVAILABLE,
        key,
        duration: 1,
      });
    } else if (!user) {
      message.error({
        content: INVALID_CRED,
        key,
        duration: 1,
      });

      reset({
        email,
        password: '',
      });
      setIsSubmit(false);
    } else {
      message.success({
        content: AUTH_SUCCESS,
        key,
        duration: 1,
      });

      setIsSubmit(false);
      navigate(routes.home);
    }
  };

  return (
    <LoginUI
      onSubmit={onSubmit}
      emailValidateStatus={emailValidateStatus}
      passwordValidateStatus={passwordValidateStatus}
      onFailedSubmit={onFailedSubmit}
      control={control}
      isSubmit={isSubmit}
      handleSubmit={handleSubmit}
    />
  );
};
