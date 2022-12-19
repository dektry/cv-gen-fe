import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { getOneHardSkillsMatrix } from 'store/reducers/hardSkillsMatrix/thunks';
import { loadLevels } from 'store/reducers/levels';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { hardSkillsMatrixSelector, setCurrentHardSkillsMatrix } from 'store/reducers/hardSkillsMatrix';

import { HardSkillsMatrixFirstStep } from './components/HardSkillsMatrixFirstStep';
import { HardSkillsMatrixSecondStep } from './components/HardSkillsMatrixSecondStep';
import { IHardSkillsMatrix } from 'models/IHardSkillsMatrix';

import paths from 'config/routes.json';

const steps = ['Technical assessment questions', 'Setting the level'];

export const HardSkillsMatrix = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentMatrix } = useSelector(hardSkillsMatrixSelector);

  const classes = useStyles({ theme });

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    dispatch(loadLevels());
  }, []);

  useEffect(() => {
    if (!currentMatrix.position?.name) {
      navigate(paths.settings);
    }
  }, [currentMatrix.position?.name]);

  useEffect(() => {
    if (id) {
      dispatch(getOneHardSkillsMatrix(id));
    }

    return () => {
      setCurrentHardSkillsMatrix({} as IHardSkillsMatrix);
    };
  }, [id]);

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
        <div>
          {activeStep === 0 ? (
            <HardSkillsMatrixFirstStep skillGroups={currentMatrix.skillGroups} setActiveStep={setActiveStep} />
          ) : (
            <HardSkillsMatrixSecondStep />
          )}
        </div>
      </Box>
    </div>
  );
};
