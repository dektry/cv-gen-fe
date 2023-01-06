import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import paths from 'config/routes.json';

import { useStyles } from './styles';
import theme from 'theme/theme';

function tabsProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const tabs = [
  { label: 'Positions & Levels' },
  { label: 'Technical assessment' },
  { label: 'Soft assessment' },
  { label: 'English assessment' },
];

export const SettingsTabs = () => {
  const classes = useStyles({ theme });
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (location.pathname.includes('positions-and-levels')) {
      setValue(0);
    } else if (location.pathname.includes('hard-skills-matrix-list')) {
      setValue(1);
    } else if (location.pathname.includes('soft-skills-matrix-list')) {
      setValue(2);
    } else if (location.pathname.includes('english-assessment')) {
      setValue(3);
    } else {
      setValue(0);
    }
  }, [location]);

  const handleChange = (event: React.SyntheticEvent, key: number) => {
    setValue(key);
    switch (key) {
      case 0: {
        navigate(paths.settingsLevelsPositions);
        break;
      }
      case 1: {
        navigate(paths.settingsHardSkillsMatrixList);
        break;
      }
      case 2: {
        navigate(paths.settingsSoftSkillsMatrixList);
        break;
      }
      case 3: {
        navigate(paths.settingsLevelsPositions);
        break;
      }
    }
  };

  return (
    <Box sx={{ width: '100%', marginBottom: '24px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="settings tabs">
          {tabs.map((el, index) => (
            <Tab key={el.label} className={classes.tab} label={el.label} {...tabsProps(index)} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};
