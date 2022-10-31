import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

interface IProps {
  text: string;
}
export const Spinner = ({ text }: IProps) => {
  return (
    <Box sx={{ position: 'absolute', top: '50%', left: '50%' }}>
      <Typography variant="h4">{text}</Typography>
      <CircularProgress />
    </Box>
  );
};
