import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Typography, Spin } from 'antd';

import { SelectCandidateType } from './components/SelectCandidateType';
import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { CandidatesTable } from './components/CandidatesTable';
import { GenerateCV } from '../../common-components/GenerateCv';
import { SearchWithAutocomplete } from 'common-components/SearchWithAutocomplete';

import { useAppDispatch } from 'store';
import { candidatesSelector, loadCandidates } from 'store/reducers/candidates';

import paths from 'config/routes.json';
import { CANDIDATES } from '../../utils/constants';

import { useStyles } from './styles';

export const Candidates = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const fullNameRef = useRef<string>('');
  const interviewRef = useRef<boolean>(false);
  const softRef = useRef<boolean>(false);

  const { currentPage, pageSize, isLoading, candidates, totalItems } = useSelector(candidatesSelector);

  useEffect(() => {
    dispatch(loadCandidates({ page: currentPage, limit: pageSize, sorter: { order: 'ascend', field: 'fullName' } }));
  }, []);

  if (isLoading) return <Spin size="large" tip={'Loading candidates...'} />;

  return (
    <>
      <GenerateCV />
      <div className={classes.page}>
        <div className={classes.cust}>
          <GenerateCvHeader backPath={paths.home}>
            <Typography className={classes.title}>{CANDIDATES.TITLE}</Typography>
            <SearchWithAutocomplete
              className={classes.search}
              onChange={(props) => dispatch(loadCandidates(props))}
              fullNameRef={fullNameRef}
              interviewRef={interviewRef}
              softRef={softRef}
            />
            <SelectCandidateType
              className={classes.select}
              onChange={(props) => dispatch(loadCandidates(props))}
              fullNameRef={fullNameRef}
              interviewRef={interviewRef}
              softRef={softRef}
            />
          </GenerateCvHeader>
        </div>
        <CandidatesTable
          currentPage={currentPage}
          pageSize={pageSize}
          isLoading={isLoading}
          candidates={candidates}
          totalItems={totalItems}
          editAction
        />
      </div>
    </>
  );
};
