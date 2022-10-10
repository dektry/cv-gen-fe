import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

type TCustomInput = TextFieldProps;

export const CustomInput = (props: TCustomInput) => {
  return <TextField {...props} />;
};
