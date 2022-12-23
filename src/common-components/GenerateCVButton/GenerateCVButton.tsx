import Button from '@mui/material/Button';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  handleClickGenerateCv: () => void;
}

export const GenerateCVButton = ({ handleClickGenerateCv }: IProps) => {
  const classes = useStyles({ theme });

  return (
    <Button className={classes.generateCvButton} onClick={handleClickGenerateCv}>
      Generate CV
    </Button>
  );
};
