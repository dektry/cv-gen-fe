import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { getOneHardSkillsMatrix } from 'store/reducers/hardSkillsMatrix/thunks';
import { levelsSelector, loadLevels } from 'store/reducers/levels';

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
  const { allLevels } = useSelector(levelsSelector);

  const classes = useStyles({ theme });

  const [activeStep, setActiveStep] = useState(0);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!allLevels.length) {
      dispatch(loadLevels());
    }

    return () => {
      dispatch(setCurrentHardSkillsMatrix({} as IHardSkillsMatrix));
    };
  }, []);

  useEffect(() => {
    if (currentMatrix.skillGroups?.length) {
      setDisabled(false);
    }
  }, [currentMatrix.skillGroups?.length]);

  useEffect(() => {
    if (id && id !== currentMatrix.id) {
      dispatch(getOneHardSkillsMatrix(id));
    } else if (currentMatrix && !currentMatrix.position?.name) {
      navigate(paths.settingsHardSkillsMatrixList);
    }
  }, [id, currentMatrix.position?.name]);

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
              <StepButton color="inherit" onClick={handleStep(index)} disabled={disabled}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === 0 ? (
            <HardSkillsMatrixFirstStep skillGroups={currentMatrix.skillGroups} setActiveStep={setActiveStep} />
          ) : (
            <HardSkillsMatrixSecondStep matrix={currentMatrix} />
          )}
        </div>
      </Box>
    </div>
  );
};
