import { Box, Stack, Typography } from '@mui/material';
import { Cancel } from '@mui/icons-material';

interface IProps {
  tag: string;
  handleClickTag: (tag: string) => void;
}
export const Tag = ({ tag, handleClickTag }: IProps) => {
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
      onClick={() => handleClickTag(tag)}
    >
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
        <Typography>{tag}</Typography>
        <Cancel />
      </Stack>
    </Box>
  );
};
