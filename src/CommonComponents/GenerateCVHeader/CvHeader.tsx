import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface IProps {
  backPath: string;
  children?: React.ReactChild | React.ReactChild[];
  disabled?: boolean;
}

export const GenerateCvHeader = ({ backPath, children, disabled }: IProps) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => history.push(backPath);

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
