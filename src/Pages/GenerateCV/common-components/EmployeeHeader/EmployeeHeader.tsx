import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { EmployeeTabs } from '../EmployeeTabs';

import { EmployeeCard } from './EmployeeCard';

interface IProps {
  backPath: string;
}

export const EmployeeHeader = ({ backPath }: IProps) => {
  return (
    <>
    <GenerateCvHeader backPath={backPath} />
    <EmployeeCard />
    <EmployeeTabs />
    </>
  );
}