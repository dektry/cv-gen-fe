import clsx from 'clsx';
import { Box, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import theme from 'theme/theme';
import { useStyles } from './styles';

type ISkillGroupField = {
  hint?: string;
} & TextFieldProps;

export const SkillGroupField = (props: ISkillGroupField) => {
  const { value, error } = props;

  const classes = useStyles({ theme });
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <TextField
        className={clsx([classes.root, !!value && !error && classes.shrunk])}
        fullWidth={false}
        inputProps={{ size: (value as string)?.length }}
        // label={'Section name:'}
        // InputLabelProps={{ p }}
        {...props}
      />
    </Box>
  );
};
``;
