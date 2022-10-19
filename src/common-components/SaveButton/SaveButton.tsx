import { Button, ButtonProps } from '@mui/material';
import { SxProps } from '@mui/system';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';

import theme from 'theme/theme';

interface ISaveButton extends ButtonProps {
  title?: string;
  error: boolean;
  handleClickOkButton?: () => void;
}

export const SaveButton = (props: ISaveButton) => {
  const { title, error, handleClickOkButton, ...rest } = props;

  let sxProp: SxProps = [
    {
      background: () => theme.palette.primary.main,
      height: '56px',
      minWidth: '94px',
      maxWwidth: '185px',
      marginLeft: '8px',
      borderRadius: '100px',
      color: () => theme.palette.background.default,

      '&:hover': {
        cursor: 'pointer',
        background: () => theme.palette.primary.main,
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
