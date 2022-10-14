import { Button, ButtonProps } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { SxProps } from '@mui/system';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';

interface IAddButton extends ButtonProps {
  title?: string;
}

export const AddButton = (props: IAddButton) => {
  const { title, ...rest } = props;

  let sxProp: SxProps = [
    {
      textTransform: 'none',
      height: '40px',
      padding: '8px',
      paddingLeft: '16px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      '&:hover': {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      },
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
  ];

  // this allows to override the default styles
  if (props.sx) {
    if ((props.sx as []).length) {
      sxProp = [...sxProp, ...(rest.sx as ReadonlyArray<SystemStyleObject>)];
    } else {
      sxProp = [...sxProp, props.sx as SystemStyleObject];
    }
  }

  return (
    <Button {...rest} sx={sxProp} variant="contained" endIcon={<AddRoundedIcon />} color="secondary">
      {title}
    </Button>
  );
};
