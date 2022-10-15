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
    '& .MuiAccordionSummary-root': {
      padding: '12px',
    },
    '& .MuiAccordionDetails-root': {
      display: 'grid',
      gap: '16px',
      padding: '0',
    },
    '& .MuiAccordionActions-root': {
      padding: '21px 12px',
      border: '1px solid',
      borderTop: 'none',
      borderColor: ({ theme }) => theme.palette.action.hover,
      backgroundColor: ({ theme }) => theme.palette.background.default,
    },
  },
  projectSummary: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
  },
  container: {
    backgroundColor: ({ theme }) => theme.palette.background.default,
  },
  label: {
    '&.MuiTypography-root': {
      paddingBottom: '4px',
    },
  },
  upperContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '14px 16px',
    border: '1px solid',
    borderColor: ({ theme }) => theme.palette.action.hover,
    borderLeft: 'none',
    borderRight: 'none',
  },
  middleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    border: '1px solid',
    borderColor: ({ theme }) => theme.palette.action.hover,
    borderTop: 'none',
    borderBottom: 'none',
  },
  lowerContainer: {
    padding: '14px 16px',
    border: '1px solid',
    borderColor: ({ theme }) => theme.palette.action.hover,
  },
  infoBlock: {
    width: '25%',
  },
  boldData: {
    '&.MuiTypography-root': {
      fontWeight: 600,
    },
  },
  description: {
    width: '33.2%',
    borderRight: '1px solid',
    borderColor: ({ theme }) => theme.palette.action.hover,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
    padding: '14px 16px',
  },
  responsibilities: {
    width: '66.8%',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
    padding: '14px 16px',
  },
  list: {
    paddingLeft: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
  },
  chip: {
    '&.MuiChip-root': {
      backgroundColor: ({ theme }) => theme.palette.action.hover,
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '18px',
      paddingLeft: '0',
    },
  },
});
