import { useState } from 'react';
import { TextField } from '@mui/material';

interface IProps {
  updateProjectInfo: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  value?: string | string[] | number;
  fieldName: string;
  type?: string;
  placeholder: string;
  label: string;
  multiline: boolean;
}
export const ProjectFieldInput = ({
  updateProjectInfo,
  value,
  fieldName,
  type,
  placeholder,
  label,
  multiline,
}: IProps) => {
  const [error, setError] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!e.target.value) {
      setError(true);
      updateProjectInfo(e);
    } else {
      setError(false);
      updateProjectInfo(e);
    }
  };
  return (
    <TextField
      multiline={multiline}
      label={label}
      type={type}
      placeholder={placeholder}
      name={fieldName}
      error={error}
      helperText={'*Required field'}
      onChange={(e) => onChange(e)}
      value={value}
    />
  );
};
