import React, { useState } from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { SkillGroupField } from 'common-components/SkillGroupField';
import { CvInfo } from 'Pages/CVGeneration/CVGenerationPage';
import { AddButton } from 'common-components/AddButton';
import theme from 'theme/theme';
import { useStyles } from './styles';
import { DeleteButton } from 'common-components/DeleteButton';

interface IProfSkills {
  cvInfo: Partial<CvInfo>;
  updateCvInfo: (fields: Partial<CvInfo>) => void;
}

export const ProfSkills = React.memo((props: IProfSkills) => {
  const { cvInfo, updateCvInfo } = props;

  const classes = useStyles({ theme });

  const [value, setValue] = useState('');

  return (
    <Accordion className={classes.accordion} disableGutters>
      <AccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon className={classes.icon} />}>
        <SkillGroupField value={value} onChange={(e) => setValue(e.target.value)} />
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
          lobortis eget.
        </Typography>
      </AccordionDetails>
      <AccordionActions sx={{ justifyContent: 'space-between' }}>
        <AddButton title="Add field" />
        <DeleteButton title="Delete section" />
      </AccordionActions>
    </Accordion>
  );
});
