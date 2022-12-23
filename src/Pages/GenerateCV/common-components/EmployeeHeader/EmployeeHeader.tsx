import { useNavigate, useParams, generatePath } from 'react-router-dom';

import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { EmployeeTabs } from '../EmployeeTabs';
import { PersonalInfoCard } from 'common-components/PersonalInfoCard';
import { GenerateCVButton } from 'common-components/GenerateCVButton';

import { IPersonalData } from 'models/ICommon';
import routes from 'config/routes.json';

interface IProps {
  personalData: IPersonalData;
  backPath: string;
}

export const EmployeeHeader = ({ backPath, personalData }: IProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleClickGenerateCv = () => {
    navigate(generatePath(routes.generateCV, { id }));
  };

  return (
    <>
      <GenerateCvHeader backPath={backPath} />
      <PersonalInfoCard personalData={personalData}>
        <GenerateCVButton handleClickGenerateCv={handleClickGenerateCv} />
      </PersonalInfoCard>
      <EmployeeTabs />
    </>
  );
};
