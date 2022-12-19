import clsx from 'clsx';
import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import theme from 'theme/theme';
import { useStyles } from './styles';

type ISkillGroupField = {
  hint?: string;
  fullWidth?: boolean;
} & TextFieldProps;

export const CustomTextField = (props: ISkillGroupField) => {
  const { value, error, fullWidth } = props;

  const classes = useStyles({ theme });
  return (
    <TextField
      onClick={(e) => e.stopPropagation()}
      className={clsx([classes.root, !!value && !error && classes.shrunk])}
      fullWidth={fullWidth}
      inputProps={{ size: (value as string)?.length + 1, autoComplete: 'off' }}
      InputLabelProps={{ className: classes.label }}
      {...props}
    />
  );
};
``;
