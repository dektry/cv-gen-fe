import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

type TCustomSelect = {
  options: { value: string; label: string }[];
} & TextFieldProps;

export const CustomSelect = (props: TCustomSelect) => {
  const { options } = props;

  return (
    <TextField {...props} select>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
