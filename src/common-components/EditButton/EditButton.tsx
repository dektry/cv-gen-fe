import { Button, ButtonProps } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { SxProps } from '@mui/system';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';

interface IEditButton extends ButtonProps {
  title?: string;
}

export const EditButton = (props: IEditButton) => {
  const { title, ...rest } = props;

  let sxProp: SxProps = [
    {
      textTransform: 'none',
      height: '40px',
      padding: '8px',
      border: '1px solid black',
      paddingLeft: '16px',
      '&.MuiButton-containedSecondary': {
        border: '1px solid',
        borderColor: 'primary.main',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
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
    <Button {...rest} sx={sxProp} variant="contained" endIcon={<EditIcon />} color="secondary">
      {title}
    </Button>
  );
};