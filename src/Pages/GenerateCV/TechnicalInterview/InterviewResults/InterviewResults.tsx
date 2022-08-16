import { useParams } from 'react-router-dom';

import { paths } from 'routes/paths';

import { useSelector } from 'react-redux';
import { candidatesSelector } from 'store/candidates';

import { GenerateCvHeader } from 'components/Molecules/GenerateCVHeader/CvHeader';
import { InterviewResult } from 'components/Molecules/InterviewResult/InterviewResult';
import { ButtonWithLink } from 'components/Atoms/ButtonWithLink';

export const InterviewResults = () => {
  const { currentCandidate } = useSelector(candidatesSelector);

  return (
    <>
      <GenerateCvHeader
        backPath={paths.generateCVtechnicalInterview.replace(
          ':id',
          currentCandidate.id,
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
