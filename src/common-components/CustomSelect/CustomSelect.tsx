import { MenuItem, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

type TCustomSelect = {
  options: { value: string | number; label: string }[];
} & TextFieldProps;

export const CustomSelect = (props: TCustomSelect) => {
  const { options, ...rest } = props;

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
