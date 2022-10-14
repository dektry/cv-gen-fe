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
      borderColor: ({ theme }) => theme.palette.primary.light,
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
      border: '1px solid',
      borderTop: 'none',
      borderColor: ({ theme }) => theme.palette.action.hover,
      backgroundColor: ({ theme }) => theme.palette.background.default,
    },
  },
  projectSummary: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
  },
  container: {
    backgroundColor: ({ theme }) => theme.palette.background.default,
  },
  label: {
    fontFamily: 'Roboto',
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
    border: '1px solid',
    borderColor: ({ theme }) => theme.palette.action.hover,
  },
  middleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0 12px',
    border: '1px solid',
    borderColor: ({ theme }) => theme.palette.action.hover,
    borderTop: 'none',
    borderBottom: 'none',
  },
  lowerContainer: {
    padding: '12px',
    border: '1px solid',
    borderColor: ({ theme }) => theme.palette.action.hover,
  },
  boldData: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '18px',
  },
  description: {
    width: '33%',
    borderRight: '1px solid',
    borderColor: ({ theme }) => theme.palette.action.hover,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
  },
  responsibilities: {
    width: '66%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
  },
  list: {
    paddingLeft: '16px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
  },
  chip: {
    '&.MuiChip-root': {
      backgroundColor: ({ theme }) => theme.palette.action.hover,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '18px',
    },
  },
});
