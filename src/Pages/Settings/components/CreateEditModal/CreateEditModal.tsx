import React, { useEffect, useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Typography } from '@mui/material';

import { useStyles } from './styles';
import theme from 'theme/theme';

import { SaveButton } from 'common-components/SaveButton';
import { CustomSelect } from 'common-components/CustomSelect';
import { IListElement } from '../Table';
import { IDBPosition } from 'models/IUser';

interface IProps {
  isOpen: boolean;
  modalTitle: string;
  onClose: () => void;
  onSubmit: (name: string, position?: IDBPosition) => void;
  label: string;
  buttonText: string;
  inputValue?: string;
  data?: IListElement[];
}

export const CreateEditModal = ({
  isOpen,
  modalTitle,
  onClose,
  onSubmit,
  label,
  buttonText,
  inputValue,
  data,
}: IProps) => {
  const classes = useStyles({ theme });

  const [value, setValue] = useState('');
  const [position, setPosition] = useState<IDBPosition>({} as IDBPosition);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (inputValue) {
      setValue(inputValue);
    }
  }, [inputValue]);

  useEffect(() => {
    if (value) {
      setDisabled(false);
      if (data) {
        const currentPosition = data.find((el) => el.name === value);
        if (currentPosition) {
          setPosition(currentPosition);
        }
      }
    } else {
      setDisabled(true);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    return () => {
      setValue('');
      setPosition({} as IDBPosition);
    };
  }, []);

  let options: { value: string; label: string }[] = [];
  if (data) {
    options = data.map((el) => ({ value: el.name, label: el.name }));
  }

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box className={classes.box}>
          <CloseIcon className={classes.closeIcon} onClick={onClose} />
          <Typography variant="h2" className={classes.title}>
            {modalTitle}
          </Typography>
          {data ? (
            <CustomSelect options={options} value={value} onChange={handleChange} />
          ) : (
            <TextField value={value} onChange={handleChange} label={label} />
          )}
          <div className={classes.buttonContainer}>
            <Button className={classes.cancelButton} onClick={onClose}>
              Cancel
            </Button>
            <SaveButton
              title={data ? 'Start' : buttonText}
              handleClickOkButton={() => onSubmit(value, position)}
              error={disabled}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};
