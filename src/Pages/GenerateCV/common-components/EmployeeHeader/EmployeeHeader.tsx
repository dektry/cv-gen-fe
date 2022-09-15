import { Button } from 'antd';

import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { EmployeeTabs } from '../EmployeeTabs';
import { PersonalInfoCard } from 'common-components/PersonalInfoCard';

import { NullableField } from 'models/TNullableField';

interface IProps {
  backPath: string;
  fullName: string;
  location: NullableField<string>;
  position: NullableField<string>;
  level: NullableField<string>;
}

export const EmployeeHeader = ({ backPath, fullName, location, position, level }: IProps) => {
  return (
    <>
    <GenerateCvHeader backPath={backPath} />
    <PersonalInfoCard 
      fullName={fullName}
      location={location}
      position={position}
      level={level}
    >
      <Button size='large' type='primary'>Generate CV</Button>
    </PersonalInfoCard>
    <EmployeeTabs />
    </>
  );
}