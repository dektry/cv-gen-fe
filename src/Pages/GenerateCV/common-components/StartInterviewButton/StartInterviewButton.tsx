import { Button } from '@mui/material';

import { useStyles } from './styles';

interface IProps {
  text: string;
  handleClick: () => void;
}

export const StartInterviewButton = ({ text, handleClick }: IProps) => {
  const classes = useStyles();

  return (
    <Button className={classes.startButton} onClick={handleClick}>
      {text}
    </Button>
  );
};
