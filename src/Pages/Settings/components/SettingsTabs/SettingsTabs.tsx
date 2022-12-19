import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { PositionsLevels } from '../PositionsLevels';
import { HardSkillsMatrixList } from '../HardSkillsMatrixList';
import { TabPanel } from './components/TabPanel';

import { useStyles } from './styles';
import theme from 'theme/theme';

function tabsProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const tabs = [
  { label: 'Positions & Levels', component: <PositionsLevels /> },
  { label: 'Technical assessment', component: <HardSkillsMatrixList /> },
  { label: 'Soft assessment', component: <span /> },
  { label: 'English assessment', component: <span /> },
];

export const SettingsTabs = () => {
  const classes = useStyles({ theme });
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="settings tabs">
          {tabs.map((el, index) => (
            <Tab key={el.label} className={classes.tab} label={el.label} {...tabsProps(index)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((el, index) => (
        <TabPanel value={value} index={index}>
          {el.component}
        </TabPanel>
      ))}
    </Box>
  );
};
