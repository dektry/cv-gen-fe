import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  accordion: {
    marginBottom: '0',
    '&:nth-last-child(2)': {
      marginBottom: 0,
    },
    '&.MuiPaper-root': {
      backgroundColor: ({ theme }) => theme.palette.action.hover,
      border: '1px solid',
      borderColor: ({ theme }) => theme.palette.action.hover,
      borderRadius: '4px',
      boxShadow: 'none',
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiAccordionSummary-root.Mui-focusVisible': {
      backgroundColor: ({ theme }) => theme.palette.action.hover,
    },
    '& .MuiAccordionSummary-content': {
      margin: '24px 0 16px',
    },
    '& .MuiAccordionDetails-root': {
      display: 'grid',
      gap: '16px',
      padding: '0',
    },
    '& .MuiAccordionActions-root': {
      padding: '16px 16px 24px',
      border: '2px solid',
      borderTop: 'none',
      borderColor: ({ theme }) => theme.palette.action.hover,
      backgroundColor: ({ theme }) => theme.palette.background.default,
    },
  },
  projectSummary: {
    fontFamily: 'Effra',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
  },
  container: {
    backgroundColor: ({ theme }) => theme.palette.background.default,
  },
  label: {
    fontFamily: 'Effra',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '10px',
    lineHeight: '14px',
    color: ({ theme }) => theme.palette.text.secondary,
  },
  upperContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '12px',
    border: '2px solid',
    borderColor: ({ theme }) => theme.palette.action.hover,
  },
  middleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '12px',
    border: '2px solid',
    borderColor: ({ theme }) => theme.palette.action.hover,
    borderTop: 'none',
    borderBottom: 'none',
  },
  lowerContainer: {
    padding: '12px',
    border: '2px solid',
    borderColor: ({ theme }) => theme.palette.action.hover,
  },
  boldData: {
    fontFamily: 'Effra',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '18px',
  },
  description: {
    width: '33%',
    borderRight: '2px solid',
    borderColor: ({ theme }) => theme.palette.action.hover,
  },
  responsibilities: {
    width: '66%',
    fontFamily: 'Effra',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
  },
  list: {
    paddingLeft: '16px',
    fontFamily: 'Effra',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
  },
  chip: {
    '&.MuiChip-root': {
      backgroundColor: ({ theme }) => theme.palette.action.hover,
      fontFamily: 'Effra',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '18px',
    },
  },
});
