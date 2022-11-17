import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#333333',
      light: '#e5e9f2',
      dark: '#aab2c3',
    },
    secondary: {
      main: '#ffffff',
      dark: '#5c5d66',
    },
    text: {
      primary: '#333333',
      secondary: '#AAB2C3',
    },
    error: {
      main: '#d32f2f',
      light: '#f25c5c',
      dark: '#c82a2a',
    },
    background: {
      default: '#ffffff',
    },
    action: {
      hover: '#f4f7fc',
    },
  },
  typography: {
    h2: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '24px',
    },
    h3: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '20px',
    },
    h5: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '18px',
    },
    h6: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '10px',
      lineHeight: '14px',
      color: '#AAB2C3',
    },
  },
});

// A custom theme for this app
theme = createTheme(theme, {
  components: {
    MuiAutoComplete: {
      defaultProps: { InputLabelProps: { shrink: true } },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        InputLabelProps: {
          shrink: true,
        },
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: theme.palette.primary.dark,
            fontSize: '12px',
            paddingTop: '5px',
            '&.Mui-focused': {
              color: theme.palette.primary.dark,
            },
          },
          '& .MuiInputBase-input': {
            padding: '12px',
            lineHeight: '20px',
            fontSize: '16px',
            height: '20px',
            '&.MuiSelect-select': {
              minHeight: '20px',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light,
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px',
            },
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.light,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-focused': {
                backgroundColor: 'rgba(0, 0, 0, 0)',
              },
            },
          },
          '& .MuiFormHelperText-root': {
            display: 'none',
            '&.Mui-error': {
              display: 'block',
            },
          },
          '& .MuiSelect-iconOutlined': {
            color: theme.palette.primary.main,
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        displayEmpty: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          lineHeight: '20px',
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
          '&.MuiButton-containedSecondary': {
            border: `1px solid rgba(0,0,0,0)`,
            '&:hover': {
              backgroundColor: theme.palette.secondary.main,
              border: `1px solid ${theme.palette.primary.main}`,
            },
          },
          '&.Mui-disabled': {
            // background: "initial",
            color: theme.palette.background.default,
            opacity: 0.2,
          },
        },
      },
    },
  },
});

export default theme;
