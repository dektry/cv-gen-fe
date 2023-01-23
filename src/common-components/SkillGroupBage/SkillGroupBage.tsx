import clsx from 'clsx';
import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import theme from 'theme/theme';
import { useStyles } from './styles';

type ISkillGroupField = {
  hint?: string;
} & TextFieldProps;

export const SkillGroupBage = (props: ISkillGroupField) => {
  const { value, error, hint } = props;

  const classes = useStyles({
    theme,
    hint: hint || '',
  });

  return (
    <TextField
      onClick={(e) => e.stopPropagation()}
      className={clsx([classes.root, !!value && !error && classes.shrunk])}
      fullWidth={false}
      inputProps={{ size: (value as string)?.length + 3, autoComplete: 'off' }}
      InputProps={{ endAdornment: hint && <InfoOutlinedIcon /> }}
      label={'Section name:'}
      InputLabelProps={{ className: classes.label }}
      disabled={true}
      {...props}
    />
  );
};
``;
