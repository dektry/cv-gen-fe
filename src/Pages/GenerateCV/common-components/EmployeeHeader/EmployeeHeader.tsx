import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { EmployeeTabs } from '../EmployeeTabs';
import { PersonalInfoCard } from 'common-components/PersonalInfoCard';

import { IPersonalData } from 'models/ICommon';
import routes from 'config/routes.json';

interface IProps {
  personalData: IPersonalData;
  backPath: string;
}

export const EmployeeHeader = ({ backPath, personalData }: IProps) => {
  const navigate = useNavigate();

  return (
    <>
      <GenerateCvHeader backPath={backPath} />
      <PersonalInfoCard personalData={personalData}>
        <Button size="large" type="primary" onClick={() => navigate(routes.generateCV)}>
          Generate CV
        </Button>
      </PersonalInfoCard>
      <EmployeeTabs />
    </>
  );
};
