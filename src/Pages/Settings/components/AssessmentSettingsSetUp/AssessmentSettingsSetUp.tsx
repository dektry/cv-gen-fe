import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { hardSkillsMatrixSelector } from 'store/reducers/hardSkillsMatrix';

const steps = ['Technical assessment questions', 'Setting the level'];

export const AssessmentSettingsSetUp = () => {
  const { id } = useParams<{ id: string }>();

  const { currentMatrix } = useSelector(hardSkillsMatrixSelector);

  const classes = useStyles({ theme });

  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <div>
      <div className={classes.header}>
        <Typography variant="h2">TECHNICAL ASSESSMENT</Typography>
        <div>
          Position: <Chip className={classes.chip} label={currentMatrix.position?.name} />
        </div>
      </div>
      <Box sx={{ width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>{activeStep === 0 ? <p>There gonna be questions</p> : <p>There gonne be levels</p>}</div>
      </Box>
    </div>
  );
};
