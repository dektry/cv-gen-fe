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
          padding: '8px 16px',
          border: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0)',
          '&:hover': {
            borderColor: 'error.main',
            backgroundColor: 'rgba(0, 0, 0, 0)',
          },
        },
      ]}
    >
      {title}
    </Button>
  );
};
