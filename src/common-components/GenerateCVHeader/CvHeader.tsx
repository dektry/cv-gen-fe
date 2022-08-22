import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useStyles } from './styles';

interface IProps {
  backPath: string;
  children?: React.ReactNode | React.ReactNode[];
  disabled?: boolean;
}

export const GenerateCvHeader = ({ backPath, children, disabled }: IProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = () => navigate(backPath);

  return (
    <div className={classes.wrap}>
      <div>
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          className={classes.backBtn}
          onClick={handleClick}
          disabled={disabled}
        />
      </div>
      {children}
    </div>
  );
};
