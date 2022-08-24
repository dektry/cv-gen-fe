import { useParams } from 'react-router-dom';

import paths from 'config/routes.json';

import { useSelector } from 'react-redux';
import { candidatesSelector } from 'store/reducers/candidates';

import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { InterviewResult } from '../../../InterviewResult';
import { ButtonWithLink } from 'common-components/ButtonWithLink';
import { GenerateCV } from 'Pages/GenerateCV/GenerateCV';

export const InterviewResults = () => {
  const { id } = useParams<{ id: string }>();
  const { currentCandidate } = useSelector(candidatesSelector)

  return (
    <>
      <GenerateCV />
      <GenerateCvHeader
        backPath={paths.generateCVtechnicalInterview.replace(
          ':id',
          id ? id : '',
        )}
      />
      <InterviewResult />
      <ButtonWithLink
        path={paths.generateCVsoftskillsInterview}
        candidate={currentCandidate}
        text={'Start soft skills interview'}
      />
    </>
  );
};
