import { Descriptions } from 'antd';

import { CANDIDATES } from './utils/constants';
import { ICandidateTable } from 'models/ICandidate';

interface IProps {
  record: ICandidateTable;
}

export const CandidateShortCard = ({ record }: IProps) => {
  return (
    <Descriptions>
      <Descriptions.Item label={CANDIDATES.LEVEL}>{record.level}</Descriptions.Item>
      <Descriptions.Item label={CANDIDATES.LOCATION}>{record.location}</Descriptions.Item>
    </Descriptions>
  );
};
