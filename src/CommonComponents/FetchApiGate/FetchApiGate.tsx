import { ReactNode } from 'react';
import { Result, Button } from 'antd';
import { useStyles } from './styles';
import { REFRESH } from './utils/constants';

interface IProps {
  children: ReactNode | null;
  isSuccess: boolean;
  message: string;
  title: string;
}

export const FetchApiGate = ({
  children,
  isSuccess,
  message,
  title,
}: IProps) => {
  const classes = useStyles();
  return isSuccess ? (
    <>{children}</>
  ) : (
    <Result
      className={classes.container}
      status="404"
      title={title}
      subTitle={message}
      extra={
        <Button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          type="primary"
        >
          {REFRESH}
        </Button>
      }
    />
  );
};
