import { Button } from 'antd';

import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { EmployeeTabs } from '../EmployeeTabs';
import { PersonalInfoCard } from 'common-components/PersonalInfoCard';

import { NullableField } from 'models/TNullableField';
import { IPersonalData } from 'models/ICommon';

interface IProps {
  personalData: IPersonalData;
  backPath: string;
}

export const EmployeeHeader = ({ backPath, personalData }: IProps) => {

  return (
    <>
    <GenerateCvHeader backPath={backPath} />
    <PersonalInfoCard
      personalData={personalData} 
    >
      <Button size='large' type='primary'>Generate CV</Button>
    </PersonalInfoCard>
    <EmployeeTabs />
    </>
  );
}