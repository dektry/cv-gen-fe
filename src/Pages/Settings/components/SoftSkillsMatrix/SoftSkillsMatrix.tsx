import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { getOneSoftSkillsMatrix } from 'store/reducers/softSkillsMatrix/thunks';
import { loadLevels } from 'store/reducers/levels';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { softSkillsMatrixSelector, setCurrentSoftSkillsMatrix } from 'store/reducers/softSkillsMatrix';

import { SoftSkillsMatrixFirstStep } from './components/SoftSkillsMatrixFirstStep';
import { SoftSkillsMatrixSecondStep } from './components/SoftSkillsMatrixSecondStep';
import { ISoftSkillsMatrix } from 'models/ISoftSkillsMatrix';

import paths from 'config/routes.json';

const steps = ['Technical assessment questions', 'Setting the level'];

export const SoftSkillsMatrix = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentMatrix } = useSelector(softSkillsMatrixSelector);

  const classes = useStyles({ theme });

  const [activeStep, setActiveStep] = useState(0);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    dispatch(loadLevels());

    return () => {
      dispatch(setCurrentSoftSkillsMatrix({} as ISoftSkillsMatrix));
    };
  }, []);

  useEffect(() => {
    if (currentMatrix.skills?.length) {
      setDisabled(false);
    }
  }, [currentMatrix.skills?.length]);

  useEffect(() => {
    if (id && id !== currentMatrix.id) {
      dispatch(getOneSoftSkillsMatrix(id));
    } else if (currentMatrix && !currentMatrix.position?.name) {
      navigate(paths.settingsSoftSkillsMatrixList);
    }
  }, [id, currentMatrix.position?.name]);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <div>
      <div className={classes.header}>
        <Typography variant="h2">SOFT ASSESSMENT</Typography>
        <div>
          Position: <Chip className={classes.chip} label={currentMatrix.position?.name} />
        </div>
      </div>
      <Box sx={{ width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton color="inherit" onClick={handleStep(index)} disabled={disabled}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === 0 ? (
            <SoftSkillsMatrixFirstStep skills={currentMatrix.skills} setActiveStep={setActiveStep} />
          ) : (
            <SoftSkillsMatrixSecondStep matrix={currentMatrix} />
          )}
        </div>
      </Box>
    </div>
  );
};
