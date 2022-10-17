import { Button, ButtonProps } from '@mui/material';
import { SxProps } from '@mui/system';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';

interface ISaveButton extends ButtonProps {
  title?: string;
  error: boolean;
  width: string;
  handleClickOkButton?: () => void;
}

export const SaveButton = (props: ISaveButton) => {
  const { title, error, width, handleClickOkButton, ...rest } = props;

  let sxProp: SxProps = [
    {
      background: '#333333',
      height: '56px',
      width: width,
      marginLeft: '8px',
      borderRadius: '100px',
      color: '#ffffff',

      '&:hover': {
        cursor: 'pointer',
        background: '#333333',
        boxShadow:
          '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
      },
    },
    error && {
      opacity: '0.6',
    },
  ];

  if (props.sx) {
    if ((props.sx as []).length) {
      sxProp = [...sxProp, ...(rest.sx as ReadonlyArray<SystemStyleObject>)];
    } else {
      sxProp = [...sxProp, props.sx as SystemStyleObject];
    }
  }

  return (
    <Button sx={sxProp} onClick={handleClickOkButton} disabled={error}>
      {title}
    </Button>
  );
};
