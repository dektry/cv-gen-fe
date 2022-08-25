import React, { useState } from 'react';

import { message } from 'antd';

import { Card, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Controller } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';

import { useStyles } from './styles';

import {
  FILL_FORM,
  GET_ACCOUNT,
  INVALID_CRED,
  AUTH_SUCCESS,
  FORM_PASSWORD,
  FORM_EMAIL,
  EMAIL_STR,
  PASSWORD_STR,
  LOGIN_STR,
} from './utils/constants';
import routes from 'config/routes.json';

import { getFieldValidState, message_type } from './utils/helpers/getFieldValidState';

import { useAppDispatch } from 'store';
import { logIn } from 'store/reducers/app';

export interface LoginFormFields extends FieldValues {
  email: string;
  password: string;
}

const LoginContainer = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

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

  const emailValidateStatus: message_type = getFieldValidState(email, errors[FORM_EMAIL]);
  const passwordValidateStatus: message_type = getFieldValidState(password, errors[FORM_PASSWORD]);

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

    if (!user) {
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
    <div className={classes.page}>
      <Card className={classes.card} title={LOGIN_STR} bordered={false}>
        <Form onFinish={handleSubmit(onSubmit, onFailedSubmit)}>
          <Form.Item hasFeedback validateStatus={emailValidateStatus}>
            <Controller
              rules={{ pattern: /^\S+@\S+$/i, minLength: 3, required: true }}
              name={FORM_EMAIL}
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  autoComplete="email"
                  placeholder={EMAIL_STR}
                  onChange={onChange}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  value={value}
                />
              )}
            />
          </Form.Item>
          <Form.Item hasFeedback validateStatus={passwordValidateStatus}>
            <Controller
              rules={{ minLength: 6, required: true }}
              name={FORM_PASSWORD}
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <Input.Password
                  autoComplete="current-password"
                  placeholder={PASSWORD_STR}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={isSubmit} className={classes.submit} htmlType="submit">
              {LOGIN_STR}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginContainer;
