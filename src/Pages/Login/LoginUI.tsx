import React from 'react';

import { Card, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Controller, Control } from 'react-hook-form';

import { EMAIL_STR, PASSWORD_STR, LOGIN_STR, FORM_PASSWORD, FORM_EMAIL } from './utils/constants';
import { LoginFormFields } from './LoginContainer';

import { useStyles } from './styles';

interface ILoginProps {
  handleSubmit: (values: any) => void;
  onSubmit: (data: LoginFormFields) => Promise<void>;
  onFailedSubmit: () => void;
  control: Control<LoginFormFields>;
  isSubmit: boolean;
  emailValidateStatus: '' | 'error' | 'success' | 'warning' | 'validating';
  passwordValidateStatus: '' | 'error' | 'success' | 'warning' | 'validating';
}

export function LoginUI({
  handleSubmit,
  onSubmit,
  onFailedSubmit,
  control,
  isSubmit,
  emailValidateStatus,
  passwordValidateStatus,
}: ILoginProps) {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Card className={classes.card} title={LOGIN_STR} bordered={false}>
        <Form onFinish={() => handleSubmit(onSubmit)}>
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
}
