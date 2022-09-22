import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useStyles } from 'common-components/GenerateCVHeader/styles';

interface IProps {
  backPath?: string;
  children?: React.ReactNode | React.ReactNode[];
  disabled?: boolean;
  noBackBtn?: boolean;
}

export const GenerateCvHeader = ({ backPath, children, disabled, noBackBtn = false }: IProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = () => {
    if (backPath) {
      navigate(backPath || '/');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={classes.wrap}>
      {!noBackBtn && (
        <div>
          <Button
            type="default"
            icon={<ArrowLeftOutlined />}
            className={classes.backBtn}
            onClick={handleClick}
            disabled={disabled}
          />
        </div>
      )}
      {children}
    </div>
  );
};
