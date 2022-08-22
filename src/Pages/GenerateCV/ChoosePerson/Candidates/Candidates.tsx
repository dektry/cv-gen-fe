import { useRef } from 'react';
import paths from 'config/routes.json';
import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { useStyles } from 'pages/GenerateCV/ChoosePerson/Candidates/styles';
import { CandidatesTable } from 'pages/CandidatesTable';
import { SearchWithAutocomplete } from 'common-components/SearchWithAutocomplete';
import { loadCandidates } from 'store/reducers/candidates';
import { useAppDispatch } from 'store';
import { CANDIDATES } from 'pages/CandidatesTable/utils/constants';
import { Typography } from 'antd';
import { SelectCandidateType } from 'pages/SelectCandidateType';

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
