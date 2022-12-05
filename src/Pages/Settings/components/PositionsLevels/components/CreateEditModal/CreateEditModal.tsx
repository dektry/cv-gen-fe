import React, { useEffect, useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import { employeesSelector } from 'store/reducers/employees';

import { IProject } from 'models/IProject';

import { useStyles } from './styles';
import theme from 'theme/theme';

import { SaveButton } from 'common-components/SaveButton';

interface IProps {
  isOpen: boolean;
  modalTitle: string;
  onClose: () => void;
  onSubmit?: () => void;
  label: string;
  buttonText: string;
}

export const CreateEditModal = ({ isOpen, modalTitle, onClose, onSubmit, label, buttonText }: IProps) => {
  const classes = useStyles({ theme });

  const [value, setValue] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (value) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box className={classes.box}>
          <CloseIcon className={classes.closeIcon} onClick={onClose} />
          <Typography variant="h2" className={classes.title}>
            {modalTitle}
          </Typography>
          <TextField onChange={handleChange} label={label} />
          <div className={classes.buttonContainer}>
            <Button className={classes.cancelButton} onClick={onClose}>
              Cancel
            </Button>
            <SaveButton title={buttonText} handleClickOkButton={onSubmit} error={disabled} />
          </div>
        </Box>
      </Modal>
    </>
  );
};
