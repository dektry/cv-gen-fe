import { Button, ButtonProps } from '@mui/material';

interface IDeleteButton extends ButtonProps {
  title: string;
}

export const DeleteButton = (props: IDeleteButton) => {
  const { title, ...rest } = props;
  return (
    <Button
      {...rest}
      sx={[
        {
          textTransform: 'none',
          color: 'error.main',
          height: '40px',
        },
      ]}
    >
      {title}
    </Button>
  );
};
