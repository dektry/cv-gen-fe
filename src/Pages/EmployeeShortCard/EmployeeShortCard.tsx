import { Descriptions } from 'antd';

import { EMPLOYEES } from 'pages/EmployeesTable/utils/constants';
import { IEmployee } from 'models/IEmployee';

interface IProps {
  record: IEmployee;
}

export const EmployeeShortCard = ({ record }: IProps) => {
  return (
    <Descriptions>
      <Descriptions.Item label={EMPLOYEES.LEVEL}>
        {record.level}
      </Descriptions.Item>
      <Descriptions.Item label={EMPLOYEES.LOCATION}>
        {record.location}
      </Descriptions.Item>
    </Descriptions>
  );
};
