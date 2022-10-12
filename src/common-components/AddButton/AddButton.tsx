import { Button, ButtonProps } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

interface IAddButton extends ButtonProps {
  title?: string;
}

export const AddButton = (props: IAddButton) => {
  const { title, ...rest } = props;
  return (
    <Button
      {...rest}
      sx={[
        {
          textTransform: 'none',
          height: '40px',
          padding: '8px',
          paddingLeft: '16px',
          '& 	.MuiButton-endIcon': {
            marginRight: 0,
            '& svg': {
              fontSize: '24px',
            },
          },
        },
        !title && {
          padding: '0',
          minWidth: '24px',
          height: 'auto',

          '& 	.MuiButton-endIcon': {
            margin: 0,
          },
        },
      ]}
      variant="contained"
      endIcon={<AddRoundedIcon />}
      color="secondary"
    >
      {title}
    </Button>
  );
};
