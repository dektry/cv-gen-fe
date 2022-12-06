import React, { useEffect, useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Typography } from '@mui/material';

import { useStyles } from './styles';
import theme from 'theme/theme';

import { SaveButton } from 'common-components/SaveButton';

interface IProps {
  isOpen: boolean;
  modalTitle: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
  label: string;
  buttonText: string;
  inputValue?: string;
}

export const CreateEditModal = ({ isOpen, modalTitle, onClose, onSubmit, label, buttonText, inputValue }: IProps) => {
  const classes = useStyles({ theme });

  const [value, setValue] = useState(inputValue || '');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (value) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [value]);

  useEffect(() => {
    if (inputValue) {
      setValue(inputValue);
    }
  }, [inputValue]);

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
          <TextField value={value} onChange={handleChange} label={label} />
          <div className={classes.buttonContainer}>
            <Button className={classes.cancelButton} onClick={onClose}>
              Cancel
            </Button>
            <SaveButton title={buttonText} handleClickOkButton={() => onSubmit(value)} error={disabled} />
          </div>
        </Box>
      </Modal>
    </>
  );
};
