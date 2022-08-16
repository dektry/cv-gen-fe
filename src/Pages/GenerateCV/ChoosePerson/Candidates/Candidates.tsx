import React, { useRef } from 'react';
import { paths } from 'routes/paths';
import { GenerateCvHeader } from 'components/Molecules/GenerateCVHeader/CvHeader';
import { useStyles } from './styles';
import { CandidatesTable } from 'components/Molecules/CandidatesTable/CandidatesTable';
import { SearchWithAutocomplete } from 'components/Atoms/SearchWithAutocomplete/SearchWithAutocomplete';
import { loadCandidates } from 'store/candidates';
import { useAppDispatch } from 'store/store';
import { CANDIDATES } from 'constants/titles';
import { Typography } from 'antd';
import { SelectCandidateType } from 'components/Atoms/SelectCandidateType/SelectCandidateType';

export const Candidates = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const fullNameRef = useRef<string>('');
  const interviewRef = useRef<boolean>(false);
  const softRef = useRef<boolean>(false);

  return (
    <div className={classes.page}>
      <div className={classes.cust}>
        <GenerateCvHeader backPath={paths.generateCVchoosePerson}>
          <Typography className={classes.title}>{CANDIDATES.TITLE}</Typography>
          <SearchWithAutocomplete
            className={classes.search}
            onChange={props => dispatch(loadCandidates(props))}
            fullNameRef={fullNameRef}
            interviewRef={interviewRef}
            softRef={softRef}
          />
          <SelectCandidateType
            className={classes.select}
            onChange={props => dispatch(loadCandidates(props))}
            fullNameRef={fullNameRef}
            interviewRef={interviewRef}
            softRef={softRef}
          />
        </GenerateCvHeader>
      </div>
      <CandidatesTable hideActions editAction />
    </div>
  );
};
