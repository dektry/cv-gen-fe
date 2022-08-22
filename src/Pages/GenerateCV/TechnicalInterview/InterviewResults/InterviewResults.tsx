import { useParams } from 'react-router-dom';

import paths from 'config/routes.json';

import { useSelector } from 'react-redux';
import { candidatesSelector } from 'store/reducers/candidates';

import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { InterviewResult } from 'pages/InterviewResult';
import { ButtonWithLink } from 'common-components/ButtonWithLink';

export const InterviewResults = () => {
  const { id } = useParams<{ id: string }>();
  const { currentCandidate } = useSelector(candidatesSelector)

  return (
    <>
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
