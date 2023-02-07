import { useEffect } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

type TCustomSelect = {
  options: { value: string | number; label: string }[];
  setDefaultValue?: boolean;
} & TextFieldProps;

export const CustomSelect = (props: TCustomSelect) => {
  const { options, setDefaultValue, ...rest } = props;

  useEffect(() => {
    // this is a hack to set default value for controlled component
    if (setDefaultValue && options.length) {
      setTimeout(() => {
        if (props.onChange) props.onChange(options[0].value as unknown as React.ChangeEvent<HTMLInputElement>);
      }, 0);
    }
  }, [options]);

  return (
    <TextField {...rest} select>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
