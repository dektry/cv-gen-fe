import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from '@mui/material/Button';

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
            className={classes.backBtn}
            startIcon={<ArrowBackIosNewIcon />}
            onClick={handleClick}
            disabled={disabled}
          >
            <Typography variant="h2">BACK</Typography>
          </Button>
        </div>
      )}
      {children}
    </div>
  );
};
