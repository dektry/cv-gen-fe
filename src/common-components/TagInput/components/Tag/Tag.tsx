import { Box, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  tag: string;
  handleClickTag: (tag: string) => void;
}
export const Tag = ({ tag, handleClickTag }: IProps) => {
  const classes = useStyles({ theme });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '2px 12px',
        gap: '4px',
        height: '22px',
        background: '#333333',
        borderRadius: '100px',
        flex: 'none',
        order: 0,
        flexGrow: 0,
        color: '#ffffff',
        margin: '4px',
        fontSize: '12px',
      }}
    >
      <Stack direction="row" sx={{ flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
        <Typography>{tag}</Typography>
        <CloseIcon fontSize="small" className={classes.closeIcon} onClick={() => handleClickTag(tag)} />
      </Stack>
    </Box>
  );
};
