import { Button } from 'antd';

import { useStyles } from './styles';

interface IProps {
  text: string;
  handleClick: () => void;
}

export const StartInterviewButton = ({ text, handleClick }: IProps) => {

  const classes = useStyles();

  return (
    <Button
      className={classes.startButton}
      size='large'
      type='primary'
      onClick={handleClick}
    >{text}</Button>
  )
}